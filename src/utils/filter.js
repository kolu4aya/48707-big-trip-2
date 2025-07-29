import { FilterType } from '../const';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => {
    const now = dayjs();
    return points.filter((point) => point.timeStart && dayjs(point.timeStart).isAfter(now));
  },
  [FilterType.PRESENT]: (points) => {
    const now = dayjs();
    return points.filter((point) =>
      point.timeStart &&
      point.timeEnd &&
      now.isBetween(dayjs(point.timeStart), dayjs(point.timeEnd), null, '[]') // '[]' включает границы
    );
  },
  [FilterType.PAST]: (points) => {
    const now = dayjs();
    return points.filter((point) => point.timeEnd && dayjs(point.timeEnd).isBefore(now));
  },
};

export { filter };
