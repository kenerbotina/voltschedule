import { useAuth } from '../hooks/useAuth';
import { useSchedules } from '../hooks/useSchedules';
import { ScheduleCalendar } from '../components/dashboard/ScheduleCalendar';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const { schedules, loading, error, reload } = useSchedules();

  const displayName = profile?.full_name ?? user?.email ?? 'Usuario';
  const subtitle = profile?.full_name ? user?.email : undefined;
  const initial = profile?.full_name?.charAt(0) ?? user?.email?.charAt(0) ?? 'U';

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-[#090c11]/80 p-8 shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={displayName}
                className="rounded-full w-14 h-14 border border-cyan-500/30 object-cover"
              />
            ) : (
              <div className="rounded-full w-14 h-14 border border-cyan-500/30 bg-white/5 flex items-center justify-center text-lg font-bold text-white">
                {initial.toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400/80">Bienvenido</p>
              <h1 className="mt-2 text-3xl font-bold text-white">Hola, {displayName}</h1>
              {subtitle ? <p className="text-sm text-gray-400">{subtitle}</p> : null}
            </div>
          </div>
          <button
            type="button"
            onClick={reload}
            className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-[#080a0c] transition hover:bg-cyan-400"
          >
            Actualizar horarios
          </button>
        </div>
      </div>

      <ScheduleCalendar schedules={schedules} loading={loading} error={error} />
    </div>
  );
}
