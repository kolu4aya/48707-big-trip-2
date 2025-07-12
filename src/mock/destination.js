import { getRandomArrayElement } from '../utils/common';

const mockDestination = [
  {
    name: 'Amsterdam',
    description:
      'Столица Нидерландов с каналами, велосипедами и музеями Ван Гога.',
    pictures: [
      {
        src: '4.jpg',
        alt: 'Каналы Амстердама',
      },
      {
        src: '3.jpg',
        alt: 'Район Йордан',
      },
    ],
  },
  {
    name: 'Chamonix',
    description:
      'Горнолыжный курорт у подножия Монблана во Французских Альпах.',
    pictures: [
      {
        src: '1.jpg',
        alt: 'Вид на Монблан',
      },
      {
        src: '2.jpg',
        alt: 'Канатная дорога',
      },
    ],
  },
  {
    name: 'Geneva',
    description: 'Швейцарский город на озере Леман с фонтаном Же-До.',
    pictures: [
      {
        src: '5.jpg',
        alt: 'Фонтан Же-До',
      },
    ],
  },
];

function getRandomDestination() {
  return getRandomArrayElement(mockDestination);
}

function getDestination() {
  return mockDestination;
}

export { getRandomDestination, getDestination };
