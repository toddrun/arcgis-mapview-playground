import { useState } from "react";
import ArcgisMapview from "./arcgis/arcgis-mapview";
import NamePicker from "./NamePicker";
import PortalPicker from "./PortalPicker";
import Basemap from "@arcgis/core/Basemap";

export interface GoToLocation {
  latitude?: number
  longitude?: number
  zoom?: number
}

function App() {
  
  const NAMED_BASEMAPS = [
    'satellite',
    'hybrid',
    'oceans',
    'osm',
    'terrain',
    'dark-gray',
    'dark-gray-vector',
    'gray',
    'gray-vector',
    'streets',
    'streets-vector',
    'streets-night-vector',
    'streets-navigation-vector',
    'topo',
    'topo-vector',
    'streets-relief-vector',
  ]
  const PORTAL_BASEMAPS = [
    {name: "antarctic-imagery", id: "6553466517dd4d5e8b0c518b8d6b64cb"},
    {name: "arctic-imagery", id: "7ec08e5438304dbfa1e26181503e6fa8"},
    {name: "charted-territory-map", id: "d582a9e953c44c09bb998c7d9b66f8d4"},
    {name: "colored-pencil-map", id: "826498a48bd0424f9c9315214f2165d4"},
    {name: "dark-gray-canvas", id: "358ec1e175ea41c3bf5c68f0da11ae2b"},
    {name: "dark-gray-canvas (local language)", id: "59548997ef4649aabe3b320a113d4097"},
    {name: "dark-gray-canvas (wgs84)", id: "1a386c5dfd864bfda3f03ab428e57640"},
    {name: "human-geography-dark-map", id: "4f2e99ba65e34bb8af49733d9778fb8e"},
    {name: "human-geography-map", id: "3582b744bba84668b52a16b0b6942544"},
    {name: "imagery (wgs84)", id: "52bdc7ab7fb044d98add148764eaa30a"},
    {name: "imagery-hybrid", id: "28f49811a6974659988fd279de5ce39f"},
    {name: "imagery-hybrid (local language)", id: "ff52218580f94d89851563f50cd1a2b2"},
    {name: "imagery-hybrid (wgs84)", id: "4c2b44abaa4841d08c938f4bbb548561"},
    {name: "light-gray-canvas", id: "979c6cc89af9449cbeb5342a439c6a76"},
    {name: "light-gray-canvas (local language)", id: "ee8678f599f64ec0a8ffbfd5c429c896"},
    {name: "light-gray-canvas (wgs84)", id: "02b1f120c3674bfe896ac81731be1739"},
    {name: "mid-century-map", id: "867895a71a1840399476fc717e76bb43"},
    {name: "modern-antique-map", id: "f35ef07c9ed24020aadd65c8a65d3754"},
    {name: "navigational", id: "c50de463235e4161b206d000587af18b"},
    {name: "navigational (local language)", id: "bc19c34549de4000bcd91cef929420dc"},
    {name: "navigational (wgs84)", id: "eb303185d14e45e9be8bbbc1c0daf7ab"},
    {name: "newspaper-map", id: "75a3ce8990674a5ebd5b9ab66bdab893"},
    {name: "nova-map", id: "8d91bd39e873417ea21673e0fee87604"},
    {name: "open-street-map", id: "b834a68d7a484c5fb473d4ba90d35e71"},
    {name: "outdoor-map", id: "2e8a3ccdfd6d42a995b79812b3b0ebc6"},
    {name: "streets", id: "55ebf90799fa4a3fa57562700a68c405"},
    {name: "streets (local language)", id: "e87b7cc002384d948416120d0fb0824f"},
    {name: "streets (night - local language)", id: "ce493841056a4d1fa497fc5315d54bdc"},
    {name: "streets (night - wgs84)", id: "9053b6cd38d54e65bb0967f355a232df"},
    {name: "streets (night)", id: "7e2b9be8a9c94e45b7f87857d8d168d6"},
    {name: "streets (wgs84)", id: "8dda0e7b5e2d4fafa80132d59122268c"},
    {name: "streets (with relief - wgs84)", id: "810753c5730e4003b6bdd05615515091"},
    {name: "streets (with relief)", id: "00f90f3f3c9141e4bea329679b257142"},
    {name: "terrain-with-labels", id: "a52ab98763904006aa382d90e906fdd5"},
    {name: "terrain-with-labels (local language)", id: "5f68957c846942f19d2ac5cb191842c8"},
    {name: "topographic", id: "67372ff42cd145319639a99152b15bc3"},
    {name: "topographic (local language)", id: "19bf4648d3c2491d832ec67b404613d8"},
    {name: "topographic (wgs84)", id: "6b4764e99107496f9193e4b68a77b73a"},
    {name: "topographic (with countours and hillshade)", id: "7378ae8b471940cb9f9d114b67cd09b8"},
    {name: "usa-topo-maps", id: "931d892ac7a843d7ba29d085e0433465"},
    {name: "world-hillshade", id: "f47a5a35be8c41f7890c1763f65a6d9f"},
    {name: "world-hillshade (wgs84)", id: "40f2d170e1794e3fb36290891e0f031c"},
  ]

  const [basemap, setBasemap] = useState<string | Basemap>(NAMED_BASEMAPS[0]);

  return (
    <div className="App">
      <h1>Checkout all the "free" basemaps!</h1>
      <div className="content">
        <div className="basemap-list">
          <div className="basemap-list-header">Named basemaps</div>
          {NAMED_BASEMAPS.map((basenameName) => {
            return <NamePicker
              key={basenameName} 
              basemapName={basenameName} 
              currentBasemap={basemap} 
              setBasemap={setBasemap} 
            />
          })}
          <div className="basemap-list-header">Portal-id basemaps</div>
          {PORTAL_BASEMAPS.map((portalBasemap) => {
            return <PortalPicker
              key={portalBasemap.name}
              basemap={portalBasemap}
              currentBasemap={basemap}
              setBasemap={setBasemap}
            />
          })}
          <div className="basemap-list-header">&nbsp;</div>
        </div>
        <div className="map-view"><ArcgisMapview basemap={basemap} /></div>
      </div>
    </div>
  );
}

export default App;
