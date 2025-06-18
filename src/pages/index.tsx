import { api, type RouterOutputs } from "../utils/api";

export default function HomePage() {
  const { data: tasks } = api.task.list.useQuery();
  const createTask = api.task.create.useMutation();

  // Type of a single task (array element of list output)
  type Task = RouterOutputs["task"]["list"][number];

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">My Tasks</h1>
      <ul>
        {tasks?.map((task: Task) => (
          <li key={task.id}>
            {task.title} - {task.priority}
          </li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white"
        onClick={() =>
          createTask.mutate({
            title: "New Task",
            priority: "high",
            tags: [],
          })
        }
      >
        Add Task
      </button>
    </main>
  );
}