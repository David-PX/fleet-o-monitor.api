# Fleet-O-Monitor.API - Backend

## Description
This is the backend for the **Fleet-O-Monitor.API** project, a web application that enables fleet management, real-time monitoring, and alert handling through integration with GPS devices.

The backend is built with **Node.js and Express.js**, using **PostgreSQL** as the database and **Sequelize** as the ORM.

---

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- Sequelize (ORM for PostgreSQL)

---

## Prerequisites
Before starting the project, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [PostgreSQL](https://www.postgresql.org/) (v13 or later recommended)
- A package manager like `npm` or `yarn`

---

## Database Setup

1. Start the PostgreSQL service.
2. Create a database for the application by running the following command in PostgreSQL:
   
   ```sql
   CREATE DATABASE fleet-o-monitor.bd;
   ```
3. Create a user and assign privileges (optional, if you do not want to use the default `postgres` user):
   
   ```sql
   CREATE USER gps_user WITH ENCRYPTED PASSWORD 'gps_password';
   GRANT ALL PRIVILEGES ON DATABASE fleet-o-monitor.bd TO gps_user;
   ```
4. Configure the credentials in the `.env` file (see the next section).

---

## Installation and Configuration

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/David-PX/fleet-o-monitor.api.git
cd fleet-o-monitor.api
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a **`.env`** file in the project root and add the following configuration:

```env
PORT=5000
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=fleet-o-monitor.bd
DB_USER=gps_user
DB_PASS=gps_password
```

### 4️⃣ Run Migrations to Set Up the Database
```bash
npx sequelize-cli db:migrate
```

---

## Running the Server

### In Development Mode (with `nodemon` for auto-reloading)
```bash
npm run dev
```

### In Production Mode
```bash
npm start
```

If the server starts successfully, you should see a message like:
```bash
🚀 Server running on port 5000
✅ Connected to PostgreSQL
```

---

## Main API Routes
| Method | Route | Description |
|---------|------------|--------------------------------|
| GET | `/api/vehicles` | Get all vehicles |
| POST | `/api/vehicles` | Create a new vehicle |
| PUT | `/api/vehicles/:id` | Update a vehicle |
| DELETE | `/api/vehicles/:id` | Delete a vehicle |

> **Note:** You can use tools like **Postman** or **cURL** to test these routes.

---

## Next Steps
- Implement real-time monitoring with WebSockets.
- Integrate with GPS devices.
- Develop an alert notification system.

Contributions and improvements are welcome! 🚀

