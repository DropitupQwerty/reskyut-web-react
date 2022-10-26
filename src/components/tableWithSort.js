import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function DataTable({
  rows,
  columns,
  checkboxSelected,
  checkBox,
  ...rest
}) {
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5]}
        checkboxSelection={checkBox}
        pageSize={8}
        onSelectionModelChange={(ids) => checkboxSelected(ids)}
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        {...rest}
      />
    </div>
  );
}
