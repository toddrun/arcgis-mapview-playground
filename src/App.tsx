import React, { useEffect } from 'react';
import identityManager from '@arcgis/core/identity/IdentityManager';
import Sidebar from './sidebar';
import MainView from './main-view';
import './style.css';

export const App: React.FC = () => {
  useEffect(() => {
    identityManager.destroyCredentials();
  }, []);

  return (
    <div className="App">
      <div className="content">
        <Sidebar />
        <MainView />
      </div>
    </div>
  );
};
