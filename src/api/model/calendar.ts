import service from "../request";

// 获取用户列表
export const getCalendars: AxiosResponseI<
  getCalendarsReq,
  getCalendarsRes
> = () => {
  return service.get("/");
};
export const postCalendars: AxiosResponseI<
  postCalendarsReq,
  postCalendarsRes
> = (data) => {
  return service.post("/", data);
};
