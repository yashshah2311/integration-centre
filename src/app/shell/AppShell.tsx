import { Outlet } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/layout/Sidebar";
import { IconRail } from "../../components/layout/IconRail";

export function AppShell() {
  return (
    <div className="h-screen overflow-hidden bg-[#F3F4F6] flex">
      <IconRail />
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="shrink-0">
          <Header />
        </div>

        <div className="flex flex-1 min-h-0">
          <div className="shrink-0 h-full overflow-y-auto">
            <Sidebar />
          </div>

          <main className="flex-1 min-w-0 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
