import React, { useState } from 'react';
import tableData from './helpers/table-rowdata';
import ArcgisMapview from './map/arcgis-mapview';
import TableView, { TableRowData } from './table-view';
import OnExtentsChange from './plugins/on-extents-change';
import { Bounds } from './map/arcgis-types';
import renderLayers from './plugins/render-layers';

interface MainViewState {
  selectedRecordId: number;
  requestUpdateLayers: boolean;
  center: number;
  zoom: number;
  bounds: Bounds;
}

const MainView: React.FC = () => {
  // console.log('rendering mainview...')

  const [state, setState] = useState<MainViewState | undefined>(undefined);


  const handleRowHover = (row: TableRowData) => { 
    setState({ ...state, selectedRecordId: row.id})
  }

  const refresh = () => {
    // console.log('@@: main-view | refresh just called')
    setState({...state, requestUpdateLayers: true})
  }

  const handleMapExtentsChange = (center, zoom, bounds) => {
    // console.log('@@: plugin just called: ', center, zoom, bounds.getSouthWest(), bounds.getNorthEast())
    setState({ ...state, center, zoom, bounds})
    refresh();
  }

  const plugins = [
    OnExtentsChange(handleMapExtentsChange),
    renderLayers(() => {
      // console.log('@ !!! renderLayers |  calling shouldrefresh');
      const shouldRefresh = state?.requestUpdateLayers ?? false;
      if (shouldRefresh) {
        setState({  ...state, requestUpdateLayers: false });
      }
      return shouldRefresh;
    },)
  ]
  return (
    <main className="main-view">
      <ArcgisMapview plugins={plugins}/>
      <TableView data={tableData} handleRowHover={ handleRowHover} />
    </main>
  );
};

export default MainView;
