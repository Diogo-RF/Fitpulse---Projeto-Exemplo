import { useState } from "react";
import { CATEGORIES, PRIORITIES } from "../hooks/useTasks.js";

const priorityStyles = {
  alta: "bg-red-100 text-red-700",
  media: "bg-amber-100 text-amber-700",
  baixa: "bg-sky-100 text-sky-700",
};

function getCategoryMeta(categoryId) {
  return CATEGORIES.find((item) => item.id === categoryId) ?? CATEGORIES[0];
}

function getPriorityLabel(priorityId) {
  return PRIORITIES.find((item) => item.id === priorityId)?.label ?? priorityId;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const category = getCategoryMeta(task.category);

  const saveEdit = () => {
    if (draft.trim().length < 3) return;
    onEdit(task.id, draft);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraft(task.title);
    setIsEditing(false);
  };

  return (
    <li
      className={`group rounded-xl border p-4 transition ${
        task.completed
          ? "border-brand-100 bg-brand-50/40"
          : "border-gray-200 bg-white hover:border-brand-200 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 h-5 w-5 shrink-0 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          aria-label={`Marcar "${task.title}" como concluído`}
        />

        <div className="min-w-0 flex-1">
          {isEditing ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={saveEdit}
                  className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              <p
                className={`font-medium ${
                  task.completed ? "text-gray-500 line-through" : "text-gray-900"
                }`}
              >
                {task.title}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-700">
                  {category.emoji} {category.label}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 font-medium ${priorityStyles[task.priority]}`}
                >
                  {getPriorityLabel(task.priority)}
                </span>
                <time
                  className="text-gray-400"
                  dateTime={new Date(task.createdAt).toISOString()}
                >
                  {new Date(task.createdAt).toLocaleDateString("pt-PT", {
                    day: "2-digit",
                    month: "short",
                  })}
                </time>
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex shrink-0 gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              aria-label={`Editar "${task.title}"`}
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="rounded-lg px-2 py-1 text-sm text-red-500 hover:bg-red-50 hover:text-red-700"
              aria-label={`Remover "${task.title}"`}
            >
              Remover
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
