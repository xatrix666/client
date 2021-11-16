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
  const [planetName, setPlanetName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { token } = UseToken();

  const handleChangePaginationSize = e => {
    setPaginationSize(e.target.value);
  }

  const calculateOnWeekDates = (startDate, endDate) => {
    return new Date(endDate - startDate).getDate() - 1
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const validDate = calculateOnWeekDates(new Date(startDate), new Date(endDate));
    if (validDate < 8) {
      axios(`https://localhost:44391/api/asteroids?planet=${planetName}&startdate=${startDate}&enddate=${endDate}&order=diametro&typeorder=desc&nrp=5&cp=1`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`
        },
      })
        .then((response) => {
          setErrorMessage(null);
          setAsteroids(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setErrorMessage('Range 1 week');
    }
  }

  const handleSetPlanetName = (e) => {
    setPlanetName(e.target.value)
  }

  const handleSetStartDate = (e) => {
    setStartDate(e.target.value)
  }
  const handleSetEndDate = (e) => {
    setEndDate(e.target.value)
  }

  return (
    <div className="asteroids-wrapper">
      {errorMessage &&
        <h4 className="error-user"> {errorMessage} </h4>}
      <div className="filter-wrapper">
        <h2>Filters</h2>
        <form onSubmit={handleSubmit}>
          <label className="margin-element-filters">
            <p>Planet Name:</p>
            <input type="text" className="input-size" onChange={handleSetPlanetName} required />
          </label>
          <label className="margin-element-filters">
            <p>Initial Date:</p>
            <input type="date" className="input-size" onChange={handleSetStartDate} />
          </label>
          <label className="margin-element-filters">
            <p>End Date:</p>
            <input type="date" className="input-size" onChange={handleSetEndDate} />
          </label>
          <div className="margin-element-filters button-style">
            <button type="submit">Filtrar</button>
          </div>
        </form>
      </div>
      <div className="containers-column">
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
      </div>
    </div>
  );
}

export default Asteroids;