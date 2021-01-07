import { responseInterface } from "swr";

export type UseSWRResource<T, O = Record<string, unknown>, E = unknown> = (
  options?: O
) => responseInterface<T, E>;

export interface SimpleSWRResponse<T> {
  data: T,
  loading: boolean,
}
