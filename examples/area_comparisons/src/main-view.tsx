import React from 'react';
import ArcgisMapview from './arcgis/arcgis-mapview';

interface Props {
  geojson: string | null
}

const MainView: React.FC<Props> = ({ geojson }) => (
  <main className="main-view">
    <ArcgisMapview geojson={geojson} />
  </main>
);


export default MainView;