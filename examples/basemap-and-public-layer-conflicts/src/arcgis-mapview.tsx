import React, { useRef, useEffect, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SpatialReference from '@arcgis/core/geometry/SpatialReference.js';
import TileInfo from '@arcgis/core/layers/support/TileInfo.js';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import esriConfig from '@arcgis/core/config.js';

export interface Extents {
  latitude: number,
  longitude: number,
  zoom: number,
  searchZoom: number,
  initialZoom: number,
}

export const MIN_ZOOM = 4;
export const FOCUS_LOCATION = [-106.534, 38.794];

interface Props {
  layerUrl: string;
  esriApiKey: string;
}

const ArcgisMapview: React.FC<Props> = ({ layerUrl, esriApiKey }) => {
  const mapRef = useRef(null);
  const [mapView, setMapView] = useState<MapView|undefined>(undefined);

  const applyLayers = () => {
    console.log('LayerUrl being set:', layerUrl);

    mapView.map.set('basemap', 'arcgis-navigation');

    const featureLayer = new FeatureLayer({url: layerUrl});

    mapView.map.layers.removeAll();
    mapView.map.addMany([featureLayer]);
  };

  useEffect(() => {
    if (mapView) {
      console.log('MapView exists, loading layers', mapView);
      mapView.when(
        () => { 
        console.log('MapView loaded');
        applyLayers();
        },
        (err) => {
          console.log('MapView failed to load', err);
        }
      );
    }
  }, [mapView]);

  useEffect(() => {
    esriConfig.apiKey = esriApiKey;

    if (mapRef.current) {
      // Create view
      const view = new MapView({
        container: mapRef.current,
        map: new Map({
          basemap: 'arcgis/navigation',}),
        constraints: {
          lods: TileInfo.create({
            spatialReference: SpatialReference.WGS84,
          }).lods,
          minZoom: MIN_ZOOM,
        },
        center: FOCUS_LOCATION,
        background: {
          color: [255, 252, 244, 0.5],
        },
      });

      setMapView(view);
    }
  }, []);


  return <div className="map-view" ref={mapRef} />;
};


export default ArcgisMapview;
