export async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const json: T = await res.json();
  return json;
}

export interface IQueryParams {
  [name: string]: string | number;
}

export function queryString(query: IQueryParams): string {
  return Object.keys(query)
    .map((parameter, index) => {
      let prefix = index == 0 ? "?" : "&";

      return `${prefix}${parameter}=${query[parameter]}`;
    })
    .join("");
}
