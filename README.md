# 🎮 Tic Tac Toe - React + Vite + CI/CD + Docker

## ✅ Project Overview

This is a **Tic Tac Toe game** built with **React + Vite**, featuring **LocalStorage persistence** and fun **confetti animations 🎉**.

> **This project is an improved and extended version of a React app based on [Midudev's React Course](https://midu.dev).**  
> I used it as a foundation to build a complete project, applying **clean code** and **good documentation practices**.

🔗 **Live Demo:** [https://tic-tac-toe-proyect.onrender.com/](https://tic-tac-toe-proyect.onrender.com/)

## 🚀 Technologies

- **React 18 + Vite** (modern and fast frontend)
- **Vitest + React Testing Library** (unit and integration testing)
- **Canvas-confetti** (animations)
- **LocalStorage** (data persistence)
- **Docker + Docker Compose** (development & production containers)
- **GitHub Actions** (CI/CD pipeline)
- **Render** (hosting & auto-deploy)

## ⚙️ Main Scripts

| Command              | Description                                 |
|-----------------------|---------------------------------------------|
| `npm run dev`        | Run the app locally with Vite               |
| `npm run test`       | Run all tests (Vitest)                      |
| `npm run build`      | Generate production build                   |
| `npm run preview`    | Preview production build (`localhost:4173`) |

## 🐳 Local Docker Setup

### Build and run container
```bash
docker-compose up --build
```
Then open 👉 [http://localhost:4173](http://localhost:4173)

### Stop containers
```bash
docker-compose down
```

## ✅ CI/CD with GitHub Actions & Render

1. Every push to the `main` branch:
   - Runs **tests** and **build** (CI).
   - Automatically deploys to Render (CD).

2. **Live Demo:**  
   👉 [https://tic-tac-toe-proyect.onrender.com/](https://tic-tac-toe-proyect.onrender.com/)

## 📂 Project Structure

```
01-tic-tac-toe/
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom hooks (useTicTacToe)
│   ├── utils/           # Helpers and constants
│   └── _test_/          # Unit and integration tests
├── Dockerfile
├── docker-compose.yml
└── .github/workflows/ci-cd.yml
```

## ✨ Author

Developed by **Mateo Velázquez Nuñez** 💻  
Improved and extended based on [Midudev's React Course](https://midu.dev).
