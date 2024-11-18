import service from "../request";

// 获取用户列表
export function getCalendars() {
  return service.get("/");
}
export function postCalendars(data: { [key: string]: string }) {
  return service.post("/", data);
}
