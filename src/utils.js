import dayjs from "dayjs";

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(items) {
  return Math.floor(Math.random() * items.length);
}

const shuffle = (items) => {
  let m = items.length,
    t,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = items[m];
    items[m] = items[i];
    items[i] = t;
  }

  return items;
};

function getRandomArrayElementNum(items, num) {
  items = shuffle(items);
  items = items.slice(0, num);
  return items;
}

function humanizeTaskDueDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : "";
}

export {
  getRandomArrayElement,
  getRandomNumber,
  getRandomArrayElementNum,
  humanizeTaskDueDate,
};
