// backend/ElevatorSystem.js
const AVLTree = require('./AVLTree');
const randint = require('./randint');

class Elevator {
  constructor(id, currentFloor, state = 'IDLE') {
    this.id = id;
    this.currentFloor = currentFloor;
    this.targetFloor = -1;
    this.state = state;
    this.load = 0;
    this.destinations = new AVLTree();
    this.originToTarget = {};
  }

  update(newCurrent, newTarget) {
    this.currentFloor = newCurrent;
    this.targetFloor = newTarget;
  }

  addRequest(requestOrigin, requestTarget) {
    if (!this.destinations.exists(requestOrigin)) {
      this.destinations.insert(requestOrigin);
    }
    if (!this.originToTarget[requestOrigin]) {
      this.originToTarget[requestOrigin] = [];
    }
    this.originToTarget[requestOrigin].push(requestTarget);
    // console.log(`Adding ${requestOrigin} to Elevator ${this.id}`);
  }

  handleDisembark() {
    // console.log(`Opening doors: floor ${this.currentFloor}`);
    if (this.originToTarget[this.currentFloor]) {
      for (let target of this.originToTarget[this.currentFloor]) {
        if (!this.destinations.exists(target)) {
          this.destinations.insert(target);
        }
        // console.log(`Adding ${target} to Elevator ${this.id}`);
      }
      delete this.originToTarget[this.currentFloor];
    }
  }

  setTargetFloor() {
    if (this.destinations.exists(this.currentFloor)) {
      this.targetFloor = this.currentFloor;
      return;
    }

    let destinations = this.destinations.inorderList();
    if (destinations.length !== 0) {
      if (this.state === 'IDLE') {
        this.targetFloor = this.destinations.findClosestValue(this.currentFloor);
      } else if (this.state === 'UP') {
        let nextUp = this.destinations.findSuccessor(this.currentFloor);
        if (nextUp) {
          this.targetFloor = nextUp;
        } else {
          let nextDown = this.destinations.findPredecessor(this.currentFloor);
          if (nextDown) {
            this.targetFloor = nextDown;
            this.state = 'DOWN';
          }
        }
      } else if (this.state === 'DOWN') {
        let nextDown = this.destinations.findPredecessor(this.currentFloor);
        if (nextDown) {
          this.targetFloor = nextDown;
        } else {
          let nextUp = this.destinations.findSuccessor(this.currentFloor);
          if (nextUp) {
            this.targetFloor = nextUp;
            this.state = 'UP';
          }
        }
      }
    } else {
      this.currentFloor = 0;
      this.targetFloor = -1;
      this.state = 'IDLE';
      return;
    }

    if (this.targetFloor) {
      if (this.targetFloor > this.currentFloor) {
        this.state = 'UP';
      } else if (this.targetFloor < this.currentFloor) {
        this.state = 'DOWN';
      }
    }
  }

  moveToDest() {
    if (this.targetFloor >= 0) {
      this.destinations.delete(this.targetFloor);
      this.update(this.targetFloor, -1);
      this.handleDisembark();
    } else if (this.targetFloor == -1) {
      this.currentFloor = 0;
      this.targetFloor = -1;
      this.state = 'IDLE';
    }
  }

  moveOneFloor() {
    if (this.targetFloor > this.currentFloor) {
      this.currentFloor += 1;
    } else if (this.targetFloor < this.currentFloor) {
      this.currentFloor -= 1;
      if (this.currentFloor == 0) {
        this.moveToDest()
      }
    }

    if (this.currentFloor === this.targetFloor) {
      this.moveToDest();
    }
  }
}

class Floor {
  constructor(val) {
    this.val = val;
    this.requests = [];
  }

  addRequest(request) {
    this.requests.push(request);
  }

  getRequests() {
    return this.requests;
  }

  clearRequests() {
    this.requests = [];
  }

  static findFloorByVal(floors, val) {
    return floors.find(floor => floor.val === val);
  }
}

