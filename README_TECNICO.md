# VoltSchedule - Documentación Técnica

## Arquitectura del Proyecto

VoltSchedule es una aplicación web construida con tecnologías modernas para la gestión de horarios estudiantiles, enfocada en la optimización del tiempo y la precisión en el flujo de trabajo.

### Tecnologías Principales

- **Frontend**: React 19 con TypeScript
- **Build Tool**: Vite
- **Backend**: Supabase (PostgreSQL + Auth)
- **State Management**: Zustand con persist middleware
- **Routing**: React Router v6
- **Styling**: Tailwind CSS con tema oscuro personalizado
- **Animaciones**: Framer Motion
- **Internacionalización**: React i18next
- **Notificaciones**: Sonner
- **Iconos**: Lucide React

### Estructura de Carpetas

```
src/
├── api/           # Funciones de API para llamadas HTTP
├── assets/        # Recursos estáticos (fuentes, imágenes)
├── components/    # Componentes reutilizables
│   ├── auth/      # Componentes de autenticación
│   ├── common/    # Componentes comunes (Button, Input, etc.)
│   ├── dashboard/ # Componentes del dashboard
│   ├── landing/   # Componentes de la landing page
│   └── shared/    # Componentes compartidos
├── hooks/         # Custom hooks (useAuth, useSchedules)
├── layouts/       # Layouts de la aplicación (PublicLayout, DashboardLayout)
├── lib/           # Configuraciones de librerías (Supabase)
├── locales/       # Archivos de traducción (en.json, es.json)
├── pages/         # Páginas de la aplicación
├── providers/     # Context providers
├── services/      # Servicios de negocio (auth.service, schedule.service)
├── store/         # Estado global (Zustand)
├── types/         # Definiciones de tipos TypeScript
└── utils/         # Utilidades (helpers, dateHelpers)
```

### Gestión de Rutas Protegidas

La aplicación utiliza un sistema de rutas protegidas implementado con React Router y componentes personalizados:

#### PublicLayout
- Envuelve todas las rutas públicas
- Incluye Navbar y Footer
- Rutas: `/`, `/login`, `/features`, `/templates`, `/help`, `/privacy`, `/docs`, `/security`, `/protocol`, etc.

#### DashboardLayout
- Envuelve rutas privadas del dashboard
- Requiere autenticación
- Incluye Sidebar, Topbar y navegación del dashboard

#### ProtectedRoute
- Componente wrapper que verifica autenticación
- Si no autenticado, redirige a `/login`
- Muestra LoadingScreen durante la verificación
- Envuelve DashboardLayout

#### Flujo de Autenticación
1. Usuario accede a ruta privada sin auth → Redirigido a `/login`
2. Login exitoso → Redirigido al dashboard
3. Logout → Redirigido a `/`
4. Estado persistido con Zustand (localStorage)

### Configuración de Variables de Entorno

Crear archivo `.env.local` en la raíz:

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### Servicios y Hooks

#### AuthService
- Maneja operaciones de autenticación con Supabase
- Métodos: `signInWithGoogle()`, `signOut()`, `getCurrentUser()`

#### useAuth Hook
- Abstracción React del AuthService
- Proporciona estado y acciones de auth
- Integrado con Zustand store

#### ScheduleService
- Maneja operaciones CRUD de horarios
- Integración con Supabase database

### Base de Datos (Supabase)

#### Tablas Principales
- `profiles` - Perfiles de usuario
- `schedules` - Horarios
- `schedule_events` - Eventos de horario

#### Políticas RLS
- Implementadas para seguridad a nivel fila
- Solo usuarios autenticados pueden acceder a sus datos

### Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

### Despliegue

La aplicación está configurada para desplegarse en plataformas como Vercel, Netlify o cualquier servicio que soporte Vite.

### Seguridad

- Autenticación OAuth con Google vía Supabase
- Variables de entorno para credenciales
- Políticas RLS en base de datos
- No hay credenciales hardcoded en el código
- Validación de tipos con TypeScript

### Próximas Funcionalidades

- [ ] Implementación completa de gestión de horarios
- [ ] Sincronización con calendarios externos
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Exportación de horarios