import { useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "fitpulse-treinos";

export const CATEGORIES = [
  { id: "musculacao", label: "Musculação", emoji: "🏋️" },
  { id: "cardio", label: "Cardio", emoji: "🏃" },
  { id: "nutricao", label: "Nutrição", emoji: "🥗" },
  { id: "descanso", label: "Descanso", emoji: "😴" },
];

export const PRIORITIES = [
  { id: "alta", label: "Alta", weight: 3 },
  { id: "media", label: "Média", weight: 2 },
  { id: "baixa", label: "Baixa", weight: 1 },
];

const SAMPLE_TASKS = [
  {
    id: crypto.randomUUID(),
    title: "Treino de pernas — 4x12 agachamento",
    category: "musculacao",
    priority: "alta",
    completed: false,
    createdAt: Date.now() - 86400000,
  },
  {
    id: crypto.randomUUID(),
    title: "Corrida leve 30 min",
    category: "cardio",
    priority: "media",
    completed: true,
    createdAt: Date.now() - 43200000,
  },
  {
    id: crypto.randomUUID(),
    title: "Preparar marmitas da semana",
    category: "nutricao",
    priority: "media",
    completed: false,
    createdAt: Date.now() - 3600000,
  },
];

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    /* ignora dados corrompidos e usa exemplos */
  }
  return SAMPLE_TASKS;
}

function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const task = {
        id: crypto.randomUUID(),
        title: action.payload.title.trim(),
        category: action.payload.category,
        priority: action.payload.priority,
        completed: false,
        createdAt: Date.now(),
      };
      return [task, ...state];
    }

    case "TOGGLE":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

    case "DELETE":
      return state.filter((task) => task.id !== action.payload);

    case "EDIT":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.title.trim() }
          : task
      );

    case "CLEAR_COMPLETED":
      return state.filter((task) => !task.completed);

    default:
      return state;
  }
}

export function useTasks() {
  const [tasks, dispatch] = useReducer(tasksReducer, undefined, loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    const byCategory = CATEGORIES.map((category) => ({
      ...category,
      count: tasks.filter((task) => task.category === category.id).length,
    }));

    return { total, completed, pending, progress, byCategory };
  }, [tasks]);

  const actions = useMemo(
    () => ({
      add: (payload) => dispatch({ type: "ADD", payload }),
      toggle: (id) => dispatch({ type: "TOGGLE", payload: id }),
      remove: (id) => dispatch({ type: "DELETE", payload: id }),
      edit: (id, title) => dispatch({ type: "EDIT", payload: { id, title } }),
      clearCompleted: () => dispatch({ type: "CLEAR_COMPLETED" }),
    }),
    []
  );

  return { tasks, stats, actions };
}

export function filterAndSortTasks(tasks, { filter, category, search, sortBy }) {
  const normalizedSearch = search.trim().toLowerCase();

  let result = tasks.filter((task) => {
    if (filter === "active" && task.completed) return false;
    if (filter === "completed" && !task.completed) return false;
    if (category !== "all" && task.category !== category) return false;
    if (normalizedSearch && !task.title.toLowerCase().includes(normalizedSearch)) {
      return false;
    }
    return true;
  });

  const priorityWeight = Object.fromEntries(
    PRIORITIES.map((item) => [item.id, item.weight])
  );

  result = [...result].sort((a, b) => {
    if (sortBy === "priority") {
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title, "pt");
    }
    return b.createdAt - a.createdAt;
  });

  return result;
}
