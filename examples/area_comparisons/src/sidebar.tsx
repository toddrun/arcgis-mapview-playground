import React from 'react';
import GoTo from './functions/go-to';
import { GoToLocation } from './App';

interface Props {
  location: GoToLocation,
  setLocation: (GoToLocation) => void
}

const Sidebar: React.FC<Props> = ({location, setLocation}) => (
  <div  className="sidebar">
    <GoTo location={location} setLocation={setLocation}/>
  </div>
);

export default Sidebar;
