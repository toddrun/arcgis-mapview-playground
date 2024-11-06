import React, { useEffect } from 'react';
import ArcgisMapview from './arcgis-mapview';

interface Props {
  layerUrls: string[];
  esriApiKey: string;
}

const MainView: React.FC<Props> = ({ layerUrls, esriApiKey }) => {
  return (
    <main className="main-view">
      <ArcgisMapview layerUrls={layerUrls} esriApiKey={esriApiKey} />
    </main>
  );
};

export default MainView;
