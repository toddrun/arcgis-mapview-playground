import React, { useEffect, useRef, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import Extent from '@arcgis/core/geometry/Extent';
import buildDeckLayer, { buildGeoJsonLayer } from './layers/builder';
import { DeckLayer } from '@deck.gl/arcgis';

interface Props {
  oneAndTwoRequest: number
  clearRequest: number
  twoAndOneRequest: number
  oneRequest: number
  twoRequest: number
  comboRequest: number
}

const geoJson1 = 'https://data-cdfw.opendata.arcgis.com/api/download/v1/items/076ccc71fc1143a69cd90df79802b9a0/geojson?layers=0'
const geoJson2 = 'https://data-cdfw.opendata.arcgis.com/api/download/v1/items/e5d2b35828f74fef8c8f59a156f19685/geojson?layers=0'
const layer2 = () => buildDeckLayer(geoJson2)
const layer1 = () => buildDeckLayer(geoJson1)

const combineLayers = () => new DeckLayer({
  'deck.layers': [
    buildGeoJsonLayer(geoJson2),
    buildGeoJsonLayer(geoJson1),
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
})

const MainView: React.FC<Props> = ({ oneAndTwoRequest, clearRequest, twoAndOneRequest, oneRequest, twoRequest, comboRequest }) => {
  const mapViewRef = useRef<MapView | null>(null);
  const mapRef = useRef(null);
  const [mapView, setMapView] = useState<MapView|undefined>(undefined);
  
  const MIN_ZOOM = 4;

  useEffect(() => {
    if (mapView) {
      mapView.map?.removeAll()

      if (oneRequest > twoRequest) {  
        console.log('adding layer 1')
        mapView.map?.add(layer1())
      } else {
        console.log('adding layer 2')
        mapView.map?.add(layer2())
      }
    }
  }, [twoRequest, oneRequest, mapView]);

  useEffect(() => {
    if (mapView) {
      mapView.map?.removeAll() 

      if (oneAndTwoRequest > twoAndOneRequest) {
        mapView.map?.add(layer1())
        mapView.map?.add(layer2())
      } else {
        mapView.map?.add(layer2())
        mapView.map?.add(layer1())
      }
    }
  }, [twoAndOneRequest, oneAndTwoRequest, mapView]);

  useEffect(() => {
    if (mapView) {
      mapView.map?.removeAll()
      mapView.map?.add(combineLayers())
    }
  }, [comboRequest, mapView]);

  useEffect(() => {
    if (mapView) {
      mapView.map?.removeAll()
    }
  }, [clearRequest, mapView]);

  useEffect(() => {
    if (mapRef.current) {
      // Create map
      const map = new Map({
        basemap: 'topo'
      });

      const extent = new Extent({
        xmin: -123,
        ymin: 30,
        xmax: -121,
        ymax: 45,
        spatialReference: SpatialReference.WGS84
      });

      // Create view
      const view = new MapView({
        container: mapRef.current,
        map,
        extent,
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

      view.map?.removeAll();
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


export default MainView;