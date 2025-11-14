import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { boundingExtent, Extent } from 'ol/extent';

export const calculateExtent = (features: Feature<Point>[]): Extent | null => {
  if (features.length === 0) return null;

  const coordinates = features
    .map(f => f.getGeometry()?.getCoordinates())
    .filter(Boolean) as number[][];

  return coordinates.length > 0 ? boundingExtent(coordinates) : null;
};