export interface IServiceStatus<T> {
  id: string;
  online: boolean;
  data: T;
}

export interface IService<T> {
  id: string;
  data: T;
}
