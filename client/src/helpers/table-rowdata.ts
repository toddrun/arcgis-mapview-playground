type TableRowData = {
  id: number;
  [key: string]: any;
};

const tableData: TableRowData[] = Array.from({ length: 10 }, (_, rowIndex) => {
  const row: TableRowData = { id: rowIndex + 1 }; // Start IDs at 1 for demonstration

  for (let columnIndex = 1; columnIndex <= 10; columnIndex++) {
    row[`column${columnIndex}`] = `Row ${rowIndex + 1} Col ${columnIndex}`;
  }

  return row;
});

console.log(tableData);

export default tableData;
