import { Layout } from "../components/Layout";
import { api } from "../utils/api";

export default function Dashboard() {
  const { data: sprints, isLoading: sprintsLoading } = api.sprint.list.useQuery();
  const { data: workItems, isLoading: itemsLoading } = api.workItem.list.useQuery();

  const activeSprint = sprints?.find(s => s.status === "Active");
  const completedTasks = workItems?.filter(i => i.status === "Done")?.length ?? 0;
  const totalTasks = workItems?.length ?? 0;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Active Sprint</h3>
          <p className="text-2xl font-bold mt-2">
            {sprintsLoading ? "..." : activeSprint ? activeSprint.name : "None"}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Sprint Progress</h3>
          <p className="text-2xl font-bold mt-2 text-blue-600">
            {itemsLoading ? "..." : totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) + "%" : "0%"}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Work Items</h3>
          <p className="text-2xl font-bold mt-2">{itemsLoading ? "..." : totalTasks}</p>
        </div>
      </div>
    </Layout>
  );
}