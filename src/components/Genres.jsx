import React, { Component } from 'react';

class Genres extends Component {
  constructor() {
    super();
    this.state = {
      genresData: {},
    };
  }

  componentDidMount() {
    // Simulación de una API, reemplaza la URL con tu endpoint real
    const apiUrl = 'http://localhost:3000/api/';

    fetch(apiUrl + 'products')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          genresData: data.countByCategory || {},
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    const { genresData } = this.state;

    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">Todas las Categorías</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {Object.keys(genresData).map((genre, index) => (
                <div key={index} className="col-lg-6 mb-4">
                  <div className="card bg-dark text-white shadow">
                    <div className="card-body">
                      {genre} <br />
                      Cantidad de Productos: {genresData[genre]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Genres;
