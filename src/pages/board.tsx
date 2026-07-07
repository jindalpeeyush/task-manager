import { Layout } from "../components/Layout";


export default function Board() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Active Sprint</h1>
      
      <div className="flex gap-4 h-[calc(100vh-12rem)]">
        {/* Kanban Columns Placeholder */}
        {["To Do", "In Progress", "Review", "Done"].map(status => (
          <div key={status} className="flex-1 bg-gray-50 rounded-lg p-4 flex flex-col">
            <h3 className="font-semibold text-gray-700 mb-4 uppercase text-sm">{status}</h3>
            <div className="flex-1 overflow-y-auto space-y-3">
              {/* Item cards would go here */}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
