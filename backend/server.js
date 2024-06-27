// backend/server.js
const express = require('express');
const cors = require('cors');
const { ElevatorSystem, Elevator } = require('./ElevatorSystem');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let system;

app.post('/init', (req, res) => {
  const { elevators, floors } = req.body;
  system = new ElevatorSystem(elevators, floors);
  res.json({ message: 'System initialized' });
});

app.get('/status', (req, res) => {
  if (!system) {
    return res.status(500).json({ message: 'System not initialized' });
  }
  system.update_targets()
  res.json(system.elevators.map(elevator => ({
    id: elevator.id,
    currentFloor: elevator.currentFloor,
    targetFloor: elevator.targetFloor,
    state: elevator.state,
    destinations: elevator.destinations.inorderList(),
  })));
});

app.post('/request', (req, res) => {
  if (!system) {
    return res.status(500).json({ message: 'System not initialized' });
  }
  const { origin, target } = req.body;
  const bestElevator = system.assignElevator(origin, target);
  if (bestElevator) {
    bestElevator.addRequest(origin, target);
    res.json({ message: 'Request assigned' });
  } else {
    res.status(500).json({ message: 'No available elevator' });
  }
});

app.post('/step', (req, res) => {
  if (!system) {
    return res.status(500).json({ message: 'System not initialized' });
  }
  system.step();
  res.json({ message: 'Stepped' });
});

app.post('/one_floor', (req, res) => {
  if (!system) {
    return res.status(500).json({ message: 'System not initialized' });
  }
  system.one_floor();
  res.json({ message: 'Changed floor' });
});

app.post('/generate', (req, res) => {
  if (!system) {
    return res.status(500).json({ message: 'System not initialized' });
  }
  system.generate_requests(5);
  res.json({ message: 'Generated requests' });
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
