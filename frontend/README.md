# Frontend

React app (Vite). Holds both the Internal Desk and the Client Portal.

## Run it

Start the backend first, then:

```
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. The home page shows whether the backend is connected.

## Layout

```
frontend/src/
├── main.jsx                   Starts the app
├── styles.css                 Shared styles
├── shell/                     App shell: layout, menu, routing (M1, lead)
├── shared/                    Things every module can use
│   ├── api.js                 The only way to call the backend
│   └── ModulePlaceholder.jsx  Temporary page for modules not built yet
└── modules/
    ├── index.js               List of modules (adds them to the menu)
    ├── m1-projects/           Lead
    ├── m2-task-board/         Engineer B
    ├── m3-equipment/          Engineer B
    ├── m4-media/              Engineer C
    ├── m5-case-library/       Engineer C
    ├── m6-share-links/        Engineer D
    └── m7-client-progress/    Engineer D
```

Calls to `/api/...` are forwarded to the backend on port 4000, so modules never need the full backend URL.
