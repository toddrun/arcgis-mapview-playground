import React from 'react';

interface Props {
  basemapName: string
  currentBasemap: string
  setBasemap: (basemap: string) => void
}

const Picker: React.FC<Props> = ({ basemapName, currentBasemap, setBasemap }) => {
  const classname = basemapName === currentBasemap ? 'item-selected' : ''
  return <div 
    className={`${classname} gallery-item`} 
    onClick={() => setBasemap(basemapName)}
  >
    {basemapName}
  </div>
}

export default Picker;