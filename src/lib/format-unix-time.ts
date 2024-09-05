const formatUnixTime = (unixTime: number) => {
  const date = new Date(unixTime * 1000);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    return date.toLocaleDateString();
  }
};
export default formatUnixTime;
