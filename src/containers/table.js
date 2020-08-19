import React from 'react';

const table = {
  columns: [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Type',
      accessor: 'type',
      filterable: true
    },
    {
      Header: 'URL',
      accessor: 'url'
    },
    {
      Header: 'Format',
      accessor: 'format',
      filterable: true
    },
    {
      Header: 'Price',
      accessor: 'price'
    },
    {
      Header: 'Fallback',
      accessor: 'fallback',
      Cell: d =>
        (d.value ? (
          <span style={{ color: 'green' }}>&#10003;</span>
        ) : (
          <span style={{ color: 'red' }}>&#215;</span>
        ))
    }
  ]
};
export default table;
