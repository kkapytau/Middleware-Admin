# Middleware Admin

Admin interface built with **React, TypeScript, Vite, Ant Design and TanStack Query**.

The application provides an administration UI for managing middleware/domain data such as airports, cities, countries, continents and flow functions.

The project follows a lightweight feature-oriented architecture with a clear separation between application infrastructure, domain entities, pages and shared components.

## Tech Stack

- **React 19** — UI
- **TypeScript** — static typing
- **Vite** — development server and build tool
- **React Router 7** — application routing
- **Ant Design 6** — UI components
- **TanStack Query 5** — server state and data fetching
- **React Hook Form** — form state and submission
- **Zod** — schema validation
- **@hookform/resolvers** — React Hook Form / Zod integration
- **Ky** — HTTP client
- **i18next / react-i18next** — internationalization
- **Sass / CSS Modules** — styling
- **ESLint + Prettier** — code quality and formatting
- **Husky + lint-staged** — pre-commit checks

## Project Structure

```text
src/
├── app/
│   ├── auth/                 # Authentication, session, roles and permissions
│   ├── i18n/                 # i18n configuration and resources
│   ├── layouts/              # Public/protected application layouts
│   ├── providers/            # Global React providers
│   ├── query/                # TanStack Query configuration
│   ├── router/               # React Router configuration
│   ├── routes/               # Application route definitions
│   └── theme/                # Ant Design theme configuration
│
├── entities/
│   ├── airport/              # Airport domain entity
│   ├── city/                 # City domain entity
│   ├── continent/            # Continent domain entity
│   ├── country/              # Country domain entity
│   └── ...
│
├── pages/
│   ├── Airports/             # Airports page
│   ├── Cities/               # Cities page
│   ├── Countries/            # Countries page
│   ├── Continents/           # Continents page
│   ├── Functions/            # Flow functions page
│   └── Login/                # Login page
│
├── shared/
│   ├── api/                  # HTTP client and API utilities
│   ├── components/           # Reusable UI components
│   │   ├── EntityDrawer/     # Reusable entity editor drawer
│   │   ├── EntityTable/      # Reusable entity table
│   │   ├── EntityActions/    # Common entity actions
│   │   └── form/             # Reusable form controls
│   ├── config/               # Shared configuration, including filters
│   ├── constants/            # Application constants
│   ├── hooks/                # Shared hooks
│   ├── lib/                  # Shared utilities
│   ├── types/                # Shared TypeScript types
│   └── validation/           # Reusable validation schemas
│
├── @types/                   # Global/custom TypeScript declarations
├── assets/                   # Static application assets
├── index.css                 # Global styles
├── main.tsx                  # Application entry point
└── vite-env.d.ts             # Vite type declarations
```

## Architecture

The application is split into four main layers:

```text
app
├── application infrastructure
│   ├── authentication
│   ├── authorization
│   ├── routing
│   ├── layouts
│   ├── providers
│   ├── internationalization
│   ├── query configuration
│   └── theme
│
├── entities
│   └── domain-specific API, hooks and models
│
├── pages
│   └── complete application screens
│
└── shared
    └── reusable domain-independent functionality
```

### `app`

The `app` layer contains application-level infrastructure.

It is responsible for:

- authentication and session management;
- authorization and permissions;
- routing;
- layouts;
- global providers;
- internationalization;
- TanStack Query configuration;
- global theme configuration.

Business/domain logic should not be placed in this layer.

### `entities`

An entity represents a domain object used by the application.

Typical entity structure:

```text
entities/
└── airport/
    ├── api/
    ├── hooks/
    ├── model/
    └── index.ts
```

The entity layer contains:

- API requests;
- query and mutation hooks;
- domain types and models;
- entity-specific logic.

This keeps domain logic close to the entity instead of placing it inside pages or generic shared components.

### `pages`

Pages represent complete application screens.

A page composes entities and shared UI components into a user-facing screen.

For example:

```text
pages/
└── Airports/
    ├── components/
    ├── AirportsPage.tsx
    └── AirportsPage.module.scss
```

Pages should primarily orchestrate the screen rather than contain reusable domain logic.

### `shared`

The `shared` layer contains reusable functionality that is not specific to a particular domain entity or page.

Examples:

- API utilities;
- tables;
- drawers;
- forms;
- filters;
- validation;
- common types;
- generic hooks;
- layout components.

Shared components should remain independent of individual domain entities whenever possible.

---

# Routing

Routing is based on a custom `AppRoute` configuration built on top of React Router 7.

