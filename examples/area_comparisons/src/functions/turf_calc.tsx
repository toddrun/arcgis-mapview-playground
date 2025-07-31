import { area } from '@turf/area';
import { Geometry } from 'geojson';

const TurfCalc = ({ geojson }: { geojson: Geometry | null }) => {
  const calculatedArea = geojson ? area(geojson) : null;

  return (
    <div>
      { calculatedArea && <>
          <h2>Turf.js Area Calculation</h2>
          <p>
            Area: {(calculatedArea * 10.7639).toFixed(2)} ft² ({calculatedArea.toFixed(2)} m²)
          </p>
      </> }
    </div>
  )
}

export default TurfCalc;