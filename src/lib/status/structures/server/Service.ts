import { IService, IServiceStatus } from "../shared/Service";

export abstract class ServerService<Service, StatusData> {
  id: string;
  data: Service;

  public constructor({ id, data }: IService<Service>) {
    this.id = id;
    this.data = data;
  }

  public abstract getStatus(): Promise<IServiceStatus<StatusData>>;
}
