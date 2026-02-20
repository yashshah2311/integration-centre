import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/layout/Sidebar";
import { IconRail } from "../../components/layout/IconRail";

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-[#F3F4F6]">
      <div className="hidden lg:block">
        <IconRail variant="sidebar" />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />

        <div className="flex flex-1 min-h-0">
          <div className="hidden md:block shrink-0 h-full overflow-y-auto">
            <Sidebar />
          </div>

          <main className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 pb-24 lg:pb-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile IconRail */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <IconRail variant="bottom" />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-2xl overflow-y-auto">
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
