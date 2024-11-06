import React, { useState } from 'react';
import esriConfig from '@arcgis/core/config';

interface Props {
  esriApiKey: string,
  setEsriApiKey: (key: string) => void;
  setLayerUrl: (layer: string) => void;
}

const Sidebar: React.FC<Props> = ({esriApiKey, setEsriApiKey, setLayerUrl}) => {
  const [localApiKey, setLocalApiKey] = useState(esriApiKey);
  const [selectedLayerUrl, setSelectedLayerUrl] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(true);

  const buildApiKeyItem = () => (
    <div className='entry-item api-key'>
      <input
        value={localApiKey}
        onChange={(e) => {
          setEsriApiKey(undefined);
          setLocalApiKey(e.target.value);
          setShowSubmitButton(true);
        }}
      />
      <label>"Esri Api Key"</label>
    </div>
  );

  const buildLayerUrl = () => (
    <div className='entry-item'>
      <input value={selectedLayerUrl} onChange={(e) => {
        setLayerUrl(undefined);
        setSelectedLayerUrl(e.target.value);
        setShowSubmitButton(true);
      }}/>
      <label>Public Layer URL</label>
    </div>
  )

  const buildSubmitButton = () => (
    showSubmitButton &&
    localApiKey && 
    selectedLayerUrl &&
    <div className='submit-button'>
      <button onClick={() => {
        setLayerUrl(selectedLayerUrl);
        setEsriApiKey(localApiKey);
        setShowSubmitButton(false);
      }}>Load Layer</button>
    </div>
  )

  const updateSelectedLayers = (layerId, selectedLayers, setSelectedLayers) => {
    const layers = [...selectedLayers]
    const position = layers.indexOf(layerId);

    position < 0 ? layers.push(layerId) : layers.splice(position, 1);
    setSelectedLayers(layers);
  }

  const renderLayerList = (layers, type) => {
    // if (layers.length === 0) {
    //   return <div>&nbsp;</div>;
    // }

    // const selectedLayers = type === 'Online' ? selectedOnlineLayers : selectedEnterpriseLayers;
    // const setSelectedLayers = type === 'Online' ? setSelectedOnlineLayers : setSelectedEnterpriseLayers;

    // // Render the first 5 only
    // return <ul>
    //   { layers?.slice(0, 5)?.map((layer) => (
    //       <li key={layer.id} className="layer">
    //         <input
    //           type="checkbox"
    //           onChange={
    //             () => updateSelectedLayers(layer.id, selectedLayers, setSelectedLayers)
    //           }>
    //         </input>
    //         {layer.title}
    //       </li>
    //   ))}
    // </ul>
  }

  const buttonText = (selectedLayers, type) => {
    const len = selectedLayers.length;
    const layers = len > 1 ? "layers" : "layer";
    return len > 0 ? `${len} ${type} ${layers}` : undefined;
  }

  const getSelectedLayers = (selectedLayers, fullLayers) => (
    selectedLayers.map((id) => {
      return fullLayers.find((layer) => layer.id === id);
    })
  )

  const sendLoadedLayers = () => {
    // setLoadedLayers([
    //   ...getSelectedLayers(selectedOnlineLayers, onlineLayers),
    //   ...getSelectedLayers(selectedEnterpriseLayers, enterpriseLayers)
    // ])
  }

  const loadLayersButton = () => {
    // const textParts = [];
    // const onlineText = buttonText(selectedOnlineLayers, 'Online');
    // const enterpriseText = buttonText(selectedEnterpriseLayers, 'Enterprise');
    // if (onlineText) {
    //   textParts.push(onlineText)
    // }
    // if (enterpriseText) {
    //   textParts.push(enterpriseText)
    // }

    // return <div className='submit-button'>
    //   <button onClick={sendLoadedLayers}>Load {textParts.join(" and ")}</button>
    // </div>
  };

  return (
    <div  className="sidebar">
      { buildApiKeyItem() }
      { buildLayerUrl() }
      { buildSubmitButton() }
    </div>
  );
};

export default Sidebar;
