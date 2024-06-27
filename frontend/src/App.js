import React, { useState } from 'react';
import ConfigForm from './components/ConfigForm';
import ElevatorSystem from './components/ElevatorSystem';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [config, setConfig] = useState(null);

  const handleConfigSubmit = (elevators, floors) => {
    setConfig({ elevators, floors });
  };

  const handleResetConfig = () => {
    setConfig(null);
  };

  return (
    <div className="App">
      <h1 className='main-title'>Elevator System Control Panel</h1>
      {!config ? (
        <ConfigForm onSubmit={handleConfigSubmit} />
      ) : (
        <>
          <ElevatorSystem config={config} />
          <button className="btn btn-secondary" onClick={handleResetConfig}>Back to Configuration</button>
        </>
      )}
    </div>
  );
};

export default App;
