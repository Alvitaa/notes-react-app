# Note-Taking App

A simple full-stack note-taking application built with React + Vite on the frontend and Spring Boot on the backend, connected to a MySQL database.

This website allows users to:

- Create, edit and delete notes.
- Organize notes by categories.
- Archive their own notes.

This project was built as a personal portfolio project and demonstrates full-stack development using modern technologies.

---

## Technological Stack

| Frontend         | Backend         | Database     |
| ---------------- | --------------- | ------------ |
| React (Vite)     | Spring Boot     | MySQL        |
| React Router Dom | Spring Data JPA | MySQL Server |
| React Icons      | Lombok          |              |

---

## Prerequisites

Make sure you have these tools installed:

| Tool         | Recommended Version |
| ------------ | ------------------- |
| Node.js      | 18+                 |
| npm          | 9+                  |
| Java JDK     | 17+                 |
| MySQL Server | 8+                  |

> **Note:** The app uses MySQL. You can also run MySQL via Docker if preferred.

## Backend Setup

### 1. Configure database connection

Edit the file: <code>backend/src/main/resources/application.properties</code>

Set your MySQL credentials:

```
properties
spring.datasource.url=jdbc:mysql://localhost:3306/notesdb
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 2. Run the backend

From the project root or use your IDE run configuration.

```
cd backend
./mvnw spring-boot:run
```

### 3. Database Setup

In the ```/migrations``` folder you will find:

- ```CreateDB.sql``` — creates the notesdb database
- ```migrations.sql``` — populates tables with sample data

Follow the next order to run the SQL files:

1. Run ```CreateDB.sql``` in your MySQL client.
2. Run ```migrations.sql``` to populate the database.

### 4. Frontend Setup

1. Install dependencies, In the frontend root folder: ```npm install```

2. Run the frontend ```npm run dev```

3. Open the app
```
Visit: http://localhost:5173
```

> Note: Vite runs on port 5173 by default.

### 5. Demo Login

The sample data includes these credentials:
```
username: Alvita
password: password
```

## Notes

- This project was originally created using Create React App (CRA) and later migrated to Vite.

- The backend and database are intentionally separated on the same repository to demonstrate a full-stack architecture.