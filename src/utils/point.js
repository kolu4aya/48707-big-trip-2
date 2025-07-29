import dayjs from 'dayjs';

export function humanizePointDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

export const getWeightForNullSortItem = (sortItemA, sortItemB) => {
  if (sortItemA === null && sortItemB === null) {
    return 0;
  }

  if (sortItemA === null) {
    return 1;
  }

  if (sortItemB === null) {
    return -1;
  }

  return null;
};

export const sortPointPrice = (pointA, pointB) => {
  const weight = getWeightForNullSortItem(pointA.cost, pointB.cost);

  return weight ?? pointB.cost - pointA.cost;
};

export const sortPointDay = (pointA, pointB) => {
  const weight = getWeightForNullSortItem(pointA.timeStart, pointB.timeStart);

  return weight ?? pointA.timeStart - pointB.timeStart;
};

export const sortPointTime = (pointA, pointB) => {
  const duration1 = pointA.timeStart - pointA.timeEnd;
  const duration2 = pointB.timeStart - pointB.timeEnd;

  const weight = getWeightForNullSortItem(duration1, duration2);

  return weight ?? duration1 - duration2;
};
