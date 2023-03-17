export const getSrilankanDay = () =>
  Intl.DateTimeFormat("si-LK", {
    timeZone: "Asia/Colombo",
  }).format(new Date());
