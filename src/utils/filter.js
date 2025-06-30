import { FilterType } from '../const';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

const now = dayjs();
dayjs.extend(isBetween);

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => {
    points = points.filter(
      (point) => point.timeStart && dayjs(point.timeStart).isAfter(now)
    );
    console.log(points);
    return points;
  },
  [FilterType.PRESENT]: (points) => {
    points = points.filter(
      (point) =>
        point.timeStart &&
        point.timeEnd &&
        now.isBetween(dayjs(point.timeStart), dayjs(point.timeEnd), null)
    );
    console.log(points);
    return points;
  },
  [FilterType.PAST]: (points) => {
    points = points.filter(
      (point) => point.timeEnd && dayjs(point.timeEnd).isBefore(now)
    );
    console.log(points);
    return points;
  },
};

export { filter };
