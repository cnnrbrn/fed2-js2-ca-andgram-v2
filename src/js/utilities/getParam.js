export function getParam(param) {
  const searchParams = new URLSearchParams(window.location.search);
  const value = searchParams.get(param);
  return value;
}