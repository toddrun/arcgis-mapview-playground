import { useState } from "react";
import ArcgisMapview from "./arcgis/arcgis-mapview";
import Picker from "./Picker";

export interface GoToLocation {
  latitude?: number
  longitude?: number
  zoom?: number
}

function App() {
  
  const BASEMAPS = [
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
  const [basemap, setBasemap] = useState(BASEMAPS[0]);

  return (
    <div className="App">
      <h1>Checkout all the "free" basemaps!</h1>
      <div className="content">
        <div>
          {BASEMAPS.map((basenameName) => {
            return <Picker 
              key={basenameName} 
              basemapName={basenameName} 
              currentBasemap={basemap} 
              setBasemap={setBasemap} 
            />
          })}
        </div>
        <div className="map-view"><ArcgisMapview basemap={basemap} /></div>
      </div>
    </div>
  );
}

export default App;
