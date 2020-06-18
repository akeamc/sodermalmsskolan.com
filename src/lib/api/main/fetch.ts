export async function fetchJSON<T>(url): Promise<T> {
  const res = await fetch(url);
  const json: T = await res.json();
  return json;
}
