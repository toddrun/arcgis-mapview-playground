import React from 'react';
import GeoJson from './functions/geojson';
import ArcgisCalc from './functions/arcgis_calc';
import TurfCalc from './functions/turf_calc';
import { Geometry } from 'geojson';

interface Props {
  geojson: Geometry | null,
  setGeojson: (geojson: Geometry) => void
}

const Sidebar: React.FC<Props> = ({geojson, setGeojson}) => (
  <div  className="sidebar">
    <GeoJson geojson={geojson} setGeojson={setGeojson} />
    <hr />
    <ArcgisCalc geojson={geojson} />
    <TurfCalc geojson={geojson} />
  </div>
);

export default Sidebar;
