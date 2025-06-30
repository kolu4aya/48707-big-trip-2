import { getRandomArrayElement } from '../utils/common';

const mockDestination = [
  {
    name: 'Amsterdam',
    description:
      'Столица Нидерландов с каналами, велосипедами и музеями Ван Гога.',
    pictures: [
      {
        src: 'https://example.com/amsterdam-1.jpg',
        alt: 'Каналы Амстердама',
      },
      {
        src: 'https://example.com/amsterdam-2.jpg',
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
        src: 'https://example.com/chamonix-1.jpg',
        alt: 'Вид на Монблан',
      },
      {
        src: 'https://example.com/chamonix-2.jpg',
        alt: 'Канатная дорога',
      },
    ],
  },
  {
    name: 'Geneva',
    description: 'Швейцарский город на озере Леман с фонтаном Же-До.',
    pictures: [
      {
        src: 'https://example.com/geneva-1.jpg',
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
