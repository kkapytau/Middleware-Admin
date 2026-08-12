# Middleware Admin

Admin interface built with React, TypeScript, Vite, Ant Design and TanStack Query.

The project is structured around a feature-oriented architecture with a clear separation between application infrastructure, domain entities, pages and shared utilities.

## Tech Stack

- **React 19** — UI
- **TypeScript** — static typing
- **Vite** — development server and build tool
- **React Router 7** — routing
- **Ant Design 6** — UI components
- **TanStack Query 5** — server state and data fetching
- **React Hook Form** — form management
- **Zod** — schema validation
- **Ky** — HTTP client
- **i18next / react-i18next** — internationalization
- **Sass / CSS Modules** — styling
- **ESLint + Prettier** — code quality and formatting
- **Husky + lint-staged** — pre-commit checks

## Project Structure

```text
src/
├── app/
│   ├── auth/                 # Authentication logic
│   ├── i18n/                 # i18n configuration and resources
│   ├── layouts/              # Application-level layouts
│   ├── providers/            # Global React providers
│   ├── query/                # TanStack Query configuration
│   ├── router/               # React Router configuration
│   ├── routes/               # Application route definitions
│   └── theme/                # Ant Design theme configuration
│
├── entities/
│   ├── airport/              # Airport domain entity
│   │   ├── api/
│   │   ├── hooks/
│   │   └── model/
│   ├── city/
│   ├── continent/
│   └── country/
│
├── pages/
│   ├── Airports/             # Airports page
│   │   ├── components/
│   │   ├── AirportsPage.tsx
│   │   └── AirportsPage.module.scss
│   ├── Cities/               # Cities page
│   ├── Countries/            # Countries page
│   └── Login/                # Login page
│
├── shared/
│   ├── api/                  # Shared API configuration
│   ├── components/           # Reusable UI components
│   ├── constants/            # Application constants
│   ├── lib/                  # Shared libraries/utilities
│   ├── types/                # Shared TypeScript types
│   └── validation/           # Shared validation schemas
│
├── @types/                   # Global/custom TypeScript declarations
├── assets/                   # Static application assets
├── index.css                 # Global styles
├── main.tsx                  # Application entry point
└── vite-env.d.ts             # Vite type declarations
```

## Architecture

The application follows a layered, feature-oriented structure:

```text
app
 │
 ├── application infrastructure
 │   ├── routing
 │   ├── authentication
 │   ├── layouts
 │   ├── providers
 │   ├── query configuration
 │   └── theme
 │
 ├── entities
 │   └── domain-specific data and API logic
 │
 ├── pages
 │   └── complete application screens
 │
 └── shared
     └── reusable, domain-independent code
```

### `app`

The `app` layer contains application-level infrastructure rather than business/domain logic.

It is responsible for things such as:

- authentication
- routing
- layouts
- providers
- internationalization
- global theme
- TanStack Query configuration

This keeps application bootstrapping and infrastructure separate from individual business entities.

### `entities`

An entity represents a domain object used by the application.

For example:

```text
entities/
└── airport/
    ├── api/
    ├── hooks/
    ├── model/
    └── index.ts
```

The entity layer contains logic related specifically to that domain object, such as:

- API requests
- query/mutation hooks
- types and models

The goal is to keep domain-specific logic out of pages and shared components.

### `pages`

Pages represent complete application screens.

A page is responsible for composing entities and UI components into a screen.

For example:

```text
pages/
└── Airports/
    ├── components/
    ├── AirportsPage.tsx
    └── AirportsPage.module.scss
```

The page should primarily orchestrate the screen rather than contain reusable domain logic.

### `shared`

`shared` contains reusable code that does not belong to a particular business entity or page.

Examples include:

- API utilities
- reusable UI components
- validation
- common types
- constants
- generic utilities

Shared code should not depend on a specific entity or page.

## Routing

Routes are defined separately from React Router itself.

Application routes are represented by `AppRoute`:

```text
AppRoute
├── PageRoute
│   ├── path
│   └── component
│
└── GroupRoute
    └── children
```

A route can also contain application metadata such as:

- access level (`public` / `protected`)
- navigation title
- icon
- permissions
- whether it should be displayed in navigation

This allows the same route configuration to be used for both routing and navigation.

Example:

