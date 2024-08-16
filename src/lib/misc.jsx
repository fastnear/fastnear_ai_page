export function parseHashParams(hash) {
  const hashParams = new URLSearchParams(hash.substring(1));
  const params = {};
  hashParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}
