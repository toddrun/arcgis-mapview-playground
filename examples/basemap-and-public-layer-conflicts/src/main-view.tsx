import React, { useEffect } from 'react';
import ArcgisMapview from './arcgis-mapview';

interface Props {
  layerUrl: string;
  esriApiKey: string;
}

const MainView: React.FC<Props> = ({ layerUrl, esriApiKey }) => {
  return (
    <main className="main-view">
      <ArcgisMapview layerUrl={layerUrl} esriApiKey={esriApiKey} />
    </main>
  );
};

export default MainView;
