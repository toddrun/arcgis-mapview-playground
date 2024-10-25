import React from 'react';
import Basemap from '@arcgis/core/Basemap';

interface Props {
  basemap: {name: string, id: string}
  currentBasemap: string | Basemap
  setBasemap: (basemap: string | Basemap) => void
}

const PortalPicker: React.FC<Props> = ({ basemap, currentBasemap, setBasemap }) => {
  let classname = '';
  if (typeof currentBasemap === 'object' && currentBasemap.portalItem?.id === basemap.id) {
    classname = 'item-selected';
  }

  return <div 
    data-portal-id={basemap.id}
    className={`${classname} gallery-item`} 
    onClick={() => setBasemap(new Basemap({ portalItem: { id: basemap.id } }))}
  >
    {basemap.name}
  </div>
}

export default PortalPicker;