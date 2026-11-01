export function euclideanDistance(left, right) {
  if (!Array.isArray(left) && !(left instanceof Float32Array)) return Number.POSITIVE_INFINITY;
  if (!Array.isArray(right) && !(right instanceof Float32Array)) return Number.POSITIVE_INFINITY;
  if (left.length !== right.length || left.length === 0) return Number.POSITIVE_INFINITY;

  let sum = 0;
  for (let index = 0; index < left.length; index += 1) {
    const a = Number(left[index]);
    const b = Number(right[index]);
    if (!Number.isFinite(a) || !Number.isFinite(b)) return Number.POSITIVE_INFINITY;
    const difference = a - b;
    sum += difference * difference;
  }
  return Math.sqrt(sum);
}

export function findMatches(query, photos, threshold = 0.6) {
  if (!Number.isFinite(threshold) || threshold < 0) return [];
  const matches = [];
  for (const photo of photos) {
    let best = Number.POSITIVE_INFINITY;
    for (const face of photo.faces ?? []) {
      best = Math.min(best, euclideanDistance(query, face));
    }
    if (best <= threshold) matches.push({ photo, distance: best });
  }
  return matches.sort((a, b) => a.distance - b.distance);
}
