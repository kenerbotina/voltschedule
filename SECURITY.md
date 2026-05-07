# Protocolo de Seguridad - VoltSchedule

## 1. Gestión de Credenciales

### Variables de Entorno
Todas las credenciales sensibles se almacenan en variables de entorno y **NUNCA** en el código fuente.

```
❌ NUNCA hacer:
const API_KEY = "sk_live_abc123..."

✅ HACER:
const API_KEY = import.meta.env.VITE_API_KEY
```

### Archivo .env.local
- Debe estar en `.gitignore`
- Nunca debe ser commiteado al repositorio
- Solo disponible en desarrollo local

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 2. Autenticación

### OAuth 2.0 con Google
- Implementado a través de Supabase Auth
- No se almacenan contraseñas localmente
- Los tokens se gestionan automáticamente por Supabase

### Token Management
- JWTs expedidos por Supabase
- Se almacenan en el navegador de forma segura
- Se incluyen automáticamente en cada request a Supabase

## 3. Encriptación

### En Tránsito
- Todos los requests utilizan HTTPS
- Supabase 🔒 implementa TLS 1.2+
- Los datos en tránsito están cifrados

### En Reposo
- Base de datos: PostgreSQL con encriptación nativa
- Backups: Cifrados automáticamente
- No hay datos sensibles en plain text

## 4. Control de Acceso (RLS)

### Row-Level Security (RLS)
La base de datos implementa políticas RLS para garantizar:

```sql
-- Solo el usuario propietario puede ver su perfil
CREATE POLICY "Users can see own profile" 
  ON profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Solo el usuario propietario puede modificar su horario
CREATE POLICY "Users can update own schedule" 
  ON schedules 
  FOR UPDATE 
  USING (auth.uid() = user_id);
```

## 5. Protección de Rutas

### ProtectedRoute Component
```typescript
<ProtectedRoute>
  <DashboardLayout />
</ProtectedRoute>
```
- Verifica autenticación antes de permitir acceso
- Redirige a `/login` si no autenticado
- Muestra LoadingScreen Durante verificación

## 6. Secretos en Código

### ✅ Verificado - Sin secretos expuestos

**supabase.ts**: 
- Todos los secretos vienen de `import.meta.env`
- Validación obligatoria de existencia
- Error claro si falta configuración

**Login.tsx**:
- No hay credenciales hardcoded
- OAuth manejado por Supabase

**auth.service.ts**:
- No almacena credenciales
- Solo gestiona métodos de auth
- Delegencia a Supabase

## 7. Buenas Prácticas

### 1. Nunca logs de datos sensibles
```typescript
❌ console.log("Token:", authToken)
✅ console.log("Auth status:", isLoggedIn)
```

### 2. Validación de input
- TypeScript strict mode
- Validación de tipos en frontend
- Validación adicional en backend (Supabase)

### 3. CORS
- Supabase configura CORS automáticamente
- Solo permite requests desde dominios autorizados

### 4. Rate Limiting
- Supabase implementa rate limiting
- Protege contra ataques de fuerza bruta

## 8. Checklist de Seguridad

- ✅ No hay API keys en el código
- ✅ Variables de entorno configuradas
- ✅ .env.local en .gitignore
- ✅ HTTPS/TLS en transporte
- ✅ RLS habilitado en base de datos
- ✅ OAuth sin contraseñas
- ✅ ProtectedRoute implementado
- ✅ TypeScript en strict mode
- ✅ Validación de tipos

## 9. Reporte de Vulnerabilidades

Si descubres una vulnerabilidad de seguridad, **NO** la reportes públicamente.

**Contacta a**: security@voltschedule.com

Por favor incluye:
- Descripción de la vulnerabilidad
- Pasos para reproducir
- Impacto potencial
- Sugerencias de mitigación (opcional)

## 10. Auditoría Regular

- Revisar logs de acceso
- Monitorear uso de credenciales
- Mantener dependencias actualizadas
- Ejecutar security audits periódicas

```bash
# Para auditar dependencias
npm audit
npm audit fix
```

## Recursos Adicionales

- [Documentación Supabase Security](https://supabase.com/docs/guides/auth)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
