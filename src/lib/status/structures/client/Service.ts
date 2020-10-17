import ky from "ky-universal";
import useSWR, { responseInterface } from "swr";
import { IMinecraftStatus } from "../shared/Minecraft";
import { IServiceStatus } from "../shared/Service";

export class ClientService<T> {
  public readonly id: string;

  public constructor(id: string) {
    this.id = id;
  }

  public get url(): string {
    return `/api/status/${this.id}`;
  }

  public async getStatus(): Promise<IServiceStatus<T>> {
    const status = ky.get(this.url).json<IServiceStatus<T>>();

    return status;
  }

  public static useStatus<T>(
    id: string
  ): responseInterface<IServiceStatus<T>, unknown> {
    const service = new ClientService<T>(id);

    return useSWR(service.url, () => service.getStatus());
  }
}

export const useMinecraftStatus = (): responseInterface<
  IServiceStatus<IMinecraftStatus>,
  unknown
> => {
  return ClientService.useStatus<IMinecraftStatus>("minecraft");
};
