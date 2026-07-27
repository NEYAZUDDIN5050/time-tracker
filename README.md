<div align="center">

# 🗺️ DayMap

### Navigate your day. Track your focus. Own your time.

A full-stack productivity and focus-tracking platform built with the MERN stack — featuring real-time focus sessions, automated Telegram alerts, and rich analytics.

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend_on-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com/)

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📖 Overview

**DayMap** is a personal productivity system built to solve a simple problem: knowing where your time *actually* goes. Unlike static to-do apps, DayMap enforces **time-boxed focus sessions** against task limits, sends **real-time Telegram alerts** when limits are breached, and visualizes your habits through **analytics dashboards** — all wrapped in a clean, animated interface.

This project was built end-to-end — architecture, backend, frontend, deployment, and DevOps — as both a daily-use tool and a demonstration of production-grade full-stack engineering practices.

---

## ✨ Features

| Category | Capabilities |
|---|---|
| 🔐 **Authentication** | JWT-based auth, bcrypt password hashing, rate-limited login/signup |
| ✅ **Task Management** | Full CRUD, priority levels, categories, time-limit enforcement, pagination & filtering |
| ⏱️ **Focus Sessions** | Live stopwatch timer, Pomodoro/deep-work modes, automatic task-time aggregation |
| 📝 **Notes** | Standalone or task-linked notes with tagging system |
| 🔔 **Smart Notifications** | Telegram bot integration — real-time limit-breach alerts & daily summary digests via cron |
| 📊 **Analytics** | Daily/weekly focus breakdowns, category-wise time distribution, interactive charts |
| 🎨 **UI/UX** | Fully responsive, animated navigation (Framer Motion), glassmorphism design system |
| ☁️ **Cloud-Native** | Deployed with CI-friendly architecture — Vercel (frontend) + Render (backend) + MongoDB Atlas |

---

## 🖼️ Screenshots

<div align="center">

### Dashboard — Task Management & Live Focus Timer
<img src="./docs/screenshots/dashboard.png" alt="Dashboard Screenshot" width="800"/>

### Analytics — Time Insights at a Glance
<img src="./docs/screenshots/analytics.png" alt="Analytics Screenshot" width="800"/>

### Real-Time Telegram Alerts
<img src="./docs/screenshots/telegram-alert.png" alt="Telegram Notification Screenshot" width="400"/>

### Notes — Standalone & Task-Linked
<img src="./docs/screenshots/notes.png" alt="Notes Screenshot" width="800"/>

### Fully Responsive Mobile Experience
<img src="./docs/screenshots/mobile.png" alt="Mobile Screenshot" width="300"/>

</div>

> 📌 *Add your actual screenshots to `docs/screenshots/` in your repo, using the filenames above (or update the paths). GitHub will render them automatically once pushed.*

---

## 🏗️ Architecture

```
┌──────────────────┐        HTTPS        ┌───────────────────┐        ┌──────────────────┐
│   React Client     │◄──────────────────►│   Express API        │◄──────►│   MongoDB Atlas    │
│   (Vercel)           │                     │   (Render)             │        │   (Cloud Database)  │
└──────────────────┘                     └─────────┬─────────┘        └──────────────────┘
                                                       │
                                    ┌──────────────────┼──────────────────┐
                                    ▼                  ▼                  ▼
                            ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
                            │  node-cron    │  │ Telegram Bot  │  │  Winston Logger    │
                            │  (scheduled   │  │  API          │  │  (structured logs) │
                            │   jobs)       │  │               │  │                   │
                            └──────────────┘  └──────────────┘  └──────────────────┘
```

**Backend follows a strict layered architecture:**

```
Route → Middleware (auth/validation) → Controller → Service → Model
```

This separation ensures controllers stay thin (HTTP concerns only), services own all business logic, and models are the single source of truth for data shape — making the codebase testable, maintainable, and easy to extend.

---

## 🧰 Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### Frontend
- **React 18** + **Vite** — fast dev/build tooling
- **Tailwind CSS** — utility-first styling
- **Zustand** — lightweight global state
- **TanStack Query** — server-state caching & sync
- **Framer Motion** — declarative animations
- **Recharts** — data visualization
- **React Router** — client-side routing
- **Axios** — HTTP client with interceptors

</td>
<td valign="top" width="50%">

