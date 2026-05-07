import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from '../../services/auth.service';
import { toast } from 'sonner';
import { LayoutGrid, Settings, LogOut, Calendar, Users } from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, signOut: contextSignOut } = useAuth();

  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard', id: 'dashboard' },
    { icon: Calendar, label: 'Horarios', href: '/dashboard', id: 'schedules' },
    { icon: Users, label: 'Equipos', href: '/dashboard', id: 'teams' },
    { icon: Settings, label: 'Configuración', href: '/dashboard/settings', id: 'settings' },
  ];

  const handleLogout = async () => {
    const result = await contextSignOut();
    if (result.success) {
      toast.success('Sesión cerrada');
      navigate('/login', { replace: true });
    } else {
      toast.error('Error al cerrar sesión');
    }
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    if (email) return email.split('@')[0].slice(0, 2).toUpperCase();
    return '?';
  };

  return (
    <aside className="w-64 bg-[#0d1117] border-r border-white/10 p-6 flex flex-col h-screen">
      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-[#00f2ff] font-bold text-2xl">Volt</h2>
        <p className="text-gray-500 text-xs mt-1">Schedule Manager</p>
      </div>

      {/* Menú Principal */}
      <nav className="space-y-2 flex-1">
        <div className="text-gray-500 text-xs uppercase font-bold mb-4 px-2">Menú</div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-white/10 pt-4">
        {profile ? (
          <div className="space-y-3">
            {/* User Info */}
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-[#00f2ff]/20 border border-[#00f2ff]/50 flex items-center justify-center flex-shrink-0">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-full" />
                ) : (
                  <span className="text-xs font-bold text-[#00f2ff]">{getInitials(profile.full_name, profile.email)}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{profile.full_name || 'Usuario'}</p>
                <p className="text-xs text-gray-500 truncate">{profile.email}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Cerrar Sesión</span>
            </button>
          </div>
        ) : (
          <div className="text-center text-xs text-gray-500">Cargando usuario...</div>
        )}
      </div>
    </aside>
  );
}
