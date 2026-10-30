# TaskFlow

A small task manager built with React 18, Vite and React Router. Tasks are kept in
the browser's localStorage, so there is no backend to run.

## Features

- Add, edit (double-click a title or press Edit), complete and delete tasks
- Categories and due dates, with overdue highlighting
- Search, status filter (all / active / completed) and category filter
- Stats page with totals, overdue count, completion bar and per-category counts
- Automatic light and dark theme
- Unit and component tests with Vitest and Testing Library

## Getting started

Requires Node 18 or newer.

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm test           # run the test suite once
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Project layout

```
src/
  main.jsx              entry point (Router + TasksProvider)
  App.jsx               header, navigation and routes
  state/
    tasksReducer.js     reducer plus pure helpers (filter, stats)
    TasksContext.jsx    context provider with localStorage sync
    storage.js          safe load/save helpers
  components/           TaskForm, TaskItem, FilterBar
  pages/                TasksPage, StatsPage, NotFound
  test/setup.js         Vitest setup (jest-dom, cleanup)
```

## Deploying

`npm run build` produces a static site in `dist/`. Host it on any static host
(Netlify, Vercel, GitHub Pages, S3). Because the app uses client-side routing,
configure the host to fall back to `index.html` for unknown paths.

## Ideas for next steps

- Sync tasks to a backend API
- Drag-and-drop reordering
- Recurring tasks and reminders