Routes are defined independently from React Router and then converted into `RouteObject`s.

The route model supports:

```text
AppRoute
├── PageRoute
│   ├── path
│   └── component
│
└── GroupRoute
    └── children
```

Routes can contain application metadata such as:

- access level;
- navigation title;
- icon;
- permissions;
- navigation visibility.

## Public and Protected Routes

Routes are divided into two access levels:

```text
AppRoute[]
│
├── public
│   └── PublicLayout
│
└── protected
    └── ProtectedLayout
        └── application pages
```

### Public routes

Public routes are rendered inside `PublicLayout`.

The main public page is the login page.

Authenticated users are redirected away from public authentication pages.

### Protected routes

Protected routes are rendered inside `ProtectedLayout`.

`ProtectedLayout` checks the current authentication state before rendering the application.

Unauthenticated users are redirected to:

```text
/login
```

## Current Routes

The current application routes include:

| Route         | Access    | Description               |
| ------------- | --------- | ------------------------- |
| `/login`      | Public    | Login page                |
| `/`           | Protected | Redirects to `/airports`  |
| `/airports`   | Protected | Airport management        |
| `/cities`     | Protected | City management           |
| `/countries`  | Protected | Country management        |
| `/continents` | Protected | Continent management      |
| `/functions`  | Protected | Flow functions management |

The location pages are no longer nested under a `/location` URL prefix.

For example:

```text
/airports
/cities
/countries
/continents
```

instead of:

```text
/location/airports
/location/cities
/location/countries
/location/continents
```

## Navigation

The sidebar is generated from the same route configuration used by the router.

This avoids maintaining separate routing and navigation configurations.

Routes can control whether they appear in navigation using:

```ts
showInNavigation: true;
```

or:

```ts
showInNavigation: false;
```

Groups can contain multiple child routes.

For example:

```text
Location
├── Airports
├── Cities
├── Countries
└── Continents
```

The route path is used as the menu key so that the selected navigation item stays synchronized with the current URL.

---

# How to create a new entity

Adding a new manageable entity usually requires changes in three areas:

1. **Routing** — make the page available through the application router and navigation.
2. **Entity** — add the domain model, API functions and query/mutation hooks.
3. **Page** — build the table, drawer and form used to display and edit the entity.

The recommended approach is to use an existing entity such as `Airport`, `City` or `Country` as a reference and follow the same structure.

---

## 1. Add routing

Routes are defined under:

```text
src/app/routes/
```

For a new entity, add or update the appropriate route configuration.

For example, if we are adding a `Currency` entity, the route could look like:

```ts
const currencyRoute: AppRoute = {
    key: "currencies",
    type: "page",
    access: "protected",
    path: "/currencies",
    titleKey: "navigation.currencies",
    icon: DollarOutlined,
    showInNavigation: true,
    permissions: [permissions.currency.read],
    component: CurrenciesPage,
};
```

The route configuration is used for both:

- React Router configuration;
- sidebar/navigation.

There is no need to maintain a separate menu configuration.

### Route checklist

When adding a new entity, make sure to define:

- a unique `key`;
- `type: "page"`;
- `access: "protected"` for authenticated application pages;
- the new URL path;
- the navigation translation key;
- an icon if the page is displayed in navigation;
- `showInNavigation: true` when it should appear in the sidebar;
- the required read permission;
- the page component.

Also make sure the route is included in the appropriate route group exported from:

```text
src/app/routes/index.ts
```

If the entity belongs to an existing navigation group, add it to that group's children rather than creating a new group unnecessarily.

---

## 2. Add the entity

Create a new directory under:

```text
src/entities/
```

For example:

```text
src/entities/currency/
├── api/
├── hooks/
├── model/
└── index.ts
```

The exact files may vary depending on the entity, but the responsibility of the entity layer should remain the same.

### `model`

The `model` directory contains the TypeScript types used by the entity.

For example:

```ts
export interface Currency {
    id: number;
    code: string;
    name: string;
    deleted: boolean;
}
```

Request types should be defined separately when the API contract differs between read and write operations:

```ts
export interface CurrencyRequest {
    code: string;
    name: string;
    deleted: boolean;
}
```

### `api`

The `api` directory contains HTTP requests for the entity.

Typical operations are:

```text
GET    /currencies
GET    /currencies/{id}
POST   /currencies
PUT    /currencies/{id}
DELETE /currencies
```

The API layer should be responsible only for communication with the backend.

For example:

