# MyTube – A Full-Stack YouTube Clone with Watch Party, Premium Plans & Multi-Language Support

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge\&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge\&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge\&logo=mongodb)
![Firebase](https://img.shields.io/badge/Firebase-Authentication-FFCA28?style=for-the-badge\&logo=firebase)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real_Time-black?style=for-the-badge\&logo=socketdotio)
![WebRTC](https://img.shields.io/badge/WebRTC-Watch_Party-blue?style=for-the-badge)
![Razorpay](https://img.shields.io/badge/Razorpay-Payment-0C4BFF?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

### 🎬 A Modern YouTube Clone with Premium Subscription, Watch Party, Screen Sharing, Multi-language Comments, and Secure Authentication.

</div>

---

# 📌 Overview

MyTube is a modern full-stack video streaming platform inspired by YouTube. It provides users with a seamless video streaming experience along with several advanced features including real-time Watch Party, premium subscription plans, Razorpay payment integration, multilingual comment translation, OTP-based device verification, download restrictions, and a custom-built video player.

The application is built using modern web technologies such as **Next.js, React, Express.js, MongoDB Atlas, Firebase Authentication, Socket.IO, and WebRTC**, making it scalable, responsive, and feature-rich.

---

# 🚀 Key Features

## 🔐 Authentication & Security

* Google Authentication using Firebase
* OTP Verification for new devices
* Trusted Device Recognition
* Secure Session Management
* Protected Routes
* MongoDB User Management

---

## 👤 User Features

* Google Login
* Create Channel
* Upload Videos
* Watch Videos
* Search Videos
* Watch History
* Like / Dislike Videos
* Watch Later
* Download Videos
* Multi-language Comment Translation
* Dark / Light Theme
* Time-based Default Theme
* Profile Management

---

## 🎥 Video Features

* Custom Video Player
* Play / Pause
* Seek Bar
* Volume Control
* Fullscreen
* Playback Speed
* Loading Spinner
* Auto Next Video
* Dynamic Video Duration
* Responsive Video Layout

---

## 💬 Comment System

* Add Comments
* Multi-language Translation
* Language Selection before Translation
* Spam Detection
* Abusive Word Detection
* Empty Comment Validation
* Repeated Character Validation
* Special Character Spam Detection

---

## 👑 Premium Subscription

Three Premium Plans

* Bronze
* Silver
* Gold

Features

* Razorpay Payment Gateway
* Secure Payment Verification
* Plan Upgrade
* Premium Badge
* Subscription Persistence
* Database Update after Payment

---

## 📥 Download System

Download videos according to subscription plan.

| Plan   | Daily Download Limit |
| ------ | -------------------- |
| Free   | 0                    |
| Bronze | 5                    |
| Silver | 15                   |
| Gold   | Unlimited            |

Additional Features

* Daily Download Tracking
* Download Counter Reset
* Server-side Validation
* Direct File Download

---

# 🎉 Watch Party

One of the major features of this project.

Features include

* Create Watch Party
* Join using Party Code
* Real-time Video Synchronization
* Shared Play/Pause
* Shared Seeking
* Screen Sharing
* Audio Communication
* Camera Sharing
* Mute / Unmute
* Camera On / Off
* Leave Party
* End Party (Host)
* Invite Users
* Copy Party Code

Built using

* Socket.IO
* WebRTC
* MediaDevices API

---

# 🌐 Multi-language Support

Users can translate comments into

* English
* Hindi
* Marathi
* Tamil
* Telugu
* Kannada
* Malayalam
* Gujarati
* Bengali

---

# 🎨 Theme Support

* Light Theme
* Dark Theme
* Theme Persistence
* Automatic Default Theme
* Smooth Theme Transition

---

# 📊 Project Architecture

```
                   Frontend
                      │
        ┌─────────────┴─────────────┐
        │                           │
   Firebase Auth              Next.js UI
        │                           │
        └─────────────┬─────────────┘
                      │
                 Express API
                      │
     ┌────────────────┼────────────────┐
     │                │                │
 MongoDB         Socket.IO         Razorpay
     │                │                │
     │             WebRTC         Payment APIs
     │
 Comment System
```

---

# 🛠 Tech Stack

## Frontend

* Next.js
* React.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide React
* Axios
* Socket.IO Client

---

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Firebase Admin SDK
* Socket.IO
* WebRTC
* Nodemailer
* OTP Verification
* Razorpay SDK

---

## Authentication

* Firebase Authentication
* Google OAuth
* OTP Verification
* Trusted Devices

---

## Database

MongoDB Atlas

Collections

* Users
* Videos
* Comments
* Likes
* Watch Later
* History
* Downloads
* Watch Parties

---

# 📂 Project Structure

```
YouTube-Clone/
│
├── mytube/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   └── public/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── socket/
│   └── utils/
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/mytube.git

cd mytube
```

---

## Install Frontend

```bash
cd client

npm install
```

---

## Install Backend

```bash
cd server

npm install
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=5000

DB_URL=YOUR_MONGODB_URL

JWT_SECRET=YOUR_SECRET

RAZORPAY_KEY_ID=YOUR_KEY

RAZORPAY_KEY_SECRET=YOUR_SECRET

BREVO_SMTP_USER=YOUR_EMAIL

BREVO_SMTP_PASS=YOUR_PASSWORD
```

---

## Frontend (.env.local)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

NEXT_PUBLIC_FIREBASE_API_KEY=

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=

NEXT_PUBLIC_FIREBASE_PROJECT_ID=

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

# ▶ Running the Project

Backend

```bash
npm start
```

Frontend

```bash
npm run dev
```

---

# 📸 Screenshots

Add screenshots here.

```
Home Page

Watch Page

Upload Page

Subscription Page

Watch Party

Dark Theme

Comments Translation

Premium Plans
```

---

# 🎯 Future Improvements

* AI Video Recommendation System
* Live Streaming
* Playlist Management
* Notifications
* Video Analytics Dashboard
* Community Posts
* Shorts
* Mobile Application
* Admin Dashboard

---

# 🔒 Security Features

* OTP Verification
* Trusted Device Authentication
* Firebase Authentication
* Protected APIs
* Server-side Download Validation
* Secure Razorpay Payment Verification
* Spam Comment Detection
* Abusive Language Filtering

---

# 📈 Performance Optimizations

* Lazy Loading
* Metadata Preloading
* Responsive Design
* Optimized API Calls
* Dynamic Routing
* Efficient MongoDB Queries
* Track Replacement for Screen Sharing
* Persistent User Sessions

---

# 🧪 Testing Checklist

* User Login
* OTP Verification
* Video Upload
* Search
* Watch Video
* Like / Dislike
* Watch Later
* Download
* Payment
* Premium Upgrade
* Watch Party
* Screen Sharing
* Theme Toggle
* Comments
* Translation
* Logout/Login

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Developer

**Kuldeep Katre**

B.Tech Computer Science & Engineering
Priyadarshini Bhagwati College of Engineering, Nagpur

### Connect with me

* 💼 LinkedIn:(https://www.linkedin.com/in/kuldeep-katre-863557253/)
* 📧 Email: kuldeepkatre2693@gmail.com

---

<div align="center">

### ⭐ If you found this project useful, don't forget to star the repository!

**Built with ❤️ using Next.js, React, Node.js, MongoDB, Firebase, Socket.IO & WebRTC**

</div>