### Backend
- **Node.js** + **Express** — REST API
- **MongoDB** + **Mongoose** — data persistence
- **JWT** + **bcryptjs** — authentication & security
- **node-cron** — scheduled background jobs
- **Telegram Bot API** — push notifications
- **Winston** + **Morgan** — structured logging
- **express-validator** — input validation
- **express-rate-limit** — brute-force protection

</td>
</tr>
</table>

---

## 🔑 Key Engineering Decisions

- **Layered backend architecture** (routes/controllers/services/models) for separation of concerns and testability
- **Data isolation by design** — every database query is scoped to `userId`, preventing cross-user data leakage even under ID enumeration
- **Idempotent notification system** — a `Notification` log collection prevents duplicate Telegram alerts from a cron job that runs every minute
- **Optimistic cache invalidation** — TanStack Query mutations automatically invalidate and refetch affected queries, keeping UI in sync without manual state management
- **Zero-downtime cron reliability** — paired with UptimeRobot health-checks to prevent free-tier server sleep from silently breaking scheduled jobs
- **Atomic increments** (`$inc`) for time-tracking updates, avoiding race conditions on concurrent session updates

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account (or local MongoDB instance)
- Telegram Bot Token ([via @BotFather](https://t.me/BotFather))

### 1. Clone the repository
```bash
git clone https://github.com/NEYAZUDDIN5050/time-tracker.git
cd time-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # fill in your values
npm run dev
```

**Required environment variables:**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_URL
npm run dev
```

Visit `http://localhost:5173` 🎉

---

## 📡 API Reference

<details>
<summary><strong>Authentication</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate & receive JWT |
| `GET` | `/api/auth/me` | Get current user profile |

</details>

<details>
<summary><strong>Tasks</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | List tasks (filterable, paginated) |
| `POST` | `/api/tasks` | Create a task |
| `GET` | `/api/tasks/:id` | Get a single task |
| `PATCH` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

</details>

<details>
<summary><strong>Focus Sessions</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/sessions/start` | Start a focus session |
| `PATCH` | `/api/sessions/:id/stop` | Stop & log session duration |
| `PATCH` | `/api/sessions/:id/cancel` | Cancel a running session |
| `GET` | `/api/sessions` | Session history |
| `GET` | `/api/sessions/running` | Get currently active session |

</details>

<details>
<summary><strong>Notes</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/notes` | List notes (filterable by task/tag) |
| `POST` | `/api/notes` | Create a note |
| `PATCH` | `/api/notes/:id` | Update a note |
| `DELETE` | `/api/notes/:id` | Delete a note |

</details>

<details>
<summary><strong>Analytics</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/analytics/daily` | Today's focus & task summary |
| `GET` | `/api/analytics/weekly` | Last 7 days breakdown |
| `GET` | `/api/analytics/category-breakdown` | Time distribution by category |

</details>

<details>
<summary><strong>Notifications</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/notifications/telegram/link` | Link Telegram chat for alerts |

</details>

> All routes except `/auth/signup` and `/auth/login` require a `Bearer` JWT in the `Authorization` header.

---

## 📁 Project Structure

```
time-tracker/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection, logger setup
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express route definitions
│   │   ├── controllers/     # Request/response handlers
│   │   ├── services/        # Business logic layer
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── jobs/            # Cron jobs (limit-check, daily summary)
│   │   └── utils/           # Telegram service, token generation
│   └── server.js
│
└── frontend/
    └── src/
        ├── api/              # Axios instance & API functions
        ├── components/       # Reusable UI components
        ├── pages/            # Route-level page components
        ├── store/            # Zustand global state
        └── hooks/            # React Query custom hooks
```

---

## 🗺️ Roadmap

- [ ] Push notifications via Web Push API (browser-native alerts)
- [ ] Recurring/repeating tasks
- [ ] Team/shared workspaces
- [ ] Export analytics as PDF reports
- [ ] Dark/light theme toggle
- [ ] Native mobile app (React Native)

---

## 👤 Author

**MD Neyaz Uddin**
Full Stack Developer (MERN) · Technical Support Engineer @ Franciscan Solutions

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](#)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/NEYAZUDDIN5050)

---

## 📄 License

This project is licensed under the MIT License — feel free to use it as a learning reference.

<div align="center">

**⭐ If you found this project interesting, consider giving it a star!**

</div>
