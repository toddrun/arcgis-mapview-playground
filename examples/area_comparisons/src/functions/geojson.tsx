import { useState } from "react";
import { Geometry } from "geojson";

interface GeoJson {
  geojson: Geometry,
  setGeojson: (geojson: Geometry) => void
}

const Layers: React.FC<GeoJson> = ({ geojson, setGeojson}) => { 
  const [localValue, setLocalValue] = useState(geojson ? JSON.stringify(geojson) : '');
  const [valid, setValid] = useState(true);

  const convertToGeoJson = (value: string): Geometry => {
    try {
      setValid(true);
      return JSON.parse(value) as Geometry;
    } catch (error) {
      setValid(false);
      return null;
    }
  };

  return(
    <div>
      { localValue && !valid && <p style={{color: 'red'}}>Invalid GeoJSON</p> }
      <h2>GeoJSON</h2>
      <textarea
        style={{ width: '90%' }}
        rows={10}
        value={localValue }
        onChange={(e) => {
          setLocalValue(e.target.value);
          const converted = convertToGeoJson(e.target.value);
          if (converted) {
            setGeojson(converted);
          }
        }}
        placeholder="Paste GeoJSON here"
      />
    </div>
  )
}

export default Layers;