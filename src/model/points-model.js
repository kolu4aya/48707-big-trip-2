import { getRandomPoint } from '../mock/point.js';

const POINT_COUNT = Math.floor(Math.random() * (22 + 3) - 3);

export default class PointModel {
  #points = Array.from({ length: POINT_COUNT }, getRandomPoint);

  get points() {
    return this.#points;
  }
}
