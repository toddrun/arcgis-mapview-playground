import React, { useState } from 'react';
import tableData from './helpers/table-rowdata';
import ArcgisMapview from './map/arcgis-mapview';
import TableView, { TableRowData } from './table-view';

const MainView: React.FC = () => {
  console.log('rendering mainview...')

  const [state, setState] = useState({});


  const handleRowHover = (row: TableRowData) => { 
    setState({ selectedRecordId: row.id})
  }

  return (
    <main className="main-view">
      <ArcgisMapview />
      <TableView data={tableData} handleRowHover={ handleRowHover} />
    </main>
  );
};

export default MainView;
