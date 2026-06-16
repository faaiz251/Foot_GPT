import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { LogOut, Menu, X, LayoutDashboard, Dumbbell, History, Lightbulb, Trophy, UserCircle } from "lucide-react";

import HomePage from "../Minor Pages/HomePage";
import TrainingPage from "../Minor Pages/TrainingPage";
import { Dailytip } from "../Minor Pages/Dailytip";
import HistoryPage from "../Minor Pages/History";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const tabs = [
    { value: "home", label: "Dashboard", Icon: LayoutDashboard },
    { value: "training", label: "Training Plans", Icon: Dumbbell },
    { value: "history", label: "History", Icon: History },
    { value: "tips", label: "Daily Tips", Icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Trophy className="w-5 h-5 text-green-700" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Football Assistant
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <UserCircle className="w-4 h-4" />
                <span>Player</span>
              </div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 hover:bg-red-50 hidden sm:flex"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="sm:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden bg-gray-50 border-b px-4 py-3">
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => {
                const Icon = tab.Icon;
                return (
                  <button
                    key={tab.value}
                    onClick={() => {
                      setActiveTab(tab.value);
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.value
                        ? "bg-green-100 text-green-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
              <div className="border-t my-1" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Navigation */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full bg-gray-50 border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TabsList className="hidden sm:flex h-12 bg-transparent p-0 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.Icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all cursor-pointer hover:bg-gray-100"
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <TabsContent value="home">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <HomePage />
          </div>
        </TabsContent>
        <TabsContent value="training">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <TrainingPage />
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <HistoryPage />
          </div>
        </TabsContent>
        <TabsContent value="tips">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Dailytip />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
