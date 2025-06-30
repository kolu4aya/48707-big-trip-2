import { filter } from '../utils/filter.js';

function generateFilter(points) {
  console.log(filter);
  return Object.entries(filter).map(([filterType, filterPoints]) => ({
    type: filterType,
    count: filterPoints(points).length,
  }));
}

export { generateFilter };
