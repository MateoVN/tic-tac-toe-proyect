# 🎮 Tic Tac Toe - React + Vite + CI/CD + Docker

## ✅ Descripción del Proyecto

Este es un **juego de Tres en Raya (Tic Tac Toe)** desarrollado con **React + Vite**, con **persistencia en LocalStorage** y animaciones de **confeti 🎉**.

> **Este proyecto es una versión mejorada y ampliada de una app basada en el [Curso de React de Midudev](https://midu.dev).**  
> Lo utilicé como base para construir un proyecto completo aplicando **buenas prácticas de código y documentación**.

🔗 **Demo en línea:** [https://tic-tac-toe-proyect.onrender.com/](https://tic-tac-toe-proyect.onrender.com/)

## 🚀 Tecnologías

- **React 18 + Vite** (frontend moderno y rápido)
- **Vitest + React Testing Library** (tests unitarios e integración)
- **Canvas-confetti** (animaciones)
- **LocalStorage** (persistencia de datos)
- **Docker + Docker Compose** (contenedores para desarrollo y producción)
- **GitHub Actions** (pipeline CI/CD)
- **Render** (hosting y autodeploy)

## ⚙️ Scripts Principales

| Comando             | Descripción                             |
|----------------------|-----------------------------------------|
| `npm run dev`        | Ejecutar localmente con Vite            |
| `npm run test`       | Ejecutar todos los tests (Vitest)       |
| `npm run build`      | Generar build para producción           |
| `npm run preview`    | Previsualizar build (`localhost:4173`)  |

## 🐳 Docker Local

### Construir y correr contenedor
```bash
docker-compose up --build
```
Luego abrir 👉 [http://localhost:4173](http://localhost:4173)

### Detener contenedores
```bash
docker-compose down
```

## ✅ CI/CD con GitHub Actions y Render

1. Cada vez que se hace push a la rama `main`:
   - Corre los **tests** y genera el **build** (CI).
   - Despliega automáticamente en Render (CD).

2. **Demo en línea:**  
   👉 [https://tic-tac-toe-proyect.onrender.com/](https://tic-tac-toe-proyect.onrender.com/)

## 📂 Estructura del Proyecto

```
01-tic-tac-toe/
├── src/
│   ├── components/      # Componentes React
│   ├── hooks/           # Custom hooks (useTicTacToe)
│   ├── utils/           # Helpers y constantes
│   └── _test_/          # Tests unitarios e integración
├── Dockerfile
├── docker-compose.yml
└── .github/workflows/ci-cd.yml
```

## ✨ Autor

Desarrollado por **Mateo Velázquez Nuñez** 💻  
Mejorado y ampliado a partir del [Curso de React de Midudev](https://midu.dev).
