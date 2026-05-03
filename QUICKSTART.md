# Quick Start Guide

## Prerequisites

- Node.js v14+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Setup Instructions

### 1. Backend Setup

Navigate to the server directory:

```bash
cd server
npm install
```

Create a `.env` file with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

Open a new terminal and navigate to the client directory:

```bash
cd client
npm install
```

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend will open at `http://localhost:5173`

## MongoDB Setup

### Option 1: Local MongoDB

```bash
# Start MongoDB
mongod
```

### Option 2: MongoDB Atlas (Cloud)

1. Create an account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

## Testing the Application

1. **Register**: Create a new account on the login page
2. **Start Chatting**:
   - Click "New Chat" to start a conversation
   - Select a user to chat with
   - Send messages in real-time
3. **Features to Try**:
   - Type a message and see the typing indicator
   - Send messages and see them appear instantly
   - Delete your own messages
   - Check user online status
   - Create multiple conversations

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running: `mongod`
- Check your `MONGODB_URI` in `.env`

### Socket.io Connection Issues

- Check if backend is running on port 5000
- Verify `VITE_SOCKET_URL` in client `.env.local`

### CORS Errors

- Ensure `CLIENT_URL` is set correctly in server `.env`
- Check that ports are not already in use

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

## Build for Production

### Backend

The backend is ready for production deployment. Just set `NODE_ENV=production`

### Frontend

```bash
cd client
npm run build
```

Deploy the `dist` folder to a hosting service like Vercel, Netlify, or GitHub Pages

## Environment Variables Reference

### Server `.env`

| Variable    | Description               | Example                            |
| ----------- | ------------------------- | ---------------------------------- |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/chat-app |
| JWT_SECRET  | Secret key for JWT        | your_secret_key                    |
| PORT        | Server port               | 5000                               |
| NODE_ENV    | Environment               | development/production             |
| CLIENT_URL  | Frontend URL              | http://localhost:5173              |

### Client `.env.local`

| Variable        | Description          | Example                   |
| --------------- | -------------------- | ------------------------- |
| VITE_API_URL    | Backend API URL      | http://localhost:5000/api |
| VITE_SOCKET_URL | Socket.io server URL | http://localhost:5000     |

## Support

For issues or questions, please refer to the main README.md or create an issue on the repository.
