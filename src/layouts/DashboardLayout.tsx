import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[#080a0c]">
      {/* 1. El Sidebar fijo a la izquierda */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* 2. Una barra superior si la necesitas */}
        <Topbar />

        {/* 3. El contenido dinámico (tus páginas) */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}
