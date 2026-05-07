import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Bell, Search } from 'lucide-react';

export default function Topbar() {
  const location = useLocation();
  const { profile } = useAuth();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/dashboard/settings') return 'Configuración';
    return 'Panel de Control';
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    if (email) return email.split('@')[0].slice(0, 2).toUpperCase();
    return '?';
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#080a0c]/50 backdrop-blur-md flex items-center justify-between px-8 text-white">
      <div className="flex items-center gap-4 flex-1">
        <div className="text-sm font-medium text-gray-400">
          Dashboard / <span className="text-white">{getPageTitle()}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent outline-none text-sm text-gray-300 placeholder-gray-600 w-32"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-white/5 transition-colors relative">
          <Bell size={18} className="text-gray-400 hover:text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-[#00f2ff]/20 border border-[#00f2ff]/50 flex items-center justify-center cursor-pointer hover:border-[#00f2ff] transition-colors">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-full" />
          ) : (
            <span className="text-xs font-bold text-[#00f2ff]">{getInitials(profile?.full_name, profile?.email)}</span>
          )}
        </div>
      </div>
    </header>
  );
}
