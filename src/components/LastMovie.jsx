import React, { useEffect, useState } from 'react';

function LastUser(props) {
  const [user, setUser] = useState({});

  const getUser = async (url) => {
    try {
      const response = await fetch(url);
      const userData = await response.json();

      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return {};
    }
  };

  useEffect(() => {

    let lastUser = 0;
    const apiUrl = 'http://localhost:3000/api/';


    const fetchData = async () => {
    
      try {
        const usersResponse = await fetch(apiUrl + 'users');
        const userData = await usersResponse.json();
        let lastUser = userData.count;

        //console.log(userData, lastUser);

        getUser(apiUrl + 'users/' + lastUser).then((userData) => setUser(userData));
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
    
  }, []);

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h3>Último Usuario Creado:</h3>
          <h5 className="m-0 font-weight-bold text-gray-800">{user.name}</h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: "40rem" }}
              src={user.user_image}
              alt={`${user.name} ${user.last_name}`}
            />
          </div>
          <p>
            <strong>Nombre completo:</strong> {user.name} {user.last_name} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Rol:</strong> {user.rol}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LastUser;
