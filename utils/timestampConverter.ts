export const timestampConverter = (timestamp: number) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return { year, month, day, hour, minute };
};