```ts
export async function getCurrencies(page: number, size: number): Promise<PageResponse<Currency>> {
    return api
        .get(CURRENCIES_ENDPOINT, {
            searchParams: {
                page,
                size,
            },
        })
        .json<CurrencyListResponse>();
}
```

Keep pagination, filters and request-specific parameters in the API layer instead of implementing HTTP calls directly inside the page.

### `hooks`

Create TanStack Query hooks for the API operations.

Typical hooks include:

```text
useCurrencies
useCurrency
useCreateCurrency
useUpdateCurrency
useDeleteCurrencies
```

For example:

```ts
export function useCurrencies(page: number, size: number) {
    return useQuery({
        queryKey: ["currencies", page, size],
        queryFn: () => getCurrencies(page, size),
    });
}
```

Mutations should invalidate or update the relevant query after a successful operation.

This allows the page to work with simple hooks without knowing how the HTTP requests are implemented.

### `index.ts`

Export the public API of the entity from its `index.ts`.

The page should preferably import entity functionality from the entity entry point rather than depending on internal implementation details.

Example:

```ts
export * from "./api";
export * from "./hooks";
export * from "./model";
```

---

## 3. Add the page

Create a new page under:

```text
src/pages/
```

For example:

```text
src/pages/Currencies/
├── components/
├── CurrenciesPage.tsx
└── index.ts
```

The page is responsible for composing the entity functionality and shared UI into a complete screen.

A typical CRUD page contains three main parts:

```text
CurrenciesPage
│
├── EntityTable
│
├── EntityDrawer
│   └── CurrencyForm
│
└── EntityActions
```

The page should orchestrate these components rather than contain the implementation of generic table, drawer or form behavior.

---

### 3.1 Add the table

The table displays the entity collection and handles common actions such as:

- pagination;
- sorting;
- filtering;
- row selection;
- opening an entity for editing;
- deleting entities when permitted.

Use the shared `EntityTable` component where possible.

The page should provide the entity-specific configuration:

```ts
const columns = [
    {
        title: t("currency.code"),
        dataIndex: "code",
        key: "code",
    },
    {
        title: t("currency.name"),
        dataIndex: "name",
        key: "name",
    },
];
```

The table should consume data through the entity hook:

```ts
const { data, isLoading } = useCurrencies(page, size);
```

Do not make API calls directly from the table component.

---

### 3.2 Add the drawer

Entity editing should use the shared `EntityDrawer`.

The drawer provides the common behavior for:

- opening and closing;
- loading existing entity data;
- submitting the form;
- displaying validation errors;
- save/cancel actions;
- permission checks.

The page owns the drawer state:

```text
selected entity
      │
      ▼
EntityDrawer
      │
      ▼
CurrencyForm
```

For example:

```tsx
<EntityDrawer
    open={isDrawerOpen}
    title={selectedCurrency ? t("currency.edit") : t("currency.create")}
    onClose={handleClose}
>
    <CurrencyForm currency={selectedCurrency} onSuccess={handleSuccess} />
</EntityDrawer>
```

The drawer should not contain currency-specific business logic. That logic belongs to the entity/page/form.

---

### 3.3 Add the form

The form should be implemented using:

- React Hook Form;
- Zod;
- `@hookform/resolvers`;
- shared form controls.

Example structure:

```text
src/pages/Currencies/components/
├── CurrencyForm.tsx
└── currencyFormSchema.ts
```

A validation schema can be defined using Zod:

```ts
const currencyFormSchema = z.object({
    code: z.string().min(1).max(3),
    name: z.string().min(1).max(50),
    deleted: z.boolean(),
});
```

Use shared controls whenever possible:

```tsx
<FormInput
    name="code"
    control={control}
    label={t("currency.code")}
/>

<FormInput
    name="name"
    control={control}
    label={t("currency.name")}
/>

<FormCheckbox
    name="deleted"
    control={control}
    label={t("common.deleted")}
/>
```

The form decides whether the operation is a create or update operation and calls the corresponding entity mutation.

For example:

```text
selected entity exists
        │
        ├── yes → useUpdateCurrency
        │
        └── no  → useCreateCurrency
```

After a successful mutation:

1. close the drawer;
2. reset the form;
3. invalidate/refetch the entity list;
4. display the appropriate notification if required.

---

## 4. Add translations

Add all user-facing text to the i18n resources.

For example:

```text
navigation.currencies
currency.code
currency.name
currency.create
currency.edit
currency.delete
```

Do not hard-code user-facing strings directly in the page, drawer or form.

The route should reference the navigation translation key:

