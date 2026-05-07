import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Globe, HelpCircle, LayoutGrid, Zap, Menu, X } from "lucide-react";

const navLinks = [
  { to: "/features", label: "nav_features", default: "Funciones", icon: Zap },
  { to: "/templates", label: "nav_templates", default: "Plantillas", icon: LayoutGrid },
  { to: "/help", label: "nav_help", default: "Ayuda", icon: HelpCircle },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-[#080a0c]/80 border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl">
      <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">

          {/* IZQUIERDA: LOGO Y NAVEGACIÓN */}
          <div className="flex items-center gap-12">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img src="/logo.svg" alt="Volt" className="w-9 h-9 transition-transform group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white leading-none italic uppercase">
                  Volt<span className="text-[#00f2ff]">Schedule</span>
                </span>
              </div>
            </Link>

            <ul className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.3em] font-bold">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#00f2ff] focus:ring-opacity-50 rounded ${
                      pathname === link.to
                        ? "text-[#00f2ff]"
                        : "text-gray-400 hover:text-[#00f2ff]"
                    }`}
                  >
                    <link.icon size={14} className="text-[#00f2ff]" />
                    {t(link.label, link.default)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full text-xs text-gray-400 hover:border-[#00f2ff]/50 hover:text-white transition-all uppercase tracking-widest font-bold bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00f2ff] focus:ring-opacity-50"
              aria-label={t("toggle_language", "Cambiar idioma")}
            >
              <Globe size={12} className="text-[#00f2ff]" />
              {i18n.language.toUpperCase()}
            </button>

            <Link
              to="/login"
              className="px-6 py-2 text-sm font-black tracking-[0.2em] text-[#080a0c] bg-[#00f2ff] rounded-xl hover:shadow-[0_0_25px_rgba(0,242,255,0.4)] hover:scale-105 transition-all uppercase shadow-[0_0_10px_rgba(0,242,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[#00f2ff] focus:ring-opacity-50"
            >
              {t("nav_login", "Acceder")}
            </Link>
          </div>

          {/* MENÚ MÓVIL */}
          <div className="lg:hidden">
            <button
              className="p-2 text-[#00f2ff] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00f2ff] focus:ring-opacity-50 rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t("close_menu", "Cerrar menú") : t("open_menu", "Abrir menú")}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-[#0d1117] border-b border-white/10 p-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <ul className="space-y-4 text-center text-sm font-bold tracking-[0.3em] uppercase">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`block py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00f2ff] focus:ring-opacity-50 rounded ${
                    pathname === link.to
                      ? "text-[#00f2ff]"
                      : "text-white hover:text-[#00f2ff]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.label, link.default)}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                className="flex items-center justify-center w-full gap-2 px-3 py-2 border border-white/10 rounded-full text-sm text-gray-400 hover:border-[#00f2ff]/50 hover:text-white transition-all uppercase tracking-widest font-bold bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00f2ff] focus:ring-opacity-50"
                aria-label={t("toggle_language", "Cambiar idioma")}
              >
                <Globe size={14} className="text-[#00f2ff]" />
                {i18n.language.toUpperCase()}
              </button>
            </li>
          </ul>
          <Link
            to="/login"
            className="block w-full py-4 text-center text-sm font-black tracking-[0.3em] text-[#080a0c] bg-[#00f2ff] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00f2ff] focus:ring-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("nav_login", "Acceder")}
          </Link>
        </div>
      )}
    </nav>
  );
};
