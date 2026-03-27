# NeverLose
This is a full-stack NeverLose application built using React on the frontend and Node.js + Express on the backend.
The application helps users register, track, and manage lost items securely.

Table of Contents:
-Overview
-Features
-Tech stack
-Project Structure
-Description
-Installation
-Environment Variables
-Running the Application
-API Endpoints
-Future Enhancement
---------------------------------------------------------------------------------

## Overview:
The project is structured as a single repository with two separate folders:
Client : for the frontend
Server : for the backend
The backend is deployed on Render, and the frontend is deployed on Vercel.
---------------------------------------------------------------------------------

## Features implemented:

You can
-Create new items
-Add item description and upload photo
-Set security verification question
-Review item before submitting
-View item details
-Edit existing items
-Delete items
-Update item status (Lost / Found / Safe)
-Submit reports for items

To make the application user-friendly:
-Step-by-step item creation flow
-Clean UI with consistent layout
-Responsive design using Bootstrap
--------------------------------------------------------------------------------

## Tech stack:

### Frontend
-React
-React Router
-Bootstrap
-Axios for API calls

### Backend
-Node.js
-Express
-REST API
-Modular structure (routes, controllers)
---------------------------------------------------------------------------------

## Project structure:
NeverLose/
├── client/
│   ├── cypress/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── config/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│
├── Server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── DB/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── server.js
│
├── README.md
-----------------------------------------------------------------------------------

## Description:
-The frontend communicates with the backend using REST APIs 
-API calls are handled using Axios 
-Backend follows a structured flow: 
  routes → controllers → services 
-The application includes a multi-step wizard for item creation 
-Users can manage items (edit, delete, update status) 
-Labels can be downloaded for physical tagging 
----------------------------------------------------------------------------------- 

## Installation:
1.Clone the repository
git clone https://github.com/drayapati1998/NeverLose.git  
cd NeverLose 

2.Start the server
cd Server  
npm install  
npm run dev  
Server runs on port 5000  

3.Start the client
cd client  
npm install  
npm start  
Frontend runs on: http://localhost:3000
Note: The backend uses nodemon for automatic server restarting during development.

4.Environment Variables:
Create a .env file in both client and Server directories.
Client/.env  
REACT_APP_API_URL=http://localhost:5000  
Server/.env  
PORT=5000 
-------------------------------------------------------------------------------------- 

## Running the Application:
1.Start the backend server  
cd Server  
npm run dev  

2.Start the frontend client  
cd client  
npm start  

3.Open the application in browser  
http://localhost:3000  

4.Perform actions like creating, editing, and managing items and downloading the labels
----------------------------------------------------------------------------------------

## API Endpoints:
GET
POST
PATCH
DELETE
-----------------------------------------------------------------------------------------

## Future Enhancement:
-Real-time notifications for lost and found items  
-Location-based tracking using maps integration  
-Image recognition for identifying items using AI  
-Multi-user collaboration for shared items  