```ts
titleKey: "navigation.currencies";
```

---

## 5. Add permissions

If the new entity has CRUD operations, add its permissions to the permission configuration.

For example:

```text
currency.read
currency.create
currency.update
currency.delete
```

Use these permissions in:

- route configuration;
- table actions;
- create buttons;
- edit actions;
- delete actions;
- drawer/form actions.

Remember that frontend permission checks control the UI only. The backend must remain the final authorization boundary.

---

## 6. Recommended final structure

After adding a new entity, the resulting structure should look approximately like:

```text
src/
├── app/
│   └── routes/
│       ├── currencies.ts
│       └── index.ts
│
├── entities/
│   └── currency/
│       ├── api/
│       │   └── currencyApi.ts
│       ├── hooks/
│       │   ├── useCurrencies.ts
│       │   ├── useCurrency.ts
│       │   ├── useCreateCurrency.ts
│       │   └── useUpdateCurrency.ts
│       ├── model/
│       │   └── currency.ts
│       └── index.ts
│
└── pages/
    └── Currencies/
        ├── components/
        │   ├── CurrencyForm.tsx
        │   └── currencyFormSchema.ts
        ├── CurrenciesPage.tsx
        └── index.ts
```

The exact file names are not mandatory. The important rule is to keep responsibilities separated:

```text
Routing
  └── src/app/routes

Domain / API
  └── src/entities/<entity>

Screen
  └── src/pages/<Entity>

Reusable UI
  └── src/shared/components
```

---

## Summary

When adding a new CRUD entity, follow this sequence:

```text
1. ROUTING
   ├── create route
   ├── add navigation entry
   └── add read permission

2. ENTITY
   ├── model/types
   ├── API functions
   ├── query hooks
   └── mutation hooks

3. PAGE
   ├── table
   ├── drawer
   └── form

4. SUPPORTING
   ├── translations
   ├── permissions
   ├── validation
   └── filters/sorting/pagination if required
```

Use an existing entity as the reference implementation before introducing new abstractions. Prefer the existing shared components and patterns over creating entity-specific versions of functionality that already exists in `shared`.

---

# Authentication

Authentication is implemented through an application-level `AuthProvider`.

The provider initializes the current session when the application starts and exposes authentication state through the authentication context.

The authentication flow is backed by the server/SSO environment rather than by a client-side token stored in local storage.

## Session

The frontend loads the current session from:

```http
GET /internal/api/v1/me
```

The session contains:

```text
{
    authenticated: boolean;
    name: string | null;
    email: string | null;
    roles: UserRole[];
}
```

The application distinguishes between three authentication states:

```text
loading
authenticated
anonymous
```

This prevents protected pages from being rendered before the initial session check has completed.

## Login

Login starts the Azure/Entra OAuth flow:

```text
/oauth2/authorization/azure
```

The frontend performs a top-level browser navigation to this endpoint.

This allows the backend/SSO infrastructure to handle the authentication flow.

## Logout

Logout is performed using a real browser form submission:

```http
POST /logout
```

It is intentionally not implemented as an XHR/fetch request.

The backend may return a redirect chain through the Entra logout endpoint, therefore logout must be performed as a top-level navigation.

When an `XSRF-TOKEN` cookie is present, its value is submitted as the `_csrf` form field.

---

# Roles and Permissions

The application supports role-based authorization.

## User Roles

The currently supported roles are:

| Role                | Description                          |
| ------------------- | ------------------------------------ |
| `BFF.Administrator` | Full administrative access           |
| `BFF.Editor`        | Can read and modify application data |
| `BFF.Viewer`        | Read-only access                     |

Roles are provided by the backend session.

## Permissions

The frontend currently defines the following permissions:

```text
read
create
update
delete
admin-area
```

The default permission mapping is:

| Role                | Read | Create | Update | Delete | Admin Area |
| ------------------- | ---: | -----: | -----: | -----: | ---------: |
| `BFF.Administrator` |    ✓ |      ✓ |      ✓ |      ✓ |          ✓ |
| `BFF.Editor`        |    ✓ |      ✓ |      ✓ |      — |          — |
| `BFF.Viewer`        |    ✓ |      — |      — |      — |          — |

Permissions are derived from the user's roles.

The frontend uses these permissions to control UI capabilities.

For example:

- read-only users can view data;
- editors can create and update data;
- administrators can perform all available operations;
- edit/save controls are hidden or disabled when the current user does not have the required permission.

Authorization must ultimately be enforced by the backend as well. Frontend permission checks are primarily used to provide the correct user experience and prevent unavailable actions from being presented.

