import ky from "ky-universal";
import useSWR, { responseInterface } from "swr";
import { IdQuery } from "../../../common/query";
import { UseSWRResource } from "../../../common/usable";
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
}

export function useServiceStatus<T>({
  id,
}: IdQuery): responseInterface<IServiceStatus<T>, unknown> {
  const service = new ClientService<T>(id);

  return useSWR(service.url, () => service.getStatus());
}

export const useMinecraftStatus: UseSWRResource<IServiceStatus<
  IMinecraftStatus
>> = () => {
  return useServiceStatus<IMinecraftStatus>({ id: "minecraft" });
};
