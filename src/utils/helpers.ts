export const transformDate = (date: string) => {
  const splitDate = date.split("T")[0].split("-");
  const newDate = splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];

  return newDate;
};
