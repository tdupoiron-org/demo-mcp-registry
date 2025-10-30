## Plan: Convert Static MCP Registry to React API Service

Transform the static MCP server registry into a dynamic full-stack application with React/Vite frontend using Context API and Node.js/Express backend with PostgreSQL using raw pg queries. Remove backup directories, implement comprehensive error handling, and set up unified development environment.

**Steps:**

1. **Initialize project structure** — Create `frontend/` with Vite React app (`npm create vite@latest frontend -- --template react`), `backend/` with Express server (`npm init`, install express, pg, cors, dotenv), root `package.json` with concurrently for unified dev setup. Move `index.html`, `script.js`, `styles.css` to `frontend/src/`. Delete `v0.1-bkp/` directory. Create `.env.example` files for both frontend and backend with DATABASE_URL, PORT, VITE_API_URL.

2. **Set up PostgreSQL database and connection** — Create `backend/db/schema.sql` with `servers` table (id SERIAL PRIMARY KEY, name TEXT UNIQUE NOT NULL, description TEXT, status TEXT, repository JSONB, version TEXT, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW(), schema_url TEXT, remotes JSONB, packages JSONB, meta JSONB, indexes on name and status). Create `backend/db/index.js` with pg.Pool connection, query wrapper with error handling, and connection validation.

3. **Build Express API with error handling** — Create `backend/server.js` with Express setup, `backend/routes/servers.js` with endpoints (GET `/api/servers`, GET `/api/servers/:name`, POST `/api/servers`, PUT `/api/servers/:name`, DELETE `/api/servers/:name`), `backend/middleware/errorHandler.js` for centralized error responses, `backend/middleware/validator.js` for input validation, and `backend/utils/errors.js` for custom error classes (NotFoundError, ValidationError).

4. **Convert to React with Context API and ErrorBoundary** — Create `frontend/src/contexts/ServerContext.jsx` (servers state, CRUD operations, loading, error states), `frontend/src/contexts/ThemeContext.jsx`, `frontend/src/components/ErrorBoundary.jsx`. Build components: `App.jsx`, `ServerGrid.jsx`, `ServerTile.jsx`, `Statistics.jsx`, `ThemeToggle.jsx`, `SearchBar.jsx`, `ErrorMessage.jsx`. Create `frontend/src/services/api.js` with try-catch error handling. Convert `styles.css` to CSS modules per component.

5. **Set up data migration and unified development** — Create `backend/scripts/migrate.js` (runs `schema.sql`), `backend/scripts/seed.js` (reads `v0/servers`, inserts with raw pg queries). Add root `package.json` scripts: `dev` (concurrently runs both servers), `dev:frontend`, `dev:backend`, `migrate`, `seed`. Configure CORS in backend to accept frontend dev server origin. Add README with setup instructions (copy `.env.example`, run migrate, seed, dev).

**Open Questions:**

1. **Package manager preference?** npm / yarn / pnpm for consistent lockfiles?
2. **Port configuration?** Frontend default 5173 (Vite default), Backend 3000 or 5000?
