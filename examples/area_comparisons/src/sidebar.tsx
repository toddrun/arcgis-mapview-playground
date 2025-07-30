import React from 'react';
import GeoJson from './functions/geojson';

interface Props {
  geojson: string | null,
  setGeojson: (geojson: string) => void
}

const Sidebar: React.FC<Props> = ({geojson, setGeojson}) => (
  <div  className="sidebar">
    <GeoJson geojson={geojson} setGeojson={setGeojson} />
  </div>
);

export default Sidebar;
