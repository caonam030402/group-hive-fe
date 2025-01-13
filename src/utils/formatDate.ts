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
