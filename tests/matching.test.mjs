import test from 'node:test';
import assert from 'node:assert/strict';
import { findMatches, euclideanDistance } from '../src/matching.mjs';

test('euclideanDistance measures descriptor distance', () => {
  assert.equal(euclideanDistance([0, 0], [3, 4]), 5);
});

test('findMatches returns nearby faces first and respects the threshold', () => {
  const photos = [
    { id: 'far', faces: [[0.8, 0.8]] },
    { id: 'near', faces: [[0.1, 0.1], [0.2, 0.2]] },
    { id: 'no-face', faces: [] },
  ];
  const result = findMatches([0, 0], photos, 0.5);
  assert.deepEqual(result.map(({ photo }) => photo.id), ['near']);
  assert.ok(Math.abs(result[0].distance - Math.sqrt(0.02)) < 1e-12);
});

test('findMatches ignores descriptors with incompatible dimensions or invalid values', () => {
  const photos = [{ id: 'bad', faces: [[1], [Number.NaN, 0]] }];
  assert.deepEqual(findMatches([0, 0], photos), []);
});
