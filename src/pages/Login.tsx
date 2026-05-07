import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
  </svg>
);

export default function Login() {
  const { signInWithGoogle, signInWithPassword, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (user && !isLoading) navigate("/dashboard", { replace: true });
  }, [user, isLoading, navigate]);

  const validate = () => {
    const nextErrors = { email: "", password: "" };
    if (!formData.email.trim()) nextErrors.email = "El correo es obligatorio";
    else if (!emailRegex.test(formData.email)) nextErrors.email = "Correo inválido";
    if (!formData.password.trim()) nextErrors.password = "La contraseña es obligatoria";
    else if (formData.password.length < 8) nextErrors.password = "Mínimo 8 caracteres";
    setErrors(nextErrors);
    return !nextErrors.email && !nextErrors.password;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await signInWithPassword(formData.email, formData.password);
    if (!result.success) {
      toast.error("Credenciales incorrectas", { description: result.error });
      return;
    }
    toast.success("Bienvenido de nuevo ⚡");
    navigate("/dashboard", { replace: true });
  };

  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle();
    if (!result.success && result.error) {
      toast.error("Error con Google", { description: result.error });
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0c] flex overflow-hidden">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-[38%] relative flex-col justify-between p-12 border-r border-white/5">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center gap-3"
        >
          <img src="/logo.svg" alt="VoltSchedule" className="w-9 h-9" />
          <span className="text-white font-black text-xl tracking-tight">VoltSchedule</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative z-10 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">En línea</span>
          </div>
          <h2 className="text-4xl font-black text-white leading-[1.1] tracking-[-0.03em]">
            Gestiona tu<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #00f2ff, #0080ff)" }}>
              tiempo libre.
            </span>
          </h2>
          <p className="text-gray-500 text-sm leading-7 max-w-xs">
            Horarios precisos, flujo de trabajo inteligente y control total de tu agenda estudiantil.
          </p>
          <div className="flex gap-6 pt-2">
            {[["2k+", "Usuarios"], ["99.9%", "Uptime"], ["0ms", "Latencia"]].map(([num, label]) => (
              <div key={label}>
                <p className="text-white font-black text-lg">{num}</p>
                <p className="text-gray-600 text-xs uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 text-[10px] uppercase tracking-[0.35em] text-gray-700 font-bold"
        >
          Powered by Supabase
        </motion.p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <img src="/logo.svg" alt="VoltSchedule" className="w-8 h-8" />
            <span className="text-white font-black tracking-tight">VoltSchedule</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white tracking-[-0.03em]">Bienvenido</h1>
            <p className="text-gray-500 text-sm mt-1">Ingresa tus credenciales para continuar</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className={`relative rounded-2xl transition-all duration-200 bg-white/4 ${
                focusedField === "email" ? "ring-1 ring-cyan-500/50"
                : errors.email ? "ring-1 ring-red-500/50"
                : "ring-1 ring-white/8"
              }`}>
                <Mail size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "email" ? "text-cyan-400" : "text-gray-600"}`} />
                <input
                  id="email" name="email" type="email"
                  value={formData.email} onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="correo@ejemplo.com"
                  className="w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none rounded-2xl"
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-400 mt-1.5 ml-1">
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <div className={`relative rounded-2xl transition-all duration-200 bg-white/4 ${
                focusedField === "password" ? "ring-1 ring-cyan-500/50"
                : errors.password ? "ring-1 ring-red-500/50"
                : "ring-1 ring-white/8"
              }`}>
                <Lock size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "password" ? "text-cyan-400" : "text-gray-600"}`} />
                <input
                  id="password" name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password} onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Contraseña"
                  className="w-full bg-transparent pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none rounded-2xl"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-400 mt-1.5 ml-1">
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Iniciar sesión — primary */}
            <button
              type="submit" disabled={isLoading}
              className="w-full bg-[#00f2ff] text-[#080a0c] font-black text-sm uppercase tracking-widest py-3.5 rounded-2xl transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ boxShadow: "0 0 24px rgba(0,242,255,0.15)" }}
            >
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/8" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-[#080a0c] text-[11px] uppercase tracking-[0.3em] text-gray-600 font-bold">
                o continuar con
              </span>
            </div>
          </div>

          {/* Google — below */}
          <button
            onClick={handleGoogleLogin} disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold text-sm py-3.5 rounded-2xl transition-all hover:bg-gray-100 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            {isLoading ? "Redirigiendo..." : "Continuar con Google"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-8">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
              Crear cuenta
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