---

# Drawers and Forms

Entity editing uses reusable drawer and form components.

## EntityDrawer

`EntityDrawer` provides a common editing experience for domain entities.

It is responsible for:

- opening/closing the editor;
- displaying loading state;
- rendering the form;
- submitting form values;
- displaying Cancel/Save actions;
- applying update permissions;
- disabling the form for users without update permission.

The drawer uses Ant Design's `Drawer` and `Form` components.

The save button is only available when the current user has update permission.

## Form Components

Reusable form controls are located under:

```text
shared/components/form/
```

Currently available components include:

```text
FormInput
FormNumberInput
FormSelect
FormCheckbox
```

These components integrate:

- React Hook Form;
- Ant Design;
- field-level validation;
- common input behavior.

For example, `FormInput` is connected to React Hook Form through `Controller` and displays validation errors through Ant Design's `Form.Item`.

Entity-specific forms should compose these shared controls instead of implementing common input behavior repeatedly.

---

# Forms and Validation

Forms use:

- **React Hook Form** for form state and submission;
- **Zod** for schema validation;
- **@hookform/resolvers** to connect Zod schemas with React Hook Form;
- **Ant Design** for UI components and form presentation.

Validation is separated from UI components.

Reusable validation belongs in:

```text
shared/validation/
```

Entity-specific validation should remain close to the corresponding entity or feature.

This keeps validation rules reusable while preventing generic components from becoming coupled to business logic.

---

# Data Fetching

The application uses **TanStack Query** for server state.

Entity-specific API and query logic lives inside the corresponding entity:

```text
entities/
└── airport/
    ├── api/
    ├── hooks/
    └── model/
```

Pages consume entity hooks rather than implementing API calls directly.

Example:

```ts
const { data, isLoading } = useAirports();
```

Global `QueryClient` configuration is located under:

```text
app/query/
```

The shared API layer is located under:

```text
shared/api/
```

It contains the common HTTP client and reusable API helpers.

---

# Tables, Filters and Pagination

The application provides reusable components for common entity-management functionality:

- `EntityTable`;
- `EntityActions`;
- `EntityToolbar`;
- `FilterButton`;
- `FilterSearch`;
- pagination helpers;
- download/export controls.

Entity-specific filters are defined separately from the UI.

Examples include:

```text
shared/config/filters/
├── airportFilterFields.ts
├── codeNameFilterFields.ts
├── flowRuleFilterFields.ts
└── nameFilterFields.ts
```

This allows filtering configuration to be reused by entity pages without coupling the filter definitions to individual table implementations.

---

# Internationalization

The application uses:

- `i18next`;
- `react-i18next`.

Translation resources are organized by language and namespace.

Navigation labels are referenced using translation keys:

```ts
titleKey: "navigation.airports";
```

This keeps route configuration independent from the actual translated text.

---

# Styling

The project uses:

- Ant Design for common UI components;
- Ant Design theme tokens for global UI configuration;
- CSS Modules;
- Sass.

Page-specific styles are kept next to the page that owns them:

```text
Airports/
├── AirportsPage.tsx
└── AirportsPage.module.scss
```

Shared styles should only be introduced when they represent genuinely reusable UI behavior.

---

# Development

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Run ESLint

```bash
npm run lint
```

## Fix ESLint issues

```bash
npm run lint:fix
```

## Format code

```bash
npm run format
```

## Check formatting

```bash
npm run format:check
```

---

# Code Quality

The project uses:

- TypeScript strict mode;
- ESLint;
- Prettier;
- Husky;
- lint-staged.

Pre-commit hooks automatically format and lint staged files.

The current package scripts are defined in `package.json`.

---

# Design Principles

The project follows several architectural principles:

1. Keep application infrastructure inside `app`.
2. Keep domain-specific logic inside `entities`.
3. Keep complete application screens inside `pages`.
4. Keep reusable domain-independent functionality inside `shared`.
5. Use one route configuration for both routing and navigation.
6. Keep authentication and authorization concerns outside page components.
7. Use role/permission checks to control UI capabilities.
8. Keep backend authorization as the final security boundary.
9. Keep reusable form and drawer behavior inside shared components.
10. Keep validation rules separate from UI implementation.
11. Prefer simple abstractions over generic abstractions without a real reuse case.
12. Keep business/domain logic out of shared components.

The project intentionally uses a lightweight feature-oriented architecture rather than implementing a strict formal methodology such as full Feature-Sliced Design.
