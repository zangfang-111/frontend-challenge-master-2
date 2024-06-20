export function formatDateForGQL(date: Date): string {
  const getTwoDigitsNumber = (numb: number, type: string) => {
    let twoDigitsNumb;
    if (numb < 10 && type === 'month') {
      const newMonth = numb + 1;
      twoDigitsNumb = `0${newMonth}`;
    } else if (numb < 10 && type === 'day') {
      twoDigitsNumb = `0${numb}`;
    } else {
      twoDigitsNumb = numb;
    }
    return twoDigitsNumb;
  };
  const formattedYear = date.getFullYear().toString().substring(2);
  const formattedMonth = getTwoDigitsNumber(date.getMonth(), 'month');
  const formattedDay = getTwoDigitsNumber(date.getDate(), 'day');
  const formattedDate = `${formattedYear}${formattedMonth}${formattedDay}`;
  return formattedDate;
}

export const today = new Date();
export const startDateWeekAgo = formatDateForGQL(
  new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
);
export const startDateMonthAgo = formatDateForGQL(
  new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30),
);

export const lastDateDefault = formatDateForGQL(new Date());
