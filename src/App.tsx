import React from 'react';
import MainView from './mainview';
import Navbar from './navbar';
import Sidebar from './sidebar';
import './style';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Sidebar />
        <MainView />
      </div>
    </div>
  );
};
