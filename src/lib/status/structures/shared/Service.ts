export interface IServiceStatus<T> {
  id: string;
  online: boolean;

  /**
   * Data related to the service. May be `null` only if the service is offline.
   */
  data: T | null;
}

export interface IService<T> {
  id: string;
  data: T;
}
