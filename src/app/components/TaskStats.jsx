export default function TaskStats({ stats }) {
  return (
    <section
      aria-label="Estatísticas do plano"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Total</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">{stats.total}</p>
      </article>

      <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Pendentes</p>
        <p className="mt-1 text-3xl font-bold text-amber-600">{stats.pending}</p>
      </article>

      <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Concluídos</p>
        <p className="mt-1 text-3xl font-bold text-brand-600">{stats.completed}</p>
      </article>

      <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Progresso</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">{stats.progress}%</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-300"
            style={{ width: `${stats.progress}%` }}
            role="progressbar"
            aria-valuenow={stats.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progresso geral"
          />
        </div>
      </article>
    </section>
  );
}
