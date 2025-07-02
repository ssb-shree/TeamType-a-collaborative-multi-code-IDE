# 🧑‍💻 TeamType Client

A sleek **UI for a real-time collaborative code editor**, where developers can connect, code & test together, and share live sessions — all in one place.

Built with **[Next.js](https://nextjs.org/)** and powered by **[Socket.IO Client](https://socket.io/docs/v4/client-api/)** for real-time magic.

---

## ⚙️ Tech Stack

### 🖥️ Frontend (Client)

- ⚛️ [Next.js 14](https://nextjs.org)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 🧠 [Zustand](https://github.com/pmndrs/zustand)
- 🔌 [Socket.IO Client](https://socket.io/docs/v4/client-api/)
- 🧩 [shadcn/ui](https://ui.shadcn.dev/)
- ✍🏼 [CodeMirror](https://codemirror.net/)
- 🌐 [Axios](https://axios-http.com)

---

## 🚀 Getting Started

Follow these steps to run the project locally:

---

### 🧾 1. Clone the Repository

```bash
git clone https://github.com/ssb-shree/TeamType-a-collaborative-multi-code-IDE/tree/main/client.git
cd teamtype-client
```

> Make sure your [backend server](https://github.com/ssb-shree/TeamType-a-collaborative-multi-code-IDE/tree/main/server.git) is also running.

---

### 📦 2. Install Dependencies

Using **npm**:

```bash
npm install
```

Or with **yarn**:

```bash
yarn install
```

---

### ⚙️ 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_STATUS=DEV
```

> Replace with your deployed backend URL

---

### ▶️ 4. Start the Development Server

Using **npm**:

```bash
npm run dev
```

Or with **yarn**:

```bash
yarn dev
```

---

### 🌐 5. Open in Browser

Visit [http://localhost:3000](http://localhost:3000) in your browser to start coding collaboratively.

---

## 🧠 Features

- 🔁 Real-time collaborative coding via Socket.IO
- 🧑‍🤝‍🧑 Join or create live coding rooms
- 📝 Syntax-highlighted code editor (CodeMirror)
- ⚡ Smooth state management with Zustand
- 🧪 Modern UI with shadcn/ui and Tailwind CSS
- 📦 Clean, scalable structure with support for custom features

---

## 🛰️ Backend Repository

Make sure you're also running the server from:

🔗 [TeamType Server Repo](https://github.com/ssb-shree/TeamType-a-collaborative-multi-code-IDE/tree/main/server.git)

---

---

## 👨‍💻 Author

Made with ❤️ by **Shree**

- GitHub: [@ssb-shree](https://github.com/ssb-shree)
- Portfolio: [ssb-is-a.dev](https://ssb.is-a.dev/)

---

## 📄 License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
