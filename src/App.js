import React from 'react';
import UserSearch from './Component';
import './App.css'

const userData = [
  // Your actual user data
];

const App = () => {
  return (
    <div className="App-header">
      <h1>Búsqueda de usuarios</h1>
      <UserSearch userData={userData} />
    </div>
  );
};

export default App;