class ElevatorSystem {
  constructor(elevatorsNum = 5, floorsNum = 10, addSample=true) {
    this.elevatorsNum = elevatorsNum
    this.floorsNum = floorsNum
    this.elevators = Array.from({ length: elevatorsNum }, (_, i) => new Elevator(i, randint(1, floorsNum)));
    this.floors = Array.from({ length: floorsNum }, (_, i) => new Floor(i + 1));
    if (addSample) {
      this.init(floorsNum)
    }

  }

  init(floorsNum) {
    for (let floor of this.floors) {
      for (let i = 0; i < 3; i++) {
        let origin = floor.val;
        let target = randint(1, floorsNum);
        while (origin === target) {
          target = randint(1, floorsNum);
        }
        floor.addRequest([origin, target]);
      }
    }
    
    this.dispatchRequests();
  }

  calculateCost(elevator, requestOrigin) {
    let distanceCost = Math.abs(elevator.currentFloor - requestOrigin);
    let howBusy = elevator.destinations.inorderList().length;
    let directionCost = 0;

    if (elevator.state === 'UP' && requestOrigin < elevator.currentFloor) {
      directionCost += 10;
    } else if (elevator.state === 'DOWN' && requestOrigin > elevator.currentFloor) {
      directionCost += 10;
    }

    return distanceCost + howBusy + directionCost;
  }

  assignElevator(requestOrigin, requestTarget) {
    let minCost = Infinity;
    let bestElevator = null;

    for (let elevator of this.elevators) {
      let cost = this.calculateCost(elevator, requestOrigin);
      if (cost < minCost) {
        minCost = cost;
        bestElevator = elevator;
      }
    }

    return bestElevator;
  }

  dispatchRequests() {
    for (let floor of this.floors) {
        let requests = floor.getRequests();
        for (let [requestOrigin, requestTarget] of requests) {
            if (requestOrigin < 1 || requestOrigin > this.floorsNum || requestTarget < 1 || requestTarget > this.floorsNum) {
                throw new Error(`Invalid floor number`);
            }

            let bestElevator = this.assignElevator(requestOrigin, requestTarget);
            if (bestElevator) {
                bestElevator.addRequest(requestOrigin, requestTarget);
            }
        }
        floor.clearRequests();
    }
}

  update_targets() {
    for (let elevator of this.elevators) {
      elevator.setTargetFloor()
    }
  }

  status(target = false) {
    if (target) {
      console.log('AFTER SETTING TARGET FLOORS');
    } else {
      console.log('AFTER MOVE TO DEST');
    }
    for (let elevator of this.elevators) {
      let state = elevator.state;
      console.log(`Elevator ${elevator.id}:`);
      console.log(`  Current Floor: ${elevator.currentFloor}`);
      console.log(`  State: ${state}`);
      console.log(`  Target Floor: ${elevator.targetFloor}`);
      console.log(`  Load: ${elevator.load}`);
      let destinations = elevator.destinations.inorderList();
      console.log(`  Destinations: ${destinations}`);
      console.log('\n');
    }

    console.log('---------------------------------------------');
  }

  checkAllFinished() {
    for (let elevator of this.elevators) {
      if (elevator.destinations.inorderList().length !== 0) {
        return false;
      }
    }
    return true;
  }

  step() {
    for (let elevator of this.elevators) {
      elevator.setTargetFloor();
    }
    // this.status(true);

    for (let elevator of this.elevators) {
      elevator.moveToDest();
    }
    // this.status();
    this.dispatchRequests()
  }

  one_floor() {
    for (let elevator of this.elevators) {
      elevator.setTargetFloor();
    }
    for (let elevator of this.elevators) {
      elevator.moveOneFloor();
    }
    this.dispatchRequests()
  }

  generate_requests(n) {
    for (let i = 0; i < n; i++) {
      let floor_val = randint(1, this.floorsNum)
      let floor = Floor.findFloorByVal(this.floors, floor_val)
      let origin = floor.val
      let target = randint(1, this.floorsNum);

      while (origin === target) {
        target = randint(1, this.floorsNum);
      }
      
      floor.addRequest([origin, target]);
    }
    this.dispatchRequests()
  }
}

module.exports = { ElevatorSystem, Elevator }
