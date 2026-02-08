import React, { useEffect, useState } from "react";
import StatCard from "../../../components/StatCard/StatCard";
import Section from "../../../components/Section/Section";
import Table from "../../../components/Table/Table";
import getDashboard from "../../../services/adminServices/getDashboardData";
import Spinner from "../../../components/Spinner/Spinner"


function AdminDashBoard() {

  const [loading,setLoading]=useState(true)
  const [stats, setStats] = useState({
    totalUsersCount: 0,
    activeUsersCount: 0,
    deletedUsersCount: 0,
    blockedUsersCount: 0,
  });

  const [blockedUsers, setBlockedUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);

  useEffect(() => {
    async function fetchDashboardData (){
    try {
      const res = await getDashboard()
      console.log("response in dashboard",res)
      setStats(res.data.counts);
      setBlockedUsers(res.data.allUsers.blockedUsers);
      setDeletedUsers(res.data.allUsers.deletedUsers);
    } catch (error) {
      console.error("Failed to load dashboard", error);
    }finally{
      setLoading(false)
    }
  };
  fetchDashboardData()
  }, []);

 if(loading){
  return <Spinner/>
 }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Users" value={stats.totalUsersCount} />
        <StatCard title="Active Users" value={stats.activeUsersCount} />
        <StatCard title="Blocked Users" value={stats.blockedUsersCount} />
        <StatCard title="Deleted Users" value={stats.deletedUsersCount} />
      </div>

      {/* Blocked Users */}
      <Section title="Blocked Users">
        <Table
          data={blockedUsers}
          type="blocked"
        />
      </Section>

      {/* Deleted Users */}
      <Section title="Deleted Users">
        <Table
          data={deletedUsers}
          type="deleted"
        />
      </Section>
    </div>
  );
}

export default AdminDashBoard;
