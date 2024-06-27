const { ElevatorSystem, Elevator } = require('../ElevatorSystem');
const randint = require('../randint');

describe('Elevator System Edge Cases', () => {
  test('Zero Elevators', () => {
    const system = new ElevatorSystem(0, 10);
    expect(system.elevators.length).toBe(0);
    expect(() => system.generate_requests(5)).not.toThrow();
  });

  test('Single Elevator Operations', () => {
    const system = new ElevatorSystem(1, 5, addSample=false);
    system.generate_requests(5);
    system.dispatchRequests();
    system.update_targets();

    expect(system.elevators[0].destinations.inorderList().length).toBeGreaterThan(0);
  });

  test('All Requests from the Same Floor', () => {
    const system = new ElevatorSystem(3, 10, addSample=false);
    let floor = system.floors[0];
    for (let i = 0; i < 5; i++) {
        floor.addRequest([floor.val, randint(1, system.floorsNum)]);
    }

    let targetFloor = floor.val;
    system.dispatchRequests();
    system.update_targets();

    const elevatorsGoingToTarget = system.elevators.filter(elevator => elevator.targetFloor === targetFloor);
    expect(elevatorsGoingToTarget.length).toBeGreaterThan(0);
  });

  test('Non-existent Floor Requests', () => {
    const system = new ElevatorSystem(2, 5);
    system.floors[0].addRequest([0, 6])
    expect(() => system.dispatchRequests()).toThrow('Invalid floor number');
  });
});
