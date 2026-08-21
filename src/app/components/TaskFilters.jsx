import { CATEGORIES } from "../hooks/useTasks.js";

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "active", label: "Pendentes" },
  { id: "completed", label: "Concluídos" },
];

const SORT_OPTIONS = [
  { id: "date", label: "Mais recentes" },
  { id: "priority", label: "Prioridade" },
  { id: "title", label: "A–Z" },
];

export default function TaskFilters({
  filter,
  category,
  search,
  sortBy,
  onFilterChange,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onClearCompleted,
  completedCount,
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Pesquisar
          </label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Filtrar por nome do treino..."
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:w-auto lg:grid-cols-2">
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
              Ordenar
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select
              id="category-filter"
              value={category}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="all">Todas</option>
              {CATEGORIES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.emoji} {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onFilterChange(item.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === item.id
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-pressed={filter === item.id}
          >
            {item.label}
          </button>
        ))}

        {completedCount > 0 && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="ml-auto rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Limpar concluídos ({completedCount})
          </button>
        )}
      </div>
    </section>
  );
}
