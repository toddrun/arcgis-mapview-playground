import React, { Dispatch, SetStateAction, useState } from 'react';
import ArcGisConnection, { DEFAULT_PORTAL_URL } from './arcgis-connection';
import ArcGisLayerInfos from './helpers/arcgis-layer-infos';

const Sidebar = () => {

  const [esriApiKey, setEsriApiKey] = useState('');
  const [onlineAppId, setOnlineAppId] = useState('');
  const [enterpriseAppId, setEnterpriseAppId] = useState('');
  const [enterprisePortalUrl, setEnterprisePortalUrl] = useState('');
  const [onlineAuthToken, setOnlineAuthToken] = useState('');
  const [enterpriseAuthToken, setEnterpriseAuthToken] = useState('');
  const [onlineLayers, setOnlineLayers] = useState([]);
  const [enterpriseLayers, setEnterpriseLayers] = useState([]);

  const buildEntryItem = (label: string, value: string, setter: Dispatch<SetStateAction<string>>) => (
    <div className='entry-item'>
      <input value={value} onChange={(e) => setter(e.target.value)}/><label>{label}</label>
    </div>
  );

  const canConnectToOnline = () => {
    return esriApiKey && onlineAppId;
  }

  const canConnectToEnterprise = () => {
    return esriApiKey && enterpriseAppId && enterprisePortalUrl;
  }
  
  const connectToOnline = async () => {
    const connection = ArcGisConnection(esriApiKey, onlineAppId, DEFAULT_PORTAL_URL);
    const authToken = await connection.getAuthToken();
    const layers = await ArcGisLayerInfos(esriApiKey, DEFAULT_PORTAL_URL).fetchLayerIds();
    setOnlineAuthToken(authToken);
    setOnlineLayers(layers);
  }

  const connectToEnteprise = async () => {
    const connection = ArcGisConnection(esriApiKey, enterpriseAppId, enterprisePortalUrl);
    const authToken = await connection.getAuthToken();
    const layers = await ArcGisLayerInfos(esriApiKey, enterprisePortalUrl).fetchLayerIds();
    setEnterpriseAuthToken(authToken);
    setEnterpriseLayers(layers);
  }

  const connectButton = (connectFunction, type) => (
    <button onClick={connectFunction}>Connect to {type}!</button>
  )

  const renderLayerList = (layers) => (
    <ul>
      { layers?.map((layer) => (<li key={layer.id}>{layer.name}</li>))}
    </ul>
  )

  const submitButton = () => {
    if (esriApiKey) {
      return (
        <div className='submit-button'>
          <button onClick={() => console.log(esriApiKey)}>Connect!</button>
        </div>
      )
    }
    return undefined;
  }

  return (
    <div  className="sidebar">
      { buildEntryItem("Esri Api Key", esriApiKey, setEsriApiKey) }
      { buildEntryItem("Online App ID", onlineAppId, setOnlineAppId) }
      { buildEntryItem("Enterprise App ID", enterpriseAppId, setEnterpriseAppId) }
      { buildEntryItem("Enterprise Portal URL", enterprisePortalUrl, setEnterprisePortalUrl) }
      <br />
      <table>
        <thead>
          <tr>
            <th className={"half-column"} >Online</th>
            <th className={"half-column"} >Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ canConnectToOnline() && connectButton(connectToOnline, 'Online') }</td>
            <td>{ canConnectToEnterprise() && connectButton(connectToEnteprise, 'Enterprise') }</td>
          </tr>
          <tr>
            <td>{ renderLayerList(onlineLayers)}</td>
            <td>{ renderLayerList(enterpriseLayers)}</td>
          </tr>
        </tbody>
      </table>
      
      { canConnectToEnterprise() && connectButton(connectToEnteprise, 'Enterprise') }
      { canConnectToOnline() && canConnectToEnterprise() && submitButton() }
    </div>
  );
};

export default Sidebar;
