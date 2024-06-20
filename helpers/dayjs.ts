import dayjs from 'dayjs';

function myDayjs(date: Date | string | undefined): dayjs.Dayjs {
  return dayjs(`${date}Z`);
}

export default myDayjs;
