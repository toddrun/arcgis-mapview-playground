import React, { useState } from 'react';

interface Props {
  esriApiKey: string,
  setEsriApiKey: (key: string) => void;
  setLayerUrls: (layer: string[]) => void;
}

const Sidebar: React.FC<Props> = ({esriApiKey, setEsriApiKey, setLayerUrls}) => {
  const [localApiKey, setLocalApiKey] = useState(esriApiKey);
  const [selectedLayerUrls, setSelectedLayerUrls] = useState([]);
  const [showSubmitButton, setShowSubmitButton] = useState(true);

  const buildApiKeyItem = () => (
    <div className='entry-item api-key'>
      <label>"Esri Api Key"</label>
      <div>
      <input
        value={localApiKey}
        onChange={(e) => {
          setEsriApiKey(undefined);
          setLocalApiKey(e.target.value);
          setShowSubmitButton(true);
        }}
      />
      </div>
    </div>
  );

  const handleLayerUrlsChange = (e) => {
    const select = e.target;
    const selected = [];

    for (let x = 0; x < select.length; x++) {
      if (select[x].selected) {
        selected.push(select[x].value);
      }
    }

    setSelectedLayerUrls(selected);
  }

  const urls = [
    "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Flood_Hazard_Reduced_Set_gdb/FeatureServer",
    "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Flood_Hazard_Reduced_Set_gdb/FeatureServer/0",
    "https://services2.arcgis.com/Uq9r85Potqm3MfRV/arcgis/rest/services/biosds1598_fpu/FeatureServer",
    "https://services2.arcgis.com/Uq9r85Potqm3MfRV/arcgis/rest/services/biosds1598_fpu/FeatureServer/0",
  ]

  const buildLayerUrl = () => (
    <div className='entry-item'>
      <label>Public Layer URL</label>
      <div>
      <select multiple onChange={handleLayerUrlsChange}>
        {urls.map((url, index) => {
          const name = url.substring(url.indexOf('/rest/services') + '/rest/services/'.length);

          return <option key={index} value={url} selected={true}>{name}</option>
        })}
      </select></div>
    </div>
  )

  const buildSubmitButton = () => (
    showSubmitButton &&
    localApiKey && 
    selectedLayerUrls.length > 0 &&
    <div className='submit-button'>
      <button onClick={() => {
        setLayerUrls(selectedLayerUrls);
        setEsriApiKey(localApiKey);
        setShowSubmitButton(false);
      }}>Load Layer</button>
    </div>
  )

  return (
    <div  className="sidebar">
      { buildApiKeyItem() }
      { buildLayerUrl() }
      { buildSubmitButton() }
    </div>
  );
};

export default Sidebar;
