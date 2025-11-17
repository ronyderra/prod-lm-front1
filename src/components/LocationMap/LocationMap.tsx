import React, { useEffect, useRef, useMemo } from 'react';
import { Box } from '@mui/material';
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';
import { useLocations } from '../../hooks/useLocations';
import { useLocationPage } from '../../hooks/useLocationPage';
import { useCategoryFilter } from '../../hooks/useCategoryFilter';
import { createFeature } from '../../utils';
import 'ol/ol.css';
import './LocationMap.css';

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapRefInstance = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const { page } = useLocationPage();
  const { category } = useCategoryFilter();
  const { data, isLoading } = useLocations(page + 1, category);
  const features = useMemo(() => (data?.data ?? []).map(createFeature),[data]);

  /** Create map ONCE */
  useEffect(() => {
    if (!mapRef.current) return;
    const source = new VectorSource();
    const vectorLayer = new VectorLayer({
      source,
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
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    map.on('click', (event) => {
      const f = map.getFeaturesAtPixel(event.pixel)[0] as Feature<Point> | undefined;
      const name = f?.get('name');
      if (name) alert(name);
    });

    mapRefInstance.current = map;
    vectorSourceRef.current = source;

    return () => map.setTarget(undefined);
  }, []);

  /** Update markers whenever features change */
  useEffect(() => {
    const map = mapRefInstance.current;
    const source = vectorSourceRef.current;
    if (!map || !source) return;

    source.clear();
    if (features.length === 0) {
      map.getView().setCenter(fromLonLat([0, 0]));
      map.getView().setZoom(2);

      return;
    }

    source.addFeatures(features);

    const extent = source.getExtent();
    map.getView().fit(extent, {
      padding: [50, 50, 50, 50],
      duration: 400,
    });
  }, [features]);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Loading...
        </Box>
      )}
    </Box>
  );
};

export default React.memo(LocationMap);
