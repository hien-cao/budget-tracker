# Budget Tracker App

This app, Budget Tracker, is to help individuals or businesses monitor and manage their finances. It enables users to keep track of their budgets and expenses over a specific period of time.

### Development using docker

This method does not require installing node.js and setting up the DB locally. However, docker must be installed.

- Run `docker-compose up` to start the UI and the server.
- Run `docker-compose down` to remove docker containers and network.

The UI is available at `http://localhost:5030`

The server is available at `http://localhost:3000`

### Testing

There is no testing for both frontend and backend

### Technologies in the app

Frontend:

- React.js
- React router dom
- Zustand (state management)

Backend:

- Express.js

DB:

- MongoDB
