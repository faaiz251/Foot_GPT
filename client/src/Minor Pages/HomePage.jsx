import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

const getAuthToken = () => localStorage.getItem("token");

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        }
      );
      setUser(res.data.user);
      // setStats(res.data.stats);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            {user ? (
              `Welcome back, ${user.full_name}! ⚽`
            ) : (
              <Skeleton className="h-6 w-1/2" />
            )}
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
              <p className="text-green-600 capitalize">
                {user?.experience_level}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50">
            <CardContent className="pt-4">
              <p className="font-semibold text-purple-800">Member Since</p>
              <p className="text-purple-600">
                {user && new Date(user.createdAt).toLocaleDateString("en-GB")}
              </p>
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
   
    </div>
  );
};

export default HomePage;
