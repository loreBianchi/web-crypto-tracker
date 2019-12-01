import React from 'react';
import logo from './logo.svg';
import './App.css';
import CryptoContainer from './component/CryptoContainer';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <CryptoContainer />
    </div>
  );
}

export default App;
