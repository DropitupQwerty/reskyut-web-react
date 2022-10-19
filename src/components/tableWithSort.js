import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function DataTable({ rows, columns, checkboxSelected }) {
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5]}
        checkboxSelection
        pageSize={8}
        onSelectionModelChange={(ids) => checkboxSelected(ids)}
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}
