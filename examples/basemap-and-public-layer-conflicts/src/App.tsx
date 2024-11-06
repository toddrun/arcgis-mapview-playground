import React, { useState } from 'react';
import Sidebar from './sidebar';
import MainView from './main-view';
import './style.css';

export const App: React.FC = () => {
  const [layerUrls, setLayerUrls] = useState<string[]>();
  const [esriApiKey, setEsriApiKey] = useState('');

  return (
    <div className="App">
      <div className="content">
        <Sidebar esriApiKey={esriApiKey} setEsriApiKey={setEsriApiKey} setLayerUrls={setLayerUrls} />
          { esriApiKey && layerUrls && <MainView layerUrls={layerUrls} esriApiKey={esriApiKey} /> }
      </div>
    </div>
  );
};
