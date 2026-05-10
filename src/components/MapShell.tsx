import React, { useMemo, useState, useCallback } from 'react';
import Map, { NavigationControl, ScaleControl, Source, Layer } from 'react-map-gl/maplibre';
import type { FillLayer, LineLayer, BackgroundLayer, CircleLayer, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

import { archiveData } from '../data/events';

const THEATER_BOUNDS: [[number, number], [number, number]] = [[33.5, 29.3], [36.3, 33.5]];

const COLORS = {
  sea: '#000000',           
  landBland: '#0a0a0a',     
  landImportant: '#ff003c', 
  bordersBland: '#1f1f1f',  
  bordersImportant: '#00f2ff',
  eventGlow: '#ff003c',    
  eventCoreIsraeli: '#ffffff', // Pure white
  eventCoreArab: '#ffb700',    // Warning Amber
  eventCoreOther: '#888888'    // Neutral Grey fallback
};

const MAP_DATA_URL = "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson";

// NEW: Tell TypeScript that this component expects a function as a prop
interface MapShellProps {
  onEventClick: (id: string | null) => void;
}

export const MapShell = ({ onEventClick }: MapShellProps) => {

  const mapboxFriendlyData = useMemo(() => {
    return {
      type: "FeatureCollection" as const,
      features: archiveData.map(event => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [event.coordinates.lng, event.coordinates.lat] as [number, number]
        },
        properties: {
          id: event.id,
          perpetrator: event.perpetrator // NEW: The engine needs to know who did it
        }
      }))
    };
  }, []);

  const seaLayer: BackgroundLayer = { id: 'sea-layer', type: 'background', paint: { 'background-color': COLORS.sea } };
  const countryFillLayer: FillLayer = { id: 'country-fills', type: 'fill', paint: { 'fill-color': ['match', ['get', 'admin'], ['Israel', 'Palestine'], COLORS.landImportant, COLORS.landBland], 'fill-opacity': 0.2 } };
  const normalBorders: LineLayer = { id: 'normal-borders', type: 'line', filter: ['!in', 'admin', 'Israel', 'Palestine'], paint: { 'line-color': COLORS.bordersBland, 'line-width': 1 } };
  const theaterBorders: LineLayer = { id: 'theater-borders', type: 'line', filter: ['in', 'admin', 'Israel', 'Palestine'], paint: { 'line-color': COLORS.bordersImportant, 'line-width': 2 } };
  
  const eventGlowLayer: CircleLayer = { id: 'event-glow', type: 'circle', paint: { 'circle-color': COLORS.eventGlow, 'circle-radius': 12, 'circle-blur': 0.8, 'circle-opacity': 0.6 } };
  const eventCoreLayer: CircleLayer = {
    id: 'event-core',
    type: 'circle',
    paint: {
      'circle-color': [
        'match',
        ['get', 'perpetrator'],
        'israeli', COLORS.eventCoreIsraeli,
        'arab', COLORS.eventCoreArab,
        COLORS.eventCoreOther // If it doesn't match, make it grey
      ],
      'circle-radius': 3
    }
  };

  // NEW: State to manage the cursor style
  const [cursor, setCursor] = useState<string>('auto');
  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor('auto'), []);

  // NEW: The click handler
  const onClick = useCallback((event: MapLayerMouseEvent) => {
    const feature = event.features && event.features[0];
    if (feature && feature.properties) {
      // If we clicked a dot, send its ID up to App.tsx
      onEventClick(feature.properties.id as string);
    } else {
      // If we clicked the empty map, clear the selection
      onEventClick(null);
    }
  }, [onEventClick]);

  return (
    <div className="w-full h-full relative bg-black">
      <Map
        initialViewState={{ longitude: 34.85, latitude: 31.5, zoom: 8 }}
        maxBounds={THEATER_BOUNDS}
        style={{ width: '100%', height: '100%' }}
        
        // NEW: Tell MapLibre to listen for clicks/hovers ONLY on these layers
        interactiveLayerIds={['event-core', 'event-glow']}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        cursor={cursor}
      >
        <Layer {...seaLayer} />
        
        <Source id="world-boundaries" type="geojson" data={MAP_DATA_URL}>
          <Layer {...countryFillLayer} />
          <Layer {...normalBorders} />
          <Layer {...theaterBorders} />
        </Source>

        <Source id="atrocity-events" type="geojson" data={mapboxFriendlyData}>
          <Layer {...eventGlowLayer} />
          <Layer {...eventCoreLayer} />
        </Source>
        
        <NavigationControl position="top-right" />
        <ScaleControl unit="metric" />
      </Map>
    </div>
  );
};