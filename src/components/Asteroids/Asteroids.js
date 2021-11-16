import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import axios from "axios";
import UseToken from '../App/UseToken';
import "./Asteroids.css";

function Asteroids() {
  const [asteroids, setAsteroids] = useState([]);
  const [paginationSize, setPaginationSize] = useState(5);
  const { token } = UseToken();
  useEffect(() => {
    axios('https://localhost:44391/api/asteroids?planet=earth&startdate=2020-09-09&enddate=2020-09-16&order=diametro&typeorder=desc&nrp=5&cp=1', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
      },
    })
      .then((response) => {
        setAsteroids(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setAsteroids]); // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleChangePaginationSize = e => {
    setPaginationSize(e.target.value);
  }

  return (
    <div className="containers-column">
      <div className="containers-row">
        <div>
          <p className="edit-margin">Total items: {asteroids.length}</p>
        </div>
        <div className="items-to-right">
          <p className="edit-margin">Show items: </p>
          <select
            onChange={handleChangePaginationSize} >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
      <div className="ag-theme-alpine" style={{ height: 310, width: 820 }}>
        <AgGridReact
          rowData={asteroids}
          pagination={true}
          paginationPageSize={parseInt(paginationSize)}
          paginationAutoPageSize={true}>
          <AgGridColumn field="name" sortable={true}></AgGridColumn>
          <AgGridColumn field="diameter" sortable={true}></AgGridColumn>
          <AgGridColumn field="velocity"></AgGridColumn>
          <AgGridColumn field="date"></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
}

export default Asteroids;