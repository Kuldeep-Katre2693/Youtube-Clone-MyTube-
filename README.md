# MyTube Clone

A full-stack YouTube-inspired video platform built with Next.js, React, Node.js, Express, MongoDB, and Socket.io. This project combines streaming, user accounts, content interaction, subscriptions, uploads, and real-time watch-party experiences in a single application.

## ✨ Features

### User Authentication and Profiles
- Secure sign-up and login flow
- OTP-based email verification
- JWT-based authentication
- User-specific history, likes, downloads, and watch later lists

### Video Experience
- Home page with video discovery
- Video watch page with player, metadata, and related content
- Like, dislike, comment, and report actions
- View tracking and persistent watch history

### Channel and Content Management
- Channel pages for creators and viewers
- Video upload support for channel owners
- Channel-specific video grids and channel tabs
- User-generated content organization

### Search and Navigation
- Search results experience
- Category-based browsing
- Sidebar navigation for core sections such as subscriptions, history, liked videos, downloads, and watch later

### Personal Library Features
- Watch history
- Liked videos
- Watch later list
- Downloads section

### Watch Party
- Create and join shared watch-party rooms
- Real-time video sync for participants
- Live chat inside watch-party sessions
- Participant presence and room management

### Real-Time Communication
- Socket.io-powered live interactions
- Peer-to-peer WebRTC support for collaborative streaming experiences
- Live chat and shared event updates

### Subscription and Payments
- Subscription plans and premium access flow
- Razorpay payment integration
- Subscription email notifications

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Radix UI components
- Socket.io client

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Razorpay
- Nodemailer
- Socket.io

## 📁 Project Structure

- mytube/ - Frontend Next.js application
- server/ - Backend API and real-time services
- server/uploads/ - Uploaded media storage

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have:
- Node.js installed
- MongoDB running or a reachable MongoDB Atlas connection
- A Razorpay account for payment integration

### 2. Install Dependencies

Frontend:
```bash
cd mytube
npm install
```

Backend:
```bash
cd server
npm install
```

### 3. Environment Setup
The backend already includes a sample environment file with connection and API settings. Update the values as needed for your local environment.

### 4. Run the Application

Start the backend server:
```bash
cd server
npm start
```

Start the frontend:
```bash
cd mytube
npm run dev
```

Open the app in your browser:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📌 Notes

- The application is designed as a feature-rich demo project for learning full-stack development.
- Video uploads and media assets are handled through the backend upload flow.
- Real-time watch-party features require the backend server to be running.

## ✅ Summary

MyTube Clone brings together the core building blocks of a modern video-sharing platform, including authentication, video streaming, user libraries, real-time collaboration, subscriptions, and content management.
