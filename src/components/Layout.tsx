import Link from "next/link";
import { type ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6 shadow-md md:min-h-screen">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-400">AgileBoard</h1>
          <p className="text-xs text-gray-400 mt-1">Scrum Master Dashboard</p>
        </div>
        
        <nav className="space-y-2">
          <Link href="/" className="block py-2 px-4 rounded hover:bg-slate-800 transition-colors">
            Dashboard
          </Link>
          <Link href="/backlog" className="block py-2 px-4 rounded hover:bg-slate-800 transition-colors">
            Backlog
          </Link>
          <Link href="/board" className="block py-2 px-4 rounded hover:bg-slate-800 transition-colors">
            Active Sprint
          </Link>
          <Link href="/epics" className="block py-2 px-4 rounded hover:bg-slate-800 transition-colors">
            Epics
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
