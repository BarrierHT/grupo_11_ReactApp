import React, { useState, useEffect } from 'react';
import DataContent from './DataContent';

function ContentRowTop() {
  const [dataBoxes, setDataBoxes] = useState([]);

  useEffect(() => {

    const apiUrl = 'http://localhost:3000/api/';

    const fetchData = async () => {
      try {
        const usersResponse = await fetch(apiUrl + 'users');
        const productsResponse = await fetch(apiUrl + 'products');

        const userData = await usersResponse.json();
        const productsData = await productsResponse.json();

        const usersDataBox = {
          title: 'Users in Data Base',
          amount: userData.count,
          icon: 'fa-user',
          styles: ['border-left-primary', 'text-primary'],
        };

        const productsDataBox = {
          title: 'Products in Data Base',
          amount: productsData.count,
          icon: 'fa-shopping-bag',
          styles: ['border-left-success', 'text-success'],
        };

        const categoriesDataBox = {
          title: 'Categories in Data Base',
          amount: Object.keys(productsData.countByCategory).length,
          icon: 'fa-list',
          styles: ['border-left-warning', 'text-warning'],
        };

        setDataBoxes([usersDataBox, productsDataBox, categoriesDataBox]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
      </div>
      {/* Content Row */}
      <div className="row">
        {/* Data Boxes */}
        {dataBoxes.map((dataBox, i) => (
          <DataContent key={i} dataBox={dataBox} />
        ))}
      </div>
      {/* End Content Row */}
    </div>
  );
}

export default ContentRowTop;
