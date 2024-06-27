const { sys } = require('typescript');
const { ElevatorSystem, Elevator } = require('../ElevatorSystem');

describe('ElevatorSystem integration', () => {
  test('handling multiple requests', () => {
    const system = new ElevatorSystem(3, 10);
    system.generate_requests(5);
    system.step();
    expect(system.checkAllFinished()).toBe(false);
  });

  test('complete journey from bottom to top', () => {
    const system = new ElevatorSystem(1, 10, false);
    let elevator = system.elevators[0];
    elevator.currentFloor = 1;
    system.floors[0].addRequest([1, 10]);
    system.dispatchRequests();
    system.step();
    system.step()

    expect(system.elevators[0].currentFloor).toBe(10);
  });
});
