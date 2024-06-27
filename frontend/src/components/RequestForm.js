import React, { useState } from 'react';
import axios from 'axios';

const RequestForm = ({ onRequestAdded }) => {
  const [origin, setOrigin] = useState('');
  const [target, setTarget] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/request', { origin: parseInt(origin), target: parseInt(target) });
      onRequestAdded();
    } catch (error) {
      console.error('Error adding request:', error);
    }
    setOrigin('');
    setTarget('');
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="form-group row justify-content-center">
        <div className="col-sm-4">
          <input 
            type="number" 
            className="form-control" 
            placeholder="Origin" 
            value={origin} 
            onChange={(e) => setOrigin(e.target.value)} 
            required 
          />
        </div>
      </div>
      <div className="form-group row justify-content-center mt-3">
        <div className="col-sm-4">
          <input 
            type="number" 
            className="form-control" 
            placeholder="Target" 
            value={target} 
            onChange={(e) => setTarget(e.target.value)} 
            required 
          />
        </div>
      </div>
      <div className="form-group row justify-content-center mt-3">
        <div className="col-sm-4 text-center">
          <button type="submit" className="btn btn-primary">Add Request</button>
        </div>
      </div>
    </form>
  );
  
  
  
  
};

export default RequestForm;
