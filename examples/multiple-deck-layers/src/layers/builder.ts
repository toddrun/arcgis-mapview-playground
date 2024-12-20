import { GeoJsonLayer } from "@deck.gl/layers";
import { DeckLayer } from "@deck.gl/arcgis"

export const buildGeoJsonLayer = (url: string) => {
  return new GeoJsonLayer({
    id: Math.floor(Math.random() * 12),
    data: url,
    stroked: true,
    filled: true,
    extruded: false,
    lineWidthMinPixels: 1,
    getFillColor: [160, 160, 180, 200],
    getLineColor: [0, 0, 0, 255],
    getLineWidth: 1,
  });
}

const buildDeckLayer = (url: string) => {
  return new DeckLayer({
    'deck.layers': [buildGeoJsonLayer(url)],
    'deck.getCursor': ({ isDragging }) => (isDragging ? 'grabbing' : 'inherit'),
    'deck.getTooltip': ({ object }) => (object?.tooltip && {
      html: `<p>${object.tooltip}</p>`,
      style: {
        backgroundColor: '#fcfcfc',
        color: '#060606',
        fontSize: '1em',
        lineHeight: '0.3em',
        padding: '0 10px',
      },
    }),
  });
}

export default buildDeckLayer;