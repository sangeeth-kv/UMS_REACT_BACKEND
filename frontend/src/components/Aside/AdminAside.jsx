import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
const linkClass =
  "block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700";

const activeClass =
  "bg-gray-200 dark:bg-slate-700 font-semibold text-gray-900 dark:text-white";

  return (
    // <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 p-4 border-r dark:border-gray-700">
    <aside className="fixed left-0 top-0 h-screen w-64 
bg-white dark:bg-slate-900 
p-4 border-r border-gray-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Admin Panel
      </h2>

      <nav className="space-y-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/admin/broadcast"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Send Email
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
