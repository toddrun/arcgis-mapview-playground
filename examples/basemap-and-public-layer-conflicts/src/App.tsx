import React, { useState } from 'react';
import Sidebar from './sidebar';
import MainView from './main-view';
import './style.css';

export const App: React.FC = () => {
  const [layerUrl, setLayerUrl] = useState<string>();
  const [esriApiKey, setEsriApiKey] = useState('');

  return (
    <div className="App">
      <div className="content">
        <Sidebar esriApiKey={esriApiKey} setEsriApiKey={setEsriApiKey} setLayerUrl={setLayerUrl} />
        { esriApiKey && layerUrl && <MainView layerUrl={layerUrl} esriApiKey={esriApiKey} /> }
      </div>
    </div>
  );
};
