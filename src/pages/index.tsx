import { useState } from "react";
import { api, type RouterOutputs } from "../utils/api";

type Task = RouterOutputs["task"]["list"][number];

export default function HomePage() {
  const trpcCtx = api.useUtils();
  const { data: tasks, isLoading } = api.task.list.useQuery();

  const createTask = api.task.create.useMutation({
    onSuccess: () => trpcCtx.task.list.invalidate(),
  });
  const updateTask = api.task.update.useMutation({
    onSuccess: () => trpcCtx.task.list.invalidate(),
  });
  const deleteTask = api.task.delete.useMutation({
    onSuccess: () => trpcCtx.task.list.invalidate(),
  });

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createTask.mutate({ title, priority, tags: [] });
    setTitle("");
  };

  return (
    <main className="max-w-2xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">My Tasks</h1>

      <form onSubmit={handleCreateTask} className="flex gap-4 mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 border rounded-md"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
          className="px-4 py-2 border rounded-md bg-white"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          disabled={createTask.isPending || !title.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {isLoading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : (
        <ul className="space-y-3">
          {tasks?.map((task: Task) => (
            <li
              key={task.id}
              className={`flex items-center gap-4 p-4 border rounded-lg ${
                task.status === "completed" ? "bg-gray-50" : "bg-white"
              }`}
            >
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={(e) =>
                  updateTask.mutate({
                    id: task.id,
                    status: e.target.checked ? "completed" : "pending",
                  })
                }
                className="w-5 h-5 cursor-pointer"
              />
              <div className="flex-1">
                <p
                  className={`text-lg ${
                    task.status === "completed"
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full uppercase ${
                  task.priority === "high"
                    ? "bg-red-100 text-red-800"
                    : task.priority === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {task.priority}
              </span>
              <button
                onClick={() => deleteTask.mutate({ id: task.id })}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                aria-label="Delete task"
              >
                Delete
              </button>
            </li>
          ))}
          {tasks?.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No tasks yet. Add one above!
            </p>
          )}
        </ul>
      )}
    </main>
  );
}