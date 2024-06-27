const { ElevatorSystem, Elevator } = require('../ElevatorSystem');

describe('Elevator class', () => {
  let elevator;

  beforeEach(() => {
    elevator = new Elevator(0, 1); 
  });

  test('initial state', () => {
    expect(elevator.currentFloor).toBe(1);
    expect(elevator.state).toBe('IDLE');
  });

  test('update method', () => {
    elevator.update(5, 10);
    expect(elevator.currentFloor).toBe(5);
    expect(elevator.targetFloor).toBe(10);
  });

  test('addRequest handles new requests', () => {
    elevator.addRequest(3, 5);
    expect(elevator.destinations.exists(3)).toBe(true);
    expect(elevator.originToTarget[3]).toContain(5);
  });

  test('handleDisembark opens doors and manages disembarks', () => {
    elevator.currentFloor = 3;
    elevator.originToTarget[3] = [5];
    elevator.handleDisembark();
    expect(elevator.destinations.exists(5)).toBe(true);
  });

  test('moveOneFloor updates currentFloor and state correctly', () => {
    elevator.destinations.insert(5)
    elevator.setTargetFloor();
    elevator.moveOneFloor();
    expect(elevator.currentFloor).toBe(2);
    expect(elevator.state).toBe('UP');
  });

  test('moveToDest moves the elevator to the destination', () => {
    elevator.destinations.insert(4)
    elevator.setTargetFloor();
    elevator.moveToDest();
    expect(elevator.currentFloor).toBe(4);
    expect(elevator.state).toBe('UP');
  });
});
