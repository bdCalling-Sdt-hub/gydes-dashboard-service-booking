import dayjs from "dayjs";
export const formatDateTime = (date) => {
  const now = dayjs();
  const messageDate = dayjs(date);
  const minutesAgo = now.diff(messageDate, "minute");
  const hoursAgo = now.diff(messageDate, "hour");
  const isThisYear = now.isSame(messageDate, "year");

  if (minutesAgo < 1) return "just now";
  if (minutesAgo < 60) return `${minutesAgo} min ago`;
  if (hoursAgo < 24) return messageDate.format("hh:mm A");
  if (isThisYear) return messageDate.format("MMM DD");
  return messageDate.format("MMM DD YYYY");
};

export const formatJoinDate = (date) => dayjs(date).format(" MMM DD YYYY");
