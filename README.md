<h1 align="center">Agroww</h1>
<p align="center">Connecting Farmers & Investors through fractional farmland ownership.</p>

## Monorepo Layout

```
agroww/
	backend/              # Express API (Auth, Users, Contracts, etc.)
		routes/
		models/
		middleware/
		config/
	frontend/             # React (CRA) app with Tailwind CSS
		public/
		src/
			admin/
			farmer/
			investor/
			components/
			pages/
	build/                # Production build output (generated)
```

Legacy root `src/` has been migrated into `frontend/src/` and can be safely removed (now done) to keep a clean two‑folder top level: `backend` + `frontend`.

## Backend

1. Install deps
```bash
cd backend
npm install
```
2. Create a `.env` (see `backend/README.md` for variables).
3. Run dev server
```bash
npm start
```
API base: `http://localhost:5000/api`.

## Frontend

1. Install deps
```bash
cd frontend
npm install
```
2. Start dev server
```bash
npm start
```
Dev server: `http://localhost:3000`.

### Scripts
Frontend (`frontend/package.json`): `start`, `build`, `test`, `eject`.
Backend may define its own scripts (see backend README).

## Tech Stack
Frontend: React 19, React Router v7, Tailwind CSS, Axios, Recharts
Backend: Node.js, Express, JWT Auth, Mongoose (MongoDB)

## Tailwind Configuration
Tailwind scans `frontend/src/**/*.{js,jsx,ts,tsx}` and `public/index.html`. If you add new directories under `frontend/src`, they're already covered.

## Development Flow
1. Start backend first (port 5000)
2. Start frontend (port 3000)
3. Login / role selection flows hit `/api/auth` endpoints

## Environment Variables (Backend Example)
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=change_me
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=change_me_refresh
JWT_REFRESH_EXPIRE=30d
```

## Build
```bash
cd frontend
npm run build
```
Outputs production assets to `/build` at repo root (CRA default).

## Conventions
- Components grouped by domain (admin, farmer, investor)
- Reusable UI in `components/`
- Route-level views in `pages/`
- Auth tokens stored in `localStorage` (improve later: httpOnly cookies)

## Future Improvements
- Migrate to Vite for faster builds
- Add role-based route guards (HOC or layout wrappers)
- Introduce global state (Zustand/Redux) for auth/session
- Harden security: refresh token rotation + httpOnly cookies

## License
Proprietary / Internal (update if open-sourcing).

---
Generated and updated during refactor (Aug 2025).
