import React, { useRef, useEffect, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SpatialReference from '@arcgis/core/geometry/SpatialReference.js';
import TileInfo from '@arcgis/core/layers/support/TileInfo.js';
import Basemap from '@arcgis/core/Basemap';
import Extent from '@arcgis/core/geometry/Extent';
interface Props {
  basemap: string | Basemap
}

const ArcgisMapview: React.FC<Props> = ({ basemap }) => {
  const mapViewRef = useRef<MapView | null>(null);
  const mapRef = useRef(null);
  const [mapView, setMapView] = useState<MapView|undefined>(undefined);
  const [extents, setExtents] = useState<Extent>(new Extent({}));

  const MIN_ZOOM = 4;

  useEffect(() => {
    if (mapRef.current && mapView && mapView.map) {
      mapView.map.set('basemap', basemap)
    }
  }, [basemap, mapView]);

  useEffect(() => {
    if (mapRef.current) {
      console.log('basemap', basemap)
      const map = new Map({
        basemap
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
        extent: extents,
        background: {
          color: [255, 252, 244, 0.5],
        },
      });
      view.watch("extent", function(newValue, oldValue) {
        setExtents(newValue);
      });

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basemap]);

  return <div className="map-view" ref={mapRef} />;
};

export default ArcgisMapview;
