import type { Schedule } from '../../services/schedule.service';

interface ScheduleCalendarProps {
  schedules: Schedule[];
  loading: boolean;
  error: string | null;
}

export function ScheduleCalendar({ schedules, loading, error }: ScheduleCalendarProps) {
  if (loading) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-[#090c11]/80 p-8 text-white shadow-xl">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 rounded-full bg-white/10" />
          <div className="h-48 rounded-[2rem] bg-white/5" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[2rem] border border-red-500/20 bg-[#090c11]/80 p-8 text-red-200 shadow-xl">
        <h2 className="text-xl font-semibold text-white">Error al cargar tus horarios</h2>
        <p className="mt-2 text-sm text-red-200">{error}</p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#090c11]/80 p-8 shadow-xl">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400/80">Calendario</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Tus próximos horarios</h2>
        </div>
        <p className="text-sm text-gray-400">Visualiza, edita y controla tus tareas desde el backend de Supabase.</p>
      </div>

      {schedules.length === 0 ? (
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-8 text-gray-300">
          No hay horarios registrados aún. Comienza agregando tu primer evento.
        </div>
      ) : (
        <div className="grid gap-4">
          {schedules.map((schedule) => (
            <article
              key={schedule.id}
              className="rounded-[1.5rem] border border-white/10 bg-[#0b1118]/80 p-6 shadow-sm transition hover:border-cyan-500/30"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-cyan-400">{schedule.start_time} → {schedule.end_time}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{schedule.title}</h3>
                </div>
                <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gray-300">
                  {schedule.color ?? 'Sin color'}
                </span>
              </div>
              {schedule.description ? (
                <p className="mt-4 text-sm leading-6 text-gray-300">{schedule.description}</p>
              ) : (
                <p className="mt-4 text-sm leading-6 text-gray-500">Sin descripción adicional.</p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

