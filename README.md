# Centralized Academic Resources Management System (CARMS)

**CARMS** is a modern, responsive academic SaaS platform engineered for higher education institutions. It provides a centralized digital repository where college students, faculty, and administrators can access, upload, organize, verify, and share academic materials (study notes, previous year question papers, lab manuals, syllabi, assignments, and presentations).

---

## 📁 Repository Structure

```
Centralized Academic Resource Management System/
├── frontend/               # Complete React (Vite) + Tailwind CSS + Redux Frontend
│   ├── public/             # Static public assets
│   ├── src/                # Frontend application source code
│   │   ├── components/     # Common UI (16 components) & Layout components
│   │   ├── data/           # Academic mock datasets
│   │   ├── hooks/          # useAuth, useTheme, useDebounce
│   │   ├── pages/          # Auth, Student, Faculty, Admin, and 404 pages
│   │   ├── router/         # React Router v6 setup (all 28 routes)
│   │   ├── store/          # Redux Toolkit store & slices
│   │   └── utils/          # Constants, formatters & validators
│   ├── package.json        # Frontend dependencies & build scripts
│   ├── vite.config.js      # Vite build & bundler configuration
│   └── tailwind.config.js  # Tailwind CSS configuration
│
├── backend/                # Node.js + Express.js REST API (Phase 2)
│   └── (To be developed in Phase 2)
│
├── PROGRESS.md             # Development progress log
└── README.md               # Main project documentation
```

---

## 🛠️ Technology Stack

### Frontend (`frontend/` — Completed ✅)
- **Framework & Tooling**: React.js (Vite)
- **Styling**: Tailwind CSS v4 (with custom `@theme` variables and dark mode support)
- **Routing**: React Router DOM v6 (`createBrowserRouter`, nested layout routing)
- **State Management**: Redux Toolkit & React-Redux (Auth, Theme, Resources, Notifications slices)
- **Data Visualizations**: Recharts (Responsive Area Charts, Bar Charts, Donut Charts)
- **Icons**: Lucide React Icons
- **HTTP Client**: Axios (configured for backend API consumption)

### Backend (`backend/` — Next Phase ⏳)
- Node.js & Express.js (Modular MVC architecture)
- MongoDB & Mongoose (Role-based schemas with indexes & validation)
- JWT Authentication & bcrypt password hashing
- Cloudinary & Multer for file storage & processing

---

## 🚀 Development Phases Overview

| Phase | Description | Status |
|---|---|---|
| **Phase 1** | **Complete Frontend UI, Design System, Mock Data & State** in `frontend/` | **COMPLETED & VERIFIED** ✅ |
| **Phase 2** | Backend REST APIs, Schemas, Auth, RBAC & Cloudinary in `backend/` | Next Phase ⏳ |
| **Phase 3** | Integration (Connecting frontend with backend APIs) | Pending Phase 2 |
| **Phase 4** | End-to-end Testing, Debugging, Optimization & Deployment | Final Step |

---

## 💻 Running the Application

### Frontend Development Server
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Or from the root directory:
```bash
npm run dev:frontend
```

### Frontend Production Build
```bash
# Build frontend
npm run build:frontend
```
The production bundle compiles into `frontend/dist/` in under 2 seconds.
