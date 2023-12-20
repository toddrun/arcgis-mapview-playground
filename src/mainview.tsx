import React from 'react';
import tableData from './helpers/table-rowdata';
import ArcgisMapview from './map/arcgis-mapview';
import TableView from './table-view';

const MainView: React.FC = () => {
  return (
    <main className="main-view">
      <ArcgisMapview />
      <TableView data={tableData} handleRowHover={() => null} />
    </main>
  );
};

export default MainView;
