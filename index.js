import { vec3, quat } from "gl-matrix";

const computeGeodesic = (pointA, pointB, numSegments) => {
  const positions = [pointA];

  const angleBetweenEndpoints = Math.acos(vec3.dot(pointA, pointB));
  const rotationAxis = vec3.create();
  vec3.cross(rotationAxis, pointA, pointB);

  const theta = angleBetweenEndpoints / numSegments;

  for (let i = 1; i < numSegments; i++) {
    const q = quat.create();
    vec3.normalize(rotationAxis, rotationAxis);
    quat.setAxisAngle(q, rotationAxis, i * theta);
    positions.push(vec3.transformQuat(vec3.create(), pointA, q));
  }
  positions.push(pointB);
  return positions;
};

const HALF_PI = Math.PI * 0.5;

/**
 * @typedef {number[]} vec2
 */
/**
 * @typedef {number[]} vec3
 */

/**
 * @typedef {Object} OctasphereOptions
 * @property {number} [radius=0.5]
 * @property {number} [subdivisions=2]
 */

/**
 * @typedef {Object} SimplicialComplex Geometry definition.
 * @property {vec3[]} positions
 * @property {vec3[]} normals
 * @property {vec2[]} uvs
 * @property {vec3[]} cells
 */

/**
 * An octasphere geometry for 3D rendering, including normals, UVs and cell indices (faces).
 *
 * @param {OctasphereOptions} [options={}]
 * @returns {SimplicialComplex}
 */
function createOctasphere({ radius = 0.5, subdivisions = 2 } = {}) {
  if (subdivisions > 5) throw new Error("Max subdivisions is 5.");

  const positions = [];
  let normals = [];
  const uvs = [];
  const cells = [];

  const n = Math.pow(2, subdivisions + 1);

  const verticesPerPatch = (n * (n + 1)) / 2;
  const cellsPerPatch = (n - 2) * (n - 1) + n - 1;

  // First patch tessellation
  let firstIndex = 0;
  for (let i = 0; i < n; i++) {
    const theta = (HALF_PI * i) / (n - 1);
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
    const col = n - 1 - i;

    positions.push(
      ...(col === 0
        ? [Float32Array.of(0, sinTheta, cosTheta)]
        : computeGeodesic(
            [0, sinTheta, cosTheta],
            [cosTheta, sinTheta, 0],
            col
          ))
    );

    if (i < n - 1) {
      const a = firstIndex + 1;
      const b = firstIndex + col + 1;
      const c = firstIndex + col + 2;

      for (let row = 0; row < col - 1; row++) {
        cells.push([firstIndex + row, a + row, b + row]);
        cells.push([b + row, a + row, c + row]);
      }

      const row = col - 1;
      cells.push([firstIndex + row, a + row, b + row]);

      firstIndex = b;
    }
  }

  // Clone patch
  const pathchesQuats = [
    [0, 1, 0],
    [0, 2, 0],
    [0, 3, 0],
    [1, 0, 0],
    [1, 1, 0],
    [1, 2, 0],
    [1, 3, 0],
  ]
    .map((euler) => vec3.scale(euler, euler, HALF_PI))
    .map((angles) =>
      quat.fromEuler(quat.create(), ...angles.map((n) => (n * 180) / Math.PI))
    );

  for (let i = 0; i < pathchesQuats.length; i++) {
    const quat = pathchesQuats[i];

    for (let j = 0; j < verticesPerPatch; j++) {
      positions.push(vec3.transformQuat(vec3.create(), positions[j], quat));
    }

    for (let j = 0; j < cellsPerPatch; j++) {
      cells.push(cells[j].map((index) => index + (i + 1) * verticesPerPatch));
    }
  }

  normals = [...positions];

  for (let i = 0; i < positions.length; i++) {
    const octant = Math.floor(i / verticesPerPatch);
    const relativeCellIndex = i % verticesPerPatch;

    const uv = [
      -Math.atan2(positions[i][2], positions[i][0]) / (2 * Math.PI) + 0.5,
      Math.asin(positions[i][1]) / Math.PI + 0.5,
    ];

    // North pole
    if (octant < 4 && relativeCellIndex === verticesPerPatch - 1) {
      uv[0] = (0.375 + 0.25 * octant) % 1;
      uv[1] = 1;
    }
    // South pole
    if (octant >= 4 && relativeCellIndex === 0) {
      uv[0] = (0.375 + 0.25 * (octant - 4)) % 1;
      uv[1] = 0;
    }
    // Seam zipper
    if ((octant === 2 || octant == 6) && uv[0] < 0.5) {
      uv[0] += 1;
    }
    uvs.push(uv);

    // Radius
    if (radius !== 1) positions[i] = positions[i].map((p) => p * radius);
  }

  return {
    positions,
    normals,
    uvs,
    cells,
  };
}

export default createOctasphere;
