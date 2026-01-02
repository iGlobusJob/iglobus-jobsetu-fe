# Jobsetu - Job Portal Platform

A comprehensive job portal platform built with React, TypeScript, and Vite. This application connects job seekers, employers, recruiters, and administrators in a unified platform for managing job postings, applications, and recruitment workflows.

## 🚀 Features

### Multi-Role Architecture
- **Candidates**: Search jobs, apply, save favorites, manage applications
- **Clients (Employers)**: Post jobs, manage listings, review candidates
- **Recruiters**: Access job listings, manage clients and candidates
- **Admins**: Platform analytics, user management, system oversight

### Core Capabilities
- 🔐 Role-based authentication and authorization
- 📝 Rich text job descriptions with TipTap editor
- 🔍 Advanced job search and filtering
- 📊 Analytics dashboards for admins and clients
- 📱 Responsive design with Mantine UI
- 🎨 Dark/Light theme support
- 📧 Contact forms and notifications
- 📎 File upload support (resumes, company logos)
- 🔔 Real-time toast notifications

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### UI & Styling
- **Mantine UI 8.3** - Comprehensive component library
- **Tabler Icons** - Icon system
- **CSS Modules** - Scoped styling

### State Management & Data Fetching
- **Zustand** - Lightweight state management
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Routing & Navigation
- **React Router DOM 7** - Client-side routing with nested routes

### Rich Text Editing
- **TipTap** - Extensible rich text editor
  - Image support
  - Link management
  - Text alignment
  - Placeholder support

### API Communication
- **Axios** - HTTP client with interceptors

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit checks
- **Vitest** - Unit testing
- **Testing Library** - Component testing

## 📁 Project Structure

```
src/
├── assets/              # Static assets
├── common/              # Shared components and utilities
│   ├── pages/          # Reusable page components
│   └── types/          # Common type definitions
├── components/          # Global components
│   ├── layout/         # Layout components (Dashboard, Header, Sidebar)
│   └── richTextEditor.tsx
├── config/              # Application configuration
│   └── menuConfig/     # Menu configurations
├── features/            # Feature-based modules
│   ├── admin/          # Admin dashboard and pages
│   ├── auth/           # Authentication flows
│   ├── candidate/      # Candidate features
│   ├── client/         # Client/Employer features
│   ├── dashboard/      # Public dashboard
│   └── recruiter/      # Recruiter features
├── hooks/               # Custom React hooks
│   └── permission/     # Permission management
├── routes/              # Route configurations
│   ├── config/         # Route path constants
│   └── guards/         # Route protection (Guest, Protected, Role)
├── services/            # API service layers
│   ├── admin-services.ts
│   ├── candidate-services.ts
│   ├── client-services.ts
│   ├── common-services.ts
│   ├── recruiter-services.ts
│   └── helper.ts
├── store/               # Global state stores
│   ├── otpModalStore.ts
│   └── userDetails.ts
└── utils/               # Utility functions
    ├── constants/      # Application constants
    └── permission/     # Permission utilities
```

## 🚦 Getting Started

### Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn** >= 1.22.x

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd iglobus-jobsetu-fe
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the root directory:
```env
VITE_SERVER_URL=http://localhost:3000/
```

For production, use `.env.production`:
```env
VITE_SERVER_URL=https://your-production-api.com/
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test` | Run unit tests with Vitest |

## 🗺️ Route Structure

### Public Routes
- `/` - Landing page
- `/aboutus` - About page
- `/services` - Services page

### Authentication Routes (Guest Only)
- `/client/login` - Client login
- `/client/register` - Client registration
- `/admin` - Admin login
- `/recruiter` - Recruiter login

### Protected Routes

#### Candidate (`/candidate/*`)
- `/candidate/dashboard` - Candidate dashboard
- `/candidate/profile` - Profile management
- `/candidate/search` - Job search
- `/candidate/:jobId/job-details` - Job details
- `/candidate/saved-jobs` - Saved jobs
- `/candidate/applications` - Application history

#### Client/Employer (`/client/*`)
- `/client/dashboard` - Client dashboard
- `/client/profile` - Company profile
- `/client/jobs/new` - Post new job
- `/client/jobs/:jobId/edit` - Edit job posting
- `/client/jobs/manage-jobs` - Manage all jobs
- `/client/candidates` - View candidates

#### Admin (`/admin/*`)
- `/admin/dashboard` - Analytics dashboard
- `/admin/clients` - Client management
- `/admin/candidates` - Candidate management
- `/admin/recruiters` - Recruiter management
- `/admin/add-admin` - Add new admin
- `/admin/all-jobs` - All job listings

#### Recruiter (`/recruiter/*`)
- `/recruiter/jobs` - Job listings
- `/recruiter/:jobId/job-details` - Job details
- `/recruiter/clients` - Client management
- `/recruiter/candidates` - Candidate management

## 🔐 Authentication & Authorization

### Route Guards
- **GuestRoute**: Redirects authenticated users away from login/register pages
- **ProtectedRoute**: Requires authentication for access
- **RoleRoute**: Restricts access based on user roles

### User Roles
- `candidate` - Job seekers
- `client` - Employers/Companies
- `recruiter` - Recruitment professionals
- `admin` - Platform administrators

## 🎨 Theming

The application supports automatic theme switching based on system preferences:
- Light mode
- Dark mode
- Auto (follows system theme)

Theme configuration is managed through Mantine's `ColorSchemeScript` and `MantineProvider`.

## 🔧 Configuration

### Path Aliases
The project uses path aliases for cleaner imports:

```typescript
@/ → src/
@components/ → src/components/
@hooks/ → src/hooks/
@utils/ → src/utils/
@types/ → src/types/
@services/ → src/services/
@store/ → src/store/
@pages/ → src/pages/
@common/ → src/common/
```

### API Configuration
API clients are configured in the services layer with:
- Request interceptors for authentication tokens
- Response interceptors for error handling
- Base URL configuration via environment variables

## 📦 Deployment

### Build for Production
```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Vercel Deployment
The project includes a `vercel.json` configuration for SPA routing:
- All routes redirect to `index.html` for client-side routing
- Static assets are served correctly

### Environment Variables
Ensure production environment variables are set in your deployment platform:
- `VITE_SERVER_URL` - Backend API URL

## 🧪 Testing

Run tests with:
```bash
npm run test
```

The project uses:
- **Vitest** - Fast unit test runner
- **Testing Library** - React component testing
- **jsdom** - DOM environment for tests

## 🤝 Code Quality

### Pre-commit Hooks
Husky and lint-staged ensure code quality:
- ESLint checks with max 0 warnings
- Prettier formatting
- TypeScript type checking

### ESLint Configuration
- TypeScript-aware rules
- React hooks rules
- Import organization
- Accessibility checks (jsx-a11y)

### Prettier Configuration
Consistent code formatting across the project.

## 🏗️ Development Best Practices

1. **Feature-based Architecture**: Code organized by features, not file types
2. **Type Safety**: Strict TypeScript configuration with no implicit any
3. **Component Isolation**: Reusable components in `common/` and feature-specific in feature folders
4. **Service Layer**: Centralized API calls in service files
5. **State Management**: Zustand for global state, TanStack Query for server state
6. **Form Validation**: Zod schemas with React Hook Form
7. **Error Handling**: Consistent error handling across API calls

## 📄 License

This project is private and proprietary.

## 👥 Support

For support and questions, please contact the development team.

---

**Built with ❤️ by SRYTAL Systems India Private Limited Development Team**
