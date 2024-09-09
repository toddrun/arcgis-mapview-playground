import ArcGisLayer from '@arcgis/core/layers/Layer';
import esriConfig from '@arcgis/core/config';
import identityManager from '@arcgis/core/identity/IdentityManager';
import OAuthInfo from '@arcgis/core/identity/OAuthInfo';

export const DEFAULT_PORTAL_URL = 'https://www.arcgis.com';

const ArcGisConnection = (
  esriApiKey: string,
  appId: string,
  portalUrl: string,
) => {
  let credentials;

  const oAuthInfo = new OAuthInfo({
    appId,
    flowType: 'authorization-code',
    portalUrl,
    popup: true,
    popupCallbackUrl: '/oauth/arcgis/callback',
  });

  identityManager.registerOAuthInfos([oAuthInfo]);

  const isOnline = portalUrl === DEFAULT_PORTAL_URL;
  const sharingUrl = `${portalUrl}/sharing`;

  const getAuthToken = async (): Promise<string> => {
    try {
      esriConfig.apiKey = esriApiKey;
      credentials = await identityManager.getCredential(sharingUrl);
    } catch (err) {
      console.log("ERRRREEEED", err)
    }
   

    return credentials.token;
  };

  const fetchLayer = async (layerId: string, baseURL: string): Promise<ArcGisLayer> => {
    const token = await getAuthToken();

    // This must be set correctly or loading the layer will fail
    esriConfig.apiKey = isOnline ? '' : esriApiKey;

    return ArcGisLayer.fromPortalItem({
      portalItem: {
        id: layerId,
        apiKey: token,
        // @ts-ignore
        portal: {
          url: baseURL,
        },
      },
    });
  };

  return { fetchLayer, getAuthToken };
};

export default ArcGisConnection;
