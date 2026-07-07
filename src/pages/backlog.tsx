import { Layout } from "../components/Layout";
import { api } from "../utils/api";

export default function Backlog() {
  const { data: workItems, isLoading } = api.workItem.list.useQuery();
  
  // Backlog usually consists of items not in an active sprint
  const backlogItems = workItems?.filter(i => !i.sprintId) ?? [];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Backlog</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Create Issue
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        {isLoading ? (
          <p className="p-4 text-gray-500">Loading backlog...</p>
        ) : backlogItems.length === 0 ? (
          <p className="p-8 text-center text-gray-500">Backlog is empty.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {backlogItems.map(item => (
              <li key={item.id} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                <div>
                  <span className="font-medium text-gray-900">{item.title}</span>
                  <div className="text-xs text-gray-500 mt-1 flex gap-2">
                    <span className="bg-gray-200 px-2 py-0.5 rounded">{item.type}</span>
                    <span className="bg-gray-200 px-2 py-0.5 rounded">{item.priority}</span>
                    {item.storyPoints && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{item.storyPoints} pts</span>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
