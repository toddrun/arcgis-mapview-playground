import React, { useRef, useEffect, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SpatialReference from '@arcgis/core/geometry/SpatialReference.js';
import TileInfo from '@arcgis/core/layers/support/TileInfo.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';
import Polygon from '@arcgis/core/geometry/Polygon.js';
import Graphic from '@arcgis/core/Graphic.js';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol.js';

interface Props {
  geojson: string | null
}

const ArcgisMapview: React.FC<Props> = ({ geojson }) => {
  const mapViewRef = useRef<MapView | null>(null);
  const mapRef = useRef(null);
  const [mapView, setMapView] = useState<MapView|undefined>(undefined);

  const MIN_ZOOM = 4;
  const GRAPHICS_LAYER_ID = 'MY_GRAPHICS_LAYER';

  useEffect(() => {
    if (mapRef.current && mapView && mapView.map) {
      mapView.map.set('basemap', 'topo');
    }
  }, [mapView]);

  useEffect(() => {
    if (geojson && mapView) {
      const graphicsLayer = mapView.map.findLayerById(GRAPHICS_LAYER_ID) as GraphicsLayer;
      if (graphicsLayer) {
        try {
          graphicsLayer.removeAll();

          const polygon = new Polygon({
            rings: JSON.parse(geojson).coordinates,
            spatialReference: SpatialReference.WGS84
          });

          const graphic = new Graphic({
            geometry: polygon,
            symbol: new SimpleFillSymbol({
              color: [255, 0, 0, 0.5],
              outline: {
                color: [255, 0, 0],
                width: 2
              }
            })
          })

          graphicsLayer.add(graphic);
          mapView.goTo(polygon.extent.expand(1.5));
        } catch (err) {
          console.error(err);
        }
      }
    }
  }, [geojson, mapView]);

  useEffect(() => {
    if (mapRef.current) {
      // Create map
      const map = new Map({
        basemap: 'streets',
      });

      // Create view
      const view = new MapView({
        container: mapRef.current,
        map,
        constraints: {
          lods: TileInfo.create({
            spatialReference: SpatialReference.WGS84,
          }).lods,
          minZoom: MIN_ZOOM,
        },
        background: {
          color: [255, 252, 244, 0.5],
        },
      });

      const graphicsLayer = new GraphicsLayer({
        id: GRAPHICS_LAYER_ID,
      });
      map.add(graphicsLayer);

      mapViewRef.current = view;
      setMapView(view);
    }

    return () => {
      if (mapViewRef.current) {
        if (typeof mapViewRef.current.destroy === 'function') {
          mapViewRef.current.destroy();
        }
      }
    };
  }, []);

  return <div className="map-view" ref={mapRef} />;
};

export default ArcgisMapview;
