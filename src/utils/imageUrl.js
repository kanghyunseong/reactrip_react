export function getImageUrl(path) {
  if (path == null || path === "") return null;
  const p = String(path);
  // S3/외부 URL
  if (p.startsWith("http")) return encodeURI(p);

  const baseUrl = window.ENV?.API_URL || "http://localhost:8081";
  const clean = p.startsWith("/") ? p : `/${p}`;
  return encodeURI(`${baseUrl}${clean}`);
}

