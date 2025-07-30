import Polygon from '@arcgis/core/geometry/Polygon';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine.js';
import { geojsonToArcGIS } from '@terraformer/arcgis';

const ArcgisCalc = ({ geojson }: { geojson: string | null }) => {
  const area = () => {
    const polygon = new Polygon(geojsonToArcGIS(JSON.parse(geojson)));
    const areaInSquareMeters = geometryEngine.geodesicArea(polygon, 'square-meters');
    const areaInSquareFeet = geometryEngine.geodesicArea(polygon, 'square-feet');
    return `Area: ${areaInSquareFeet.toFixed(2)} ft² (${areaInSquareMeters.toFixed(2)} m²)`;
  }

  return (
    <div>
      { geojson && <>
        <h2>ArcGIS Area Calculation</h2>
        <p>{area()}</p>
      </> }
    </div>
  );
};

export default ArcgisCalc;