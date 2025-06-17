import dayjs from 'dayjs';

dayjs.extend(relativeTime)

var a = dayjs('2000-01-01')

console.log(dayjs('1999-01-01').to(a))