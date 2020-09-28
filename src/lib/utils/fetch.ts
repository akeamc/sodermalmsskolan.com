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
