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
  const [deckLayer, setDeckLayer] = useState<DeckLayer|undefined>(undefined);

  useEffect(() => {
    if (mapRef.current) {
      console.log('@- setting map view: ');
      const deckLLayer = new DeckLayer({
        'deck.layers': [
          new ScatterplotLayer({
            data: deckglUSArecords,
            getPosition: d => d.position,
            getColor: [255, 0, 0],
            radiusMinPixels: 5
          })
        ],
        'deck.getCursor': ({ isDragging }) => (isDragging ? 'grabbing' : 'inherit'),
        'deck.getTooltip': ({ object }) => (object?.tooltip && {
          html: `<p>${object.tooltip}</p>`,
          style: {
            backgroundColor: '#fcfcfc',
            color: '#060606',
            fontSize: '1em',
            lineHeight: '0.3em',
            padding: '0 10px',
          },
        }),
      });

      // Create map
      const map = new Map({
        basemap: 'satellite',
        layers: [deckLLayer],
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
      setMapView(view);
      setDeckLayer(deckLLayer);
    }
  }, []);

  useEffect(() => {
    if (mapView) {
      mapView.when(() => {
        console.log('re-rendering map view')
/*         [].filter((p) => p.onChange)
          .forEach((plugin) => {
            plugin.onChange?.(mapView);
          }); */
      });
    }
  });

  return <div className="map-view" ref={mapRef} />;
};

export default ArcgisMapview;
