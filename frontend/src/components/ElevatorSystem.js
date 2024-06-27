import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Elevator from './Elevator';
import RequestForm from './RequestForm';

const ElevatorSystem = ({ config }) => {
  const [elevators, setElevators] = useState([]);

  const fetchStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3001/status');
      setElevators(response.data);
    } catch (error) {
      console.error('Error fetching elevator status:', error);
    }
  };

  useEffect(() => {
    const initializeSystem = async () => {
      try {
        await axios.post('http://localhost:3001/init', config);
        fetchStatus();
      } catch (error) {
        console.error('Error initializing the system:', error);
      }
    };

    initializeSystem();
  }, [config]);

  const handleStep = async () => {
    try {
      await axios.post('http://localhost:3001/step');
      fetchStatus();
    } catch (error) {
      console.error('Error stepping the system:', error);
    }
  };

  const handleOneFloor = async () => {
    try {
      await axios.post('http://localhost:3001/one_floor');
      fetchStatus();
    } catch (error) {
      console.error('Error changing the floor:', error);
    }
  }

  const handleGenerateRequests = async () => {
    try {
      await axios.post('http://localhost:3001/generate');
      fetchStatus();
    } catch (error) {
      console.error('Error changing the floor:', error);
    }
  }

  const handleRequestAdded = () => {
    fetchStatus();
  };

  return (
    <div>
      <RequestForm onRequestAdded={handleRequestAdded} />
      <div className="btn-group" role="group" aria-label="Basic outlined example">
        <button type="button" className="btn btn-outline-primary" onClick={handleStep}>Go to destination</button>
        <button type="button" className="btn btn-outline-primary" onClick={handleOneFloor}>Move one floor</button>
        <button type="button" className="btn btn-outline-primary" onClick={handleGenerateRequests}>Generate sample requests</button>
      </div>
      {/* <button className="btn btn-secondary" onClick={handleStep}>Go to destination</button>
      <button onClick={handleOneFloor}>Move one floor</button>
      <button onClick={handleGenerateRequests}>Generate sample requests</button> */}
      <div className="elevator-container">
        {elevators.map(elevator => (
          <Elevator key={elevator.id} {...elevator} />
        ))}
      </div>
    </div>
  );
};

export default ElevatorSystem;
