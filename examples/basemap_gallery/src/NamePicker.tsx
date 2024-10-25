import React from 'react';
import Basemap from '@arcgis/core/Basemap';

interface Props {
  basemapName: string
  currentBasemap: string | Basemap
  setBasemap: (basemap: string) => void
}

const NamePicker: React.FC<Props> = ({ basemapName, currentBasemap, setBasemap }) => {
  const classname = basemapName === currentBasemap ? 'item-selected' : ''
  return <div 
    className={`${classname} gallery-item`} 
    onClick={() => setBasemap(basemapName)}
  >
    {basemapName}
  </div>
}

export default NamePicker;