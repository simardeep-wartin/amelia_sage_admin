# MVC Structure in This Project

This project uses a simple MVC-style layering with Next.js App Router:

- Model: `Services/models/*`
- Service (frontend/backend API calls and business helpers): `Services/services/*`
- Controller (request orchestration for local routes only): `Services/controllers/*`
- View (UI pages): `app/**/*`
- Shared Components (outside pages): `components/*`

Current navigation example:

- Model: `Services/models/navigation-model.ts`
- Service: `Services/services/navigation-service.ts`
- Controller: `Services/controllers/navigation-controller.ts`
- API Route: `app/api/navigation/route.ts`
- Views using service data:
  - `components/sidebar.tsx`
  - `app/page.tsx`

Auth integration for external backend:

- Model: `Services/models/auth-model.ts`
- Service: `Services/services/auth-api.ts`
- Views:
  - `app/login/page.tsx`
  - `app/signup/page.tsx`
