import React from 'react';

// Assume each row of data has an 'id' property
export type TableRowData = {
  id: number;
  [key: string]: any; // Additional properties of the row
};

type TableProps = {
  data: TableRowData[];
  handleRowHover: (row: TableRowData) => void;
};

const TableView: React.FC<TableProps> = ({ data, handleRowHover }) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {/* Dynamically create headers based on the keys of the first data object */}
            {data[0] &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} onMouseOver={() => handleRowHover(row)}>
              {Object.entries(row).map(([key, value], index) =>
                // Exclude the id from being displayed in the table cell
                key !== 'id' ? <td key={key}>{value}</td> : null
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
