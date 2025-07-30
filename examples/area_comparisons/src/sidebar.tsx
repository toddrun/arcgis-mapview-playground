import React from 'react';
import GeoJson from './functions/geojson';
import ArcgisCalc from './functions/arcgis_calc';

interface Props {
  geojson: string | null,
  setGeojson: (geojson: string) => void
}

const Sidebar: React.FC<Props> = ({geojson, setGeojson}) => (
  <div  className="sidebar">
    <GeoJson geojson={geojson} setGeojson={setGeojson} />
    <hr />
    <ArcgisCalc geojson={geojson} />
  </div>
);

export default Sidebar;
