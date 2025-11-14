import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Location } from '../types/types';

export const createFeature = (location: Location): Feature<Point> => {
  const coord = fromLonLat([location.coordinates.lon, location.coordinates.lat]);

  return new Feature({
    geometry: new Point(coord),
    name: location.name,
  });
};

