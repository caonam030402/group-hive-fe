import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateText = (date: string | dayjs.Dayjs) => {
  const timezoneStr = dayjs.tz.guess();
  const now = dayjs().tz(timezoneStr);
  const inputDate = dayjs(date).utc().tz(timezoneStr);

  if (
    inputDate.isAfter(now.subtract(1, "day")) &&
    inputDate.isBefore(now.subtract(1, "hour"))
  ) {
    return inputDate.fromNow();
  }

  if (inputDate.isAfter(now.subtract(7, "days"))) {
    return inputDate.fromNow();
  }

  if (inputDate.year() === now.year()) {
    return inputDate.format("MM/DD");
  }
  return inputDate.tz(timezoneStr).format("MM/DD/YYYY");
};

export const formatTimeDisplay = (time: string): string => {
  const now = dayjs();
  const messageTime = dayjs(time);

  if (messageTime.isSame(now, "day")) {
    return messageTime.format("hh:mm A");
  }
  if (messageTime.year() === now.year()) {
    return messageTime.format("DD/MM");
  }
  return messageTime.format("DD/MM/YYYY");
};

export const formatTimeDisplayNormal = (
  time: string,
  format?: "DD/MM/YYYY" | "DD/MM" | "hh:mm A" | "DD/MM/YYYY hh:mm A",
): string => {
  return dayjs(time).format(format || "DD/MM/YYYY");
};

export const formatCustomTime = (date: string | dayjs.Dayjs) => {
  const timezoneStr = dayjs.tz.guess();
  const now = dayjs().tz(timezoneStr);
  const inputDate = dayjs(date).tz(timezoneStr);

  if (inputDate.isSame(now, "day")) {
    return inputDate.format("hh:mm A [Today]");
  }
  if (inputDate.isAfter(now.subtract(7, "days"))) {
    return inputDate.format("h:mm A MMM DD");
  }
  if (inputDate.year() === now.year()) {
    return inputDate.format("h:mm A MMM DD");
  }
  return inputDate.format("MMM DD, YYYY");
};
