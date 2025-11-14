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
import { createFeature, convertPageToApi, extractLocations } from '../../utils';
import 'ol/ol.css';
import './LocationMap.css';

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);

  const { page } = useLocationPage();
  const { category } = useCategoryFilter();
  const apiPage = convertPageToApi(page);

  const { data, isLoading } = useLocations(apiPage, category);

  /** Extract locations */
  const locations = useMemo(() => extractLocations(data), [data]);

  /** Convert locations → features */
  const features = useMemo(() => {
    if (locations.length === 0) return [];

    return locations.map(createFeature);
  }, [locations]);

  /** Initial map creation */
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
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    /** Click handler */
    map.on('click', (event) => {
      const feature = map.getFeaturesAtPixel(event.pixel)[0] as Feature<Point> | undefined;
      const name = feature?.get('name');
      if (name) alert(name);
    });

    mapInstanceRef.current = map;
    vectorSourceRef.current = vectorSource;

    return () => {
      map.setTarget(undefined);
      map.dispose();
    };
  }, []);

  /** Update markers + fit view */
  useEffect(() => {
    const map = mapInstanceRef.current;
    const vectorSource = vectorSourceRef.current;
    if (!map || !vectorSource) return;

    vectorSource.clear();
    if (features.length === 0) {
      map.getView().setCenter(fromLonLat([0, 0]));
      map.getView().setZoom(2);

      return;
    }

    vectorSource.addFeatures(features);

    // Auto-fit the view using built-in extent
    const extent = vectorSource.getExtent();
    map.getView().fit(extent, {
      padding: [50, 50, 50, 50],
      duration: 500,
    });
  }, [features]);

  return (
    <Box className="location-map-container" sx={{ position: 'relative' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
          }}
        >
          Loading...
        </Box>
      )}
    </Box>
  );
};

export default React.memo(LocationMap);
