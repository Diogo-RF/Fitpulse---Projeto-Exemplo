import { useMemo, useState } from "react";
import TaskFilters from "./components/TaskFilters.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskStats from "./components/TaskStats.jsx";
import { filterAndSortTasks, useTasks } from "./hooks/useTasks.js";

export default function App() {
  const { tasks, stats, actions } = useTasks();
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const visibleTasks = useMemo(
    () => filterAndSortTasks(tasks, { filter, category, search, sortBy }),
    [tasks, filter, category, search, sortBy]
  );

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="index.html" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              F
            </span>
            FitPulse Treinos
          </a>
          <nav className="flex items-center gap-4 text-sm">
            <span className="hidden rounded-full bg-brand-100 px-3 py-1 font-medium text-brand-700 sm:inline">
              Projeto 2 · React
            </span>
            <a
              href="index.html"
              className="font-medium text-gray-600 transition hover:text-brand-600"
            >
              ← Landing page
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Plano de treinos interativo
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Web app em React com manipulação de estado, filtros, ordenação e
            persistência em <code className="text-sm">localStorage</code>.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          <TaskStats stats={stats} />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]">
            <TaskForm onAdd={actions.add} />

            <div className="space-y-4">
              <TaskFilters
                filter={filter}
                category={category}
                search={search}
                sortBy={sortBy}
                onFilterChange={setFilter}
                onCategoryChange={setCategory}
                onSearchChange={setSearch}
                onSortChange={setSortBy}
                onClearCompleted={actions.clearCompleted}
                completedCount={stats.completed}
              />

              <p className="text-sm text-gray-500">
                A mostrar {visibleTasks.length} de {tasks.length} treinos
              </p>

              <TaskList
                tasks={visibleTasks}
                onToggle={actions.toggle}
                onDelete={actions.remove}
                onEdit={actions.edit}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white py-8">
        <p className="text-center text-sm text-gray-500">
          FitPulse Treinos — demonstração de React + JavaScript
        </p>
      </footer>
    </div>
  );
}
