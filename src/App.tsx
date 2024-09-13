import React, { useEffect, useState } from 'react';
import identityManager from '@arcgis/core/identity/IdentityManager';
import Sidebar from './sidebar';
import MainView from './main-view';
import './style.css';
import { LayerSetting } from './arcgis-layer-loader';

export const App: React.FC = () => {
  const [loadedLayers, setLoadedLayers] = useState<LayerSetting[]>([]);

  useEffect(() => {
    identityManager.destroyCredentials();
  }, []);

  return (
    <div className="App">
      <div className="content">
        <Sidebar setLoadedLayers={setLoadedLayers} />
        <MainView loadedLayers={loadedLayers} />
      </div>
    </div>
  );
};
