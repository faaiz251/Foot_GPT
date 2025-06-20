import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
// import { AuthContext } from "@/context/AuthContext"; // Adjust path if needed

// import HomePage from "./HomePage";
// import TrainingPage from "./TrainingPage";
// import HistoryPage from "./HistoryPage";
// import TipsPage from "./TipsPage";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
//   const { user, logout } = useContext(AuthContext);
  const [session, setSession] = useState(null);

    useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/api/auth/login", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSession(res.data);
      } catch (err) {
        window.location.href = "/login";
      }
    };

    checkSession();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">⚽ Football Assistant</h1>
              <span className="text-sm text-gray-600">Welcome, {session?.user?.name || "Player"}!</span>
            </div>
            <Button variant="ghost" className="text-red-600 hover:text-red-800">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TabsList className="flex space-x-8 bg-transparent cursor-pointer">
            <TabsTrigger className='cursor-pointer' value="home">🏠 Dashboard</TabsTrigger>
            <TabsTrigger className='cursor-pointer' value="training">🏃‍♂️ Training Plans</TabsTrigger>
            <TabsTrigger className='cursor-pointer' value="history">📊 History</TabsTrigger>
            <TabsTrigger className='cursor-pointer' value="tips">💡 Daily Tips</TabsTrigger>
          </TabsList>
        </div>

        {/* Content */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <TabsContent value="home"></TabsContent>
          <TabsContent value="training"></TabsContent>
          <TabsContent value="history"></TabsContent>
          <TabsContent value="tips"></TabsContent>
        </main>
      </Tabs>
    </div>
  );
};

export default Dashboard;
