import { publicHolidays, workingDays } from "./publicDay";

export const isHoliday = (dateString: string) => {
  // 将字符串解析为日期对象
  const date = new Date(dateString);

  // 检查是否是周六或周日
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  // 检查是否是法定节假日
  const isPublicHoliday = publicHolidays.includes(dateString);

  // 检查是否是法定调休日
  const isWorkingDay = workingDays.includes(dateString);

  // 返回结果：既不是调休日也不是工作日
  return (isWeekend || isPublicHoliday) && !isWorkingDay;
};
