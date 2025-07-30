import { useState } from "react";

interface GeoJson {
  geojson: string,
  setGeojson: (geojson: string) => void
}

const Layers: React.FC<GeoJson> = ({ geojson, setGeojson}) => { 
  const [localValue, setLocalValue] = useState(geojson || '');

  return(
    <div>
      <h2>GeoJSON</h2>
      <textarea
        style={{ width: '90%' }}
        rows={10}
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value);
          setGeojson(e.target.value);
        }}
        placeholder="Paste GeoJSON here"
      />
    </div>
  )
}

export default Layers;