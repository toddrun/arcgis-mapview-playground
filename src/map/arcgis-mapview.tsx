import React, { useRef, useEffect } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SpatialReference from '@arcgis/core/geometry/SpatialReference.js';
import TileInfo from '@arcgis/core/layers/support/TileInfo.js';

const ArcgisMapview: React.FC = () => {
  const mapRef = useRef(null);
  // Create map
  const map = new Map({
    basemap: 'satellite',
  });

  useEffect(() => {
    if (mapRef.current) {
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
