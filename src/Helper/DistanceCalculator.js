import {getDistance, getPreciseDistance} from 'geolib';

export const calculateDistance = (latitude, longitude) => {
  let distance = getPreciseDistance(latitude, longitude);
  return distance;
};
