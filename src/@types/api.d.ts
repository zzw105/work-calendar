import { AxiosRequestConfig } from "axios";

declare global {
  interface AxiosResponseI<T, D> {
    (data?: T, config?: AxiosRequestConfig<T>): Promise<D>;
  }

  type getCalendarsReq = null;
  type getCalendarsRes = { day: string; message: string }[];

  type postCalendarsReq = { day: string; message: string };
  type postCalendarsRes = null;
}
