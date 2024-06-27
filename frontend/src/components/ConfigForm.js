// src/components/ConfigForm.js
import React, { useState } from 'react';

const ConfigForm = ({ onSubmit }) => {
  const [elevators, setElevators] = useState('');
  const [floors, setFloors] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const numElevators = parseInt(elevators, 10);
    const numFloors = parseInt(floors, 10);
    if (numElevators > 0 && numElevators <= 16 && numFloors > 0 && numFloors <= 20) {
      onSubmit(numElevators, numFloors);
    } else {
      alert('Invalid input! Number of elevators must be between 1 and 16 and number of floors between 1 and 20.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="form-group row justify-content-center">
        <label htmlFor="elevators" className="col-sm-2 col-form-label">Number of Elevators:</label>
        <div className="col-sm-4">
          <input 
            type="number" 
            className="form-control" 
            id="elevators" 
            placeholder="Enter number of elevators" 
            value={elevators} 
            onChange={(e) => setElevators(e.target.value)} 
            required 
          />
        </div>
      </div>
      <div className="form-group row justify-content-center mt-3">
        <label htmlFor="floors" className="col-sm-2 col-form-label">Number of Floors:</label>
        <div className="col-sm-4">
          <input 
            type="number" 
            className="form-control" 
            id="floors" 
            placeholder="Enter number of floors" 
            value={floors} 
            onChange={(e) => setFloors(e.target.value)} 
            required 
          />
        </div>
      </div>
      <div className="form-group row justify-content-center mt-3">
        <div className="col-sm-4 text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  );
  
};

export default ConfigForm;
