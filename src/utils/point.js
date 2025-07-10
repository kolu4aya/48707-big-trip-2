import dayjs from 'dayjs';

export function humanizeTaskDueDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

export function generateRandomDayjsDate() {
  // Генерируем базовую дату в пределах ±1 месяц от текущей
  const baseDate = dayjs().add(Math.floor(Math.random() * 61) - 30, 'day');

  // Генерируем случайное время для начала
  const startDate = baseDate
    .hour(Math.floor(Math.random() * 24))
    .minute(Math.floor(Math.random() * 60))
    .second(Math.floor(Math.random() * 60))
    .millisecond(Math.floor(Math.random() * 1000));

  // Гарантируем что конец всегда позже начала
  const minDuration = 15; // минимальная длительность 15 минут
  const maxDuration = 30 * 24 * 60; // максимальная длительность 30 дней в минутах

  // Случайная длительность события (в минутах)
  const duration =
    minDuration + Math.floor(Math.random() * (maxDuration - minDuration));

  const endDate = startDate.add(duration, 'minute');

  // Двойная проверка (на всякий случай)
  if (endDate.isBefore(startDate)) {
    // Если что-то пошло не так, добавляем фиксированную длительность
    return {
      dateFrom: startDate.toDate(),
      dateTo: startDate.add(minDuration, 'minute').toDate(),
    };
  }

  return {
    dateFrom: startDate.toDate(),
    dateTo: endDate.toDate(),
  };
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
