import React from 'react';

const Elevator = ({ id, currentFloor, targetFloor, state, load, destinations }) => {
  if (targetFloor === -1) {
    targetFloor = "None"
  }

  return (
    <div className="elevator card">
      <div className="card-body">
        <h3 className="card-title">Elevator {id + 1}</h3>
        <p className="card-text"><strong>Current Floor:</strong> {currentFloor}</p>
        <p className="card-text"><strong>Target Floor:</strong> {targetFloor}</p>
        <p className="card-text"><strong>State:</strong> {state}</p>
        <p className="card-text"><strong>Destinations:</strong> {destinations.join(', ')}</p>
      </div>
    </div>
  );
  
  
};

export default Elevator;
