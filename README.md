# MERN Chat Application

A modern real-time chat application built with MERN stack (MongoDB, Express, React, Node.js) and Socket.io, featuring a beautiful glassmorphic UI.

## Features

- **Real-time Messaging**: Instant message delivery using Socket.io
- **User Authentication**: Secure login and registration
- **Online Status**: See which users are online, offline, or away
- **Typing Indicators**: Real-time typing notifications
- **Glassmorphic UI**: Modern, sleek user interface with glassmorphism design
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Message Management**: Delete your own messages
- **Conversation Management**: View and manage your conversations
- **User Discovery**: Browse and start conversations with other users

## Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing

### Frontend

- **React** - UI library
- **Vite** - Build tool and dev server
- **Socket.io Client** - Real-time client
- **Axios** - HTTP client
- **CSS** - Glassmorphic styling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chat-application
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_secure_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env.local` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## Running the Application

### Start MongoDB

```bash
# If using local MongoDB
mongod
```

### Start the Backend

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

### Start the Frontend

In a new terminal:

```bash
cd client
npm run dev
```

The application will open at `http://localhost:5173`

## Project Structure

```
chat-application/
├── server/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Conversation.js       # Conversation schema
│   │   └── Message.js            # Message schema
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── messageController.js  # Message logic
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── messageRoutes.js      # Message endpoints
│   ├── middleware/
│   │   └── auth.js               # JWT middleware
│   ├── utils/
│   │   └── token.js              # Token utilities
│   ├── server.js                 # Main server file
│   ├── package.json
│   └── .env.example
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ConversationList.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── UserList.jsx
│   │   │   └── *.css
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   └── Chat.css
│   │   ├── context/
│   │   │   └── ChatContext.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/auth/users` - Get all users (protected)
- `PUT /api/auth/status` - Update user status (protected)

### Messages

- `POST /api/messages/conversation` - Get or create conversation (protected)
- `GET /api/messages/conversations` - Get all conversations (protected)
- `GET /api/messages/messages/:conversationId` - Get messages (protected)
- `POST /api/messages/send` - Send message (protected)
- `PUT /api/messages/read` - Mark messages as read (protected)
- `DELETE /api/messages/messages/:messageId` - Delete message (protected)

## Socket.io Events

### Client to Server

- `user-join` - User joins the app
- `join-conversation` - User joins a conversation
- `send-message` - Send a message
- `typing` - User is typing
- `stop-typing` - User stopped typing
- `message-read` - Message marked as read

### Server to Client

- `receive-message` - Receive a message
- `user-typing` - Another user is typing
- `user-stop-typing` - Another user stopped typing
- `user-status` - User status changed
- `message-read-receipt` - Message read receipt

## Features in Detail

### Real-time Messaging

Messages are delivered instantly using Socket.io, ensuring seamless communication between users.

### Typing Indicators

When a user starts typing, other users in the conversation see a typing indicator with animated dots.

### User Status

Users can see if other users are online, offline, or away, with visual indicators in the conversation list.

### Glassmorphic UI

The application features a modern glassmorphic design with:

- Frosted glass effect (backdrop blur)
- Subtle transparency
- Gradient accents
- Smooth transitions and animations

### Message Management

Users can delete their own messages, which are immediately removed from the conversation.

## Deployment

### Backend (Heroku/Railway)

1. Create an account on Heroku or Railway
2. Set environment variables
3. Deploy using Git

### Frontend (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to Vercel/Netlify

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue on the repository.

---

**Built with ❤️ using MERN Stack**
