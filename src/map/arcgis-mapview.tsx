import React, { useRef, useEffect, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import {ScatterplotLayer} from '@deck.gl/layers';
import SpatialReference from '@arcgis/core/geometry/SpatialReference.js';
import {DeckLayer} from '@deck.gl/arcgis';
import TileInfo from '@arcgis/core/layers/support/TileInfo.js';
import { deckglUSArecords } from '../helpers/map-records';

const ArcgisMapview: React.FC = () => {
  const mapRef = useRef(null);
  const [mapView, setMapView] = useState<MapView|undefined>(undefined);

  useEffect(() => {
    if (mapRef.current) {
      const deckLayer = new DeckLayer({
        'deck.layers': [
          new ScatterplotLayer({
            data: deckglUSArecords,
            getPosition: d => d.position,
            getColor: [255, 0, 0],
            radiusMinPixels: 5
          })
        ]
      });

      // Create map
      const map = new Map({
        basemap: 'satellite',
        layers: [deckLayer],
      });

      // Create view
      const view = new MapView({
        container: mapRef.current,
        map: map,
        constraints: {
          lods: TileInfo.create({
            spatialReference: SpatialReference.WGS84,
          }).lods,
          minZoom: 4,
        },
        background: {
          color: [255, 252, 244, 0.5],
        },
      });
    }
  }, []);

  return <div className="map-view" ref={mapRef} />;
};

export default ArcgisMapview;
