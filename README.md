# Elevator System

This project is an elevator system built with a backend written in Node.js using Express and a frontend developed with React and Bootstrap. The backend includes tests to ensure the system operates correctly.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Running the Project Locally](#running-the-project-locally)
- [Running Tests](#running-tests)
- [Technologies Used](#technologies-used)
- [Elevator system algorithm](#algorithm)
## Features
- Simulates an elevator system with multiple floors.
- Backend API to control elevator operations.
- Interactive frontend to visualize and control the elevator.
- Comprehensive test suite for backend functionality.

## Installation
To run this project locally, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/klark142/elevator-system.git
    cd elevator-system
    ```

2. **Install backend dependencies:**
    ```sh
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

## Running the Project Locally

1. **Start the backend server:**
    ```sh
    cd backend
    npm start
    ```

2. **Start the frontend server:**
    ```sh
    cd ../frontend
    npm start
    ```

3. **Access the application:**
    Open your browser and navigate to `http://localhost:3000`

## Running Tests

1. **Navigate to the backend directory:**
    ```sh
    cd backend
    ```

2. **Run the tests:**
    ```sh
    npm test
    ```

## Technologies Used
- **Backend:**
  - Node.js
  - Express
  - CORS

- **Frontend:**
  - React
  - Bootstrap

- **Testing:**
  - Jest

## Elevator system algorithm
To ensure system's efficiency I have decided to implement an algorithm that uses destination dispatch algorithm, but also utilizes cost funtion to determine the best elevator for each request. <br />
### Destination dispatch
**Destination dispatch** is an optimization technique which groups the passengers heading to the same destinations. The main difference is the fact that users have to specify the floor they are heading to before entering the elevator. Then the system assigns the best elevator to the user based on the cost function.

### Cost function
The cost function is used to calculate the efficiency of assigning a specific elevator to a request. It takes into account three factors:
1. **Distance cost**: he absolute difference between the current floor of the elevator and the origin floor of the request.
2. **Load cost**: the number of destinations the elevator currently has.
-3.**Direction cost**: a penalty added if the request's origin is in the opposite direction of the elevator's current travel direction.
The elevator that minimizes the cost function for a given request is chosen to handle it.

### Use of AVL Tree
The system uses an AVL Tree to store the destinations of each elevator. The use of such structure was optimal for the following reasons:
1. **Logarithmic Time Complexity:** AVL trees maintain a balanced structure, ensuring that insertions, deletions, and lookups all occur in O(log n) time.

2. **Efficient Floor Navigation:** The AVL tree allows the system to quickly find:
   - The smallest floor greater than the current floor (useful when the elevator is moving up).
   - The largest floor smaller than the current floor (useful when the elevator is moving down).