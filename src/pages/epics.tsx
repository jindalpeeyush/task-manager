import { Layout } from "../components/Layout";
import { api } from "../utils/api";

export default function Epics() {
  const { data: epics, isLoading } = api.epic.list.useQuery();

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Epics</h1>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          New Epic
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <p className="text-gray-500">Loading epics...</p>
        ) : epics?.length === 0 ? (
          <p className="text-gray-500">No epics found.</p>
        ) : (
          epics?.map(epic => (
            <div key={epic.id} className="bg-white p-6 rounded-lg shadow-sm border border-purple-100 hover:border-purple-300 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold text-gray-900">{epic.title}</h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {epic.description ?? "No description provided."}
              </p>
              <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm">
                <span className={`px-2 py-1 rounded-full ${
                  epic.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {epic.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