```ts
const airportsRoute: AppRoute = {
    key: "airports",
    type: "page",
    access: "protected",
    path: "/location/airports",
    titleKey: "navigation.airports",
    icon: EnvironmentOutlined,
    showInNavigation: true,
    permissions: [permissions.airport.read],
    component: AirportsPage,
};
```

Route definitions are converted into React Router `RouteObject`s by `buildRouteObjects`.

Public and protected routes are separated by their `access` value.

```text
AppRoute[]
     │
     ├── public
     │      └── PublicLayout
     │
     └── protected
            └── ProtectedLayout
                    │
                    └── application pages
```

The protected layout checks authentication before rendering the application.

## Layouts

The application uses separate layouts for different access levels.

### PublicLayout

Used for public pages such as login.

It redirects authenticated users away from public pages.

### ProtectedLayout

Used for authenticated application pages.

It checks authentication and redirects unauthenticated users to `/login`.

### AppLayout / AppShell

Contains the common admin interface structure, such as:

- sidebar/navigation
- header
- content area
- logout functionality

This separation keeps authentication concerns outside individual pages.

## Authentication

Authentication is currently implemented as a lightweight client-side abstraction.

The authentication module is responsible for:

- storing the access token
- checking authentication state
- signing in
- signing out

The current implementation is intentionally minimal because the actual authentication/SSO integration is expected to be provided by the backend environment.

The authentication implementation can be replaced later without changing individual pages.

## Data Fetching

TanStack Query is used for server state.

Entity-specific API and query logic lives inside the corresponding entity:

```text
entities/
└── airport/
    ├── api/
    ├── hooks/
    └── model/
```

This keeps data fetching close to the domain it belongs to while allowing pages to consume simple hooks:

```ts
const { data, isLoading } = useAirports();
```

Global QueryClient configuration is located under:

```text
app/query/
```

## Forms and Validation

Forms use:

- **React Hook Form** for form state and submission
- **Zod** for schema validation
- **@hookform/resolvers** to connect schemas with React Hook Form

Validation logic that is reusable across the application belongs in `shared/validation`.

Entity-specific validation should stay close to the corresponding entity or feature.

## Internationalization

The application uses `i18next` and `react-i18next`.

Translation resources are organized by language and namespace.

Navigation labels are referenced from route definitions using typed translation keys:

```ts
titleKey: "navigation.airports";
```

This allows navigation configuration to remain independent from the actual translated text.

## Navigation

The sidebar is generated from the same route configuration used by the router.

This avoids maintaining a separate navigation configuration.

A route can control its visibility with:

```ts
showInNavigation: true;
```

or:

```ts
showInNavigation: false;
```

Groups can contain child routes, allowing nested navigation:

```text
Location
├── Airports
├── Countries
└── Cities
```

The route path is used as the menu key for page routes so that the current URL can be synchronized with the selected sidebar item.

## Permissions

Routes can declare required permissions:

```ts
permissions: [permissions.airport.read];
```

The permission model is kept in shared types/constants so that authorization rules can later be connected to the actual user/session data.

At the moment, the route metadata defines the required permissions; enforcement can be connected to the backend/SSO authorization model when it becomes available.

## Styling

The project uses:

- Ant Design for common UI components
- Ant Design theme tokens for global design configuration
- CSS Modules / Sass for page-specific styling

Page-specific styles are kept next to the page:

```text
Airports/
├── AirportsPage.tsx
└── AirportsPage.module.scss
```

This keeps styles scoped to the component/page that owns them.

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

Fix lint issues automatically:

```bash
npm run lint:fix
```

Format the project:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

## Code Quality

The project uses:

- TypeScript strict mode
- ESLint
- Prettier
- Husky
- lint-staged

Pre-commit hooks automatically format and lint staged files.

## Design Principles

The main architectural principles are:

1. **Keep application infrastructure in `app`.**
2. **Keep domain-specific logic inside `entities`.**
3. **Keep complete screens inside `pages`.**
4. **Keep reusable domain-independent code inside `shared`.**
5. **Use a single route configuration for both routing and navigation.**
6. **Keep authentication and authorization concerns separate from page components.**
7. **Prefer simple abstractions and avoid generic components until there is a real need for reuse.**
8. **Keep business/domain logic out of shared components.**

The structure is intentionally lightweight and is not intended to implement a full formal methodology such as strict Feature-Sliced Design. The goal is to keep responsibilities clear without introducing unnecessary abstraction for a relatively small application.
