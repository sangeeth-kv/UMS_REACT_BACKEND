import AdminSidebar from "../../components/Aside/AdminAside";
import { Outlet } from "react-router-dom";
import AdminHeader from "../Header/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64">
        <AdminSidebar />
      </div>

      {/* Main Area */}
      <div className="ml-64">
        {/* Header */}
        <div className="fixed top-0 left-64 right-0 h-16 z-10">
          <AdminHeader />
        </div>

        {/* Page Content */}
        <main className="pt-16 p-6 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
