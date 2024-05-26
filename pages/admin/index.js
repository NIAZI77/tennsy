import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const AdminDashboard = () => {
  const router = useRouter();
  const [cookies] = useCookies(["authToken"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cookies.authToken) {
      router.replace("/admin/login");
    } else {
      setLoading(false);
    }
  }, [cookies.authToken, router]);

  if (loading) {
    return (
      <div className="h-[70vh] w-screen flex items-center justify-center ">
        <img src="/loading.webp" alt="loading..." />
      </div>
    );
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard!</p>
    </div>
  );
};

export default AdminDashboard;
