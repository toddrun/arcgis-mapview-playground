import React from 'react';
import ArcgisMapview from './arcgis/arcgis-mapview';
import { Geometry } from 'geojson';

interface Props {
  geojson: Geometry | null
}

const MainView: React.FC<Props> = ({ geojson }) => (
  <main className="main-view">
    <ArcgisMapview geojson={geojson} />
  </main>
);


export default MainView;