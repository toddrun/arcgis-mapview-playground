import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { FOCUS_LOCATION } from "./arcgis-mapview";

export interface LayerSetting {
  id: string;
  title: string;
  esriApiKey: string; // isOnline ? undefined : '',
  esriAppId: string; // isOnline ? undefined : appId,
  esriPortalUrl: string; // isOnline ? undefined : portalUrl,
  baseURL: string;
}

const FeatureLayerLoader = (mapView: MapView) => {
  const load = (url: string) => {
  const featureLayer = new FeatureLayer({url});

    mapView.map.layers.removeAll();
    mapView.map.addMany([featureLayer]);
    mapView.goTo({center: FOCUS_LOCATION});
  };
  
  return { load }
};

export default FeatureLayerLoader;
