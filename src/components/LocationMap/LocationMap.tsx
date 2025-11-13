import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Extent } from 'ol/extent';
import { Style, Icon } from 'ol/style';
import { Location } from '../../types/location.types';
import { useLocations } from '../../hooks/useLocations';
import 'ol/ol.css';
import './LocationMap.css';

const createFeature = (location: Location): Feature<Point> => {
  const coord = fromLonLat([location.coordinates.lon, location.coordinates.lat]);

  return new Feature({
    geometry: new Point(coord),
    name: location.name,
  });
};

const calculateExtent = (features: Feature<Point>[]): Extent | null => {
  if (features?.length === 0) return null;
  const coords = features.map((f) => f.getGeometry()?.getCoordinates() || [0, 0]);
  const xs = coords.map((c) => c[0]);
  const ys = coords.map((c) => c[1]);

  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
};

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const { data } = useLocations();

  useEffect(() => {
    if (!mapRef.current) return;
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          scale: 0.8,
          anchor: [0.5, 1],
        }),
      }),
    });
    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({ center: fromLonLat([0, 0]), zoom: 2 }),
    });
    map.on('click', (event) => {
      const features = map.getFeaturesAtPixel(event.pixel);
      const feature = features[0] as Feature<Point> | undefined;
      const name = feature?.get('name');
      if (name) alert(name);
    });
    mapInstanceRef.current = map;
    vectorSourceRef.current = vectorSource;

    return () => map.setTarget(undefined);
  }, []);
  
  useEffect(() => {
    const vectorSource = vectorSourceRef.current;
    const map = mapInstanceRef.current;
    if (!vectorSource || !map) return;
    vectorSource.clear();

    const locations = data?.data || [];
    if (locations.length === 0) {
      map.getView().setCenter(fromLonLat([0, 0]));
      map.getView().setZoom(2);

      return;
    }

    const features = locations.map(createFeature);
    vectorSource.addFeatures(features);
    const extent = calculateExtent(features);
    if (extent) {
      map.getView().fit(extent, { padding: [50, 50, 50, 50], duration: 500 });
    }
  }, [data]);

  return (
    <Box className="location-map-container">
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default React.memo(LocationMap);
