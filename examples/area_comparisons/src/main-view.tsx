import React from 'react';
import ArcgisMapview from './arcgis/arcgis-mapview';
import { GoToLocation } from './App';

interface Props {
  location: GoToLocation
}

const MainView: React.FC<Props> = ({ location }) => (
  <main className="main-view">
    <ArcgisMapview location={location} />
  </main>
);


export default MainView;