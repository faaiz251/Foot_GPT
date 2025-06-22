import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Skeleton } from "../../components/ui/skeleton";

const API = "http://localhost:5000/api";

const getAuthToken = () => localStorage.getItem("token");

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [dailyTip, setDailyTip] = useState(null);

  useEffect(() => {
    fetchUserProfile();
    fetchDailyTip();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${API}/user/profile`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      setUser(res.data.user);
      setStats(res.data.stats);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const fetchDailyTip = async () => {
    try {
      const res = await axios.get(`${API}/daily-tip`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      setDailyTip(res.data);
    } catch (err) {
      console.error("Error fetching daily tip:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            {user ? `Welcome back, ${user.name}! ⚽` : <Skeleton className="h-6 w-1/2" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <Card className="bg-blue-50">
            <CardContent className="pt-4">
              <p className="font-semibold text-blue-800">Position</p>
              <p className="text-blue-600 capitalize">{user?.position}</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="pt-4">
              <p className="font-semibold text-green-800">Experience</p>
              <p className="text-green-600 capitalize">{user?.experience_level}</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50">
            <CardContent className="pt-4">
              <p className="font-semibold text-purple-800">Member Since</p>
              <p className="text-purple-600">{user && new Date(user.created_at).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Stats */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <Card className="bg-orange-50 text-center">
              <CardContent className="pt-4">
                <div className="text-3xl font-bold text-orange-600">
                  {stats.total_training_sessions}
                </div>
                <div className="text-orange-800">Training Sessions</div>
              </CardContent>
            </Card>
            <Card className="bg-teal-50 text-center">
              <CardContent className="pt-4">
                <div className="text-3xl font-bold text-teal-600">
                  {stats.total_training_plans}
                </div>
                <div className="text-teal-800">Training Plans Generated</div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Daily Tip */}
      {dailyTip && (
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle>💡 Today's Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{dailyTip.tip}</p>
            <blockquote className="border-l-4 border-white/30 pl-4 italic">
              "{dailyTip.motivational_quote}"
            </blockquote>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HomePage;
