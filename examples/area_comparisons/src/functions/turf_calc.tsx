import { area } from '@turf/area';

const TurfCalc = ({ geojson }: { geojson: string | null }) => {
  const parsedGeojson = geojson ? JSON.parse(geojson) : null;
  const calculatedArea = area(parsedGeojson);

  return (
    <div>
      { geojson && <>
          <h2>Turf.js Area Calculation</h2>
          <p>
            Area: {(calculatedArea * 10.7639).toFixed(2)} ft² ({calculatedArea.toFixed(2)} m²)
          </p>
      </> }
    </div>
  )
}

export default TurfCalc;