const { ElevatorSystem, Elevator } = require('../ElevatorSystem');
const randint = require('../randint');

jest.mock('../randint', () => jest.fn());

describe('ElevatorSystem class with mocked randint', () => {
  let system;

  beforeEach(() => {
    randint.mockClear(); 
    randint.mockReturnValueOnce(3).mockReturnValueOnce(5);

    system = new ElevatorSystem(2, 10, addSample=false); 
  });

  test('dispatchRequests assigns elevators to requests', () => {
    system.floors[0].addRequest([1, 5]);
    system.dispatchRequests();

    const isRequestAssigned = system.elevators.some(elevator =>
      elevator.originToTarget[1] && elevator.originToTarget[1].includes(5)
    );

    expect(isRequestAssigned).toBe(true);
  });

  test('assignElevator assigns the best elevator', () => {
    system.floors[0].addRequest([1, 5]);
    const costElevator1 = system.calculateCost(system.elevators[0], 1);
    const costElevator2 = system.calculateCost(system.elevators[1], 1);

    const bestElevator = system.assignElevator(1);

    if (costElevator1 < costElevator2) {
      expect(bestElevator).toBe(system.elevators[0]);
    } else {
      expect(bestElevator).toBe(system.elevators[1]);
    }
  });

  test('update_targets updates elevator targets correctly', () => {
    system.floors[0].addRequest([1, 5]);
    system.dispatchRequests()
    system.update_targets();
    const isTargetUpdated = system.elevators.some(elevator =>
      elevator.originToTarget[1] && elevator.originToTarget[1].includes(5)
    );
    expect(isTargetUpdated).toBe(true);
  });

  test('checkAllFinished returns true when all elevators are idle', () => {
    system.floors[0].addRequest([1, 7]);
    system.floors[1].addRequest([2, 6]);
    system.dispatchRequests()

    system.step()
    system.step()
    system.step()
    system.step()

    expect(system.checkAllFinished()).toBe(true);
  });
});
