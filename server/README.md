# 🧑‍💻 TeamType Server

The **backend API and real-time collaboration engine** for TeamType — a full-stack, real-time collaborative code editor.

Built with **Node.js**, **Express**, **Socket.IO**, and **MongoDB** to handle authentication, socket rooms, messaging, and live code updates.

---

## ⚙️ Tech Stack

- 🟢 [Node.js](https://nodejs.org)
- 🚂 [Express](https://expressjs.com)
- 🧠 [MongoDB + Mongoose](https://mongoosejs.com)
- 🔌 [Socket.IO](https://socket.io)
- 🔐 [JWT](https://jwt.io)
- 🧪 [Piston Api](#)

---

## 🚀 Getting Started

### 🧾 1. Clone the Repository

```bash
git clone https://github.com/ssb-shree/TeamType-a-collaborative-multi-code-IDE/tree/main/server.git
cd server
```

---

### 📦 2. Install Dependencies

```bash
npm install
```

---

### ⚙️ 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/teamtype
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=localhost:300
```

> If you're using a cloud DB (like MongoDB Atlas), replace `MONGO_URI` accordingly.

---

### ▶️ 4. Run the Server

```bash
npm run dev
```

> Your backend will be live at: [http://localhost:8080](http://localhost:8080)

---

## 🧠 Features

- 📡 Real-time communication with Socket.IO
- 📁 Room creation, joining, and broadcasting
- 🧾 JWT-based user authentication
- 🧠 MongoDB for session/data storage
- ⚙️ Clean Express routes and controller structure

---

## 📂 Project Structure

```bash
src/
├── controllers/
├── routes/
├── models/
├── db/
├── middleware/
├── app.js
├── piston.js
├── socket.js
└── server.js
```

## 🌐 Connect to Frontend

Make sure your frontend uses the backend URL in `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-render-url.onrender.com
```

---

## 👨‍💻 Author

Made with ❤️ by **Shree**

- GitHub: [@ssb-shree](https://github.com/ssb-shree)
- Portfolio: [ssb.is-a.dev](https://ssb.is-a.dev)

---

## 📄 License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
