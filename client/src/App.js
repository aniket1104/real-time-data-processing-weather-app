import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import WeatherDetails from './pages/WeatherDetails';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/weather/:city" element={<WeatherDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
