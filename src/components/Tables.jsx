import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Nombre', minWidth: 170 },
  { id: 'description', label: 'Descripcion', minWidth: 170 },
  { id: 'os', label: 'Sistema Operativo', minWidth: 170 },
  { id: 'processor', label: 'Procesador', minWidth: 170 },
  { id: 'memory', label: 'Memoria', minWidth: 170 },
  { id: 'graphic', label: 'Graficos', minWidth: 170 },
  { id: 'storage', label: 'Almacenamiento', minWidth: 170 },
];

function createData(product) {
	return {
		name: product.name,
		description: product.description,
		os: (
		  <div style={{ whiteSpace: 'pre-line' }}>
			<b>Minimum: </b>{product.requeriment.os_minumum} 
			{'\n'}
			<b>Recommended: </b>{product.requeriment.os_recommended}
		  </div>
		),
		processor: (
		  <div style={{ whiteSpace: 'pre-line' }}>
			<b>Minimum: </b>{product.requeriment.processor_minimum}
			{'\n'}
			<b>Recommended: </b>{product.requeriment.processor_recommended}
		  </div>
		),
		memory: (
		  <div style={{ whiteSpace: 'pre-line' }}>
			<b>Minimum: </b>{product.requeriment.memory_minimum}
			{'\n'}
			<b>Recommended: </b>{product.requeriment.memory_recommended}
		  </div>
		),
		graphic: (
		  <div style={{ whiteSpace: 'pre-line' }}>
			<b>Minimum: </b>{product.requeriment.graphic_minimum}
			{'\n'}
			<b>Recommended: </b>{product.requeriment.graphic_recommended}
		  </div>
		),
		storage: (
		  <div style={{ whiteSpace: 'pre-line' }}>
			<b>Minimum: </b>{product.requeriment.storage_minimum}
			{'\n'}
			<b>Recommended: </b>{product.requeriment.storage_recommended}
		  </div>
		),
	  };
	  
}

export default function ProductTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulación de una API, reemplaza la URL con tu endpoint real
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((data) => {

		console.log(data);
        const formattedProducts = data.products.map((product) => createData(product));

		console.log(formattedProducts);
        setProducts(formattedProducts);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <h2 style={{ textAlign: 'center' }}> Listado de Productos </h2>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
