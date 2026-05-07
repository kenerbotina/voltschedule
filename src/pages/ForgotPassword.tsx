import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-[#080a0c] flex items-center justify-center px-6 py-20 text-white">
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 blur-3xl" />
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl">
          <h1 className="text-4xl font-black uppercase tracking-[0.3em] text-[#00f2ff] mb-4">Recuperar contraseña</h1>
          <p className="text-gray-400 mb-8">
            Esta funcionalidad todavía está en construcción. Pronto podrás recibir un enlace de recuperación directamente en tu correo.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-2xl bg-[#00f2ff] px-6 py-4 text-sm font-black uppercase tracking-widest text-[#080a0c] hover:bg-[#00d8e6] transition-all"
          >
            Volver al Login
          </Link>
        </div>
      </div>
    </div>
  );
}
