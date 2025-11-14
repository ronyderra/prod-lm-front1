import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Extent } from 'ol/extent';

export const calculateExtent = (features: Feature<Point>[]): Extent | null => {
  if (features.length === 0) return null;
  const coords = features.map((f) => f.getGeometry()?.getCoordinates() || [0, 0]);
  const xs = coords.map((c) => c[0]);
  const ys = coords.map((c) => c[1]);

  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
};

