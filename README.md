# QuickTalk

**QuickTalk** is a real-time chat application built with Socket.io, Express, and React. It offers seamless communication through instant messaging, image sharing, and message status updates, creating a dynamic and engaging chat experience.

## Features

- **Real-Time Messaging**:  
  Instant message exchange between users, powered by **Socket.io**, enabling fast and efficient communication.

- **Message Seen Status**:  
  Users can see when their messages have been read, improving communication clarity.

- **Image Uploads**:  
  Users can upload and share images within the chat. The images are displayed as previews in the chat window.

- **Online Users Indicator**:  
  A status indicator shows which users are online, helping users quickly identify active participants.

## Tech Stack

### Frontend:
- **React.js**
- **Socket.io-client**
- **Tailwind CSS** for responsive design and UI styling
- **Axios** for HTTP requests

### Backend:
- **Node.js** with **Express.js**
- **Socket.io** for real-time communication
- **MongoDB Atlas** for data storage (users, messages)
- **JWT (JSON Web Tokens)** for authentication
- **Cloud Storage** for storing uploaded images

## Installation

### Prerequisites:
- **Node.js** (version 14 or above)
- **MongoDB Atlas** (for the database)
- **Socket.io** (for real-time communication)

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/GitZaidHub/quicktalk.git
   cd quicktalk
Install dependencies for both client and server:

npm install
cd client && npm install
#### 3.Create a .env file in the root directory with the following configuration:
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
SOCKET_PORT=5000
#### 4. Run the app:

For development (both client and server):
npm run dev
For production:
npm run build

