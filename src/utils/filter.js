import { FilterType } from '../const';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

const now = dayjs();
dayjs.extend(isBetween);

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => point.timeStart && dayjs(point.timeStart).isAfter(now)),
  [FilterType.PRESENT]: (points) => points.filter((point) =>
    point.timeStart &&
    point.timeEnd &&
    now.isBetween(dayjs(point.timeStart), dayjs(point.timeEnd), null)),
  [FilterType.PAST]: (points) => points.filter((point) => point.timeEnd && dayjs(point.timeEnd).isBefore(now)),
};

export { filter };
