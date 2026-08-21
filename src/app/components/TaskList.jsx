import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
        <p className="text-4xl" aria-hidden="true">
          🎯
        </p>
        <p className="mt-3 font-semibold text-gray-900">Nenhum treino encontrado</p>
        <p className="mt-1 text-sm text-gray-500">
          Ajusta os filtros ou adiciona um novo exercício ao plano.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3" aria-label="Lista de treinos">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
