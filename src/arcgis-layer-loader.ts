import MapView from "@arcgis/core/views/MapView";
import ArcGisConnection from "./arcgis-connection";

export interface LayerSetting {
  id: string;
  title: string;
  esriApiKey: string; // isOnline ? undefined : '',
  esriAppId: string; // isOnline ? undefined : appId,
  esriPortalUrl: string; // isOnline ? undefined : portalUrl,
  baseURL: string;
}

const loadLayer = (layer: LayerSetting) => {
  const { id, esriApiKey, esriAppId, esriPortalUrl, baseURL } = layer;
  const isOnline = !layer.esriPortalUrl; // We don't set this on 

  const connection = isOnline ? 
    ArcGisConnection(esriApiKey, esriAppId, undefined) :
    ArcGisConnection(esriApiKey, esriAppId, esriPortalUrl);

    return connection.fetchLayer(id, baseURL);
}

const ArcGISLayerLoader = (mapView: MapView) => {
  const loadAll = (payload: LayerSetting[]) => {
    Promise.all(payload.map(loadLayer)).then((loadedLayers) => {
      mapView.map.layers.removeAll();
      mapView.map.addMany(loadedLayers);
    });
  }
  
  return { loadAll }
};

export default ArcGISLayerLoader;
