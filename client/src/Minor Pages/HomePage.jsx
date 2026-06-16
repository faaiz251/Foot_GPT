import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { toast } from "react-hot-toast";
import { User, Target, Calendar, TrendingUp } from "lucide-react";

const getAuthToken = () => localStorage.getItem("token");

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setStats(res.data.stats);
    } catch (err) {
      toast.error("Failed to load profile", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6 text-green-600" />
            {loading ? (
              <Skeleton className="h-6 w-1/2" />
            ) : user ? (
              `Welcome back, ${user.full_name}! ⚽`
            ) : (
              "Welcome!"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-blue-50">
            <CardContent className="pt-4 flex items-center gap-3">
              <Target className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-semibold text-blue-800">Position</p>
                <p className="text-blue-600 capitalize">{user?.position || "—"}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="pt-4 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">Experience</p>
                <p className="text-green-600 capitalize">{user?.experience_level || "—"}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50">
            <CardContent className="pt-4 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div>
                <p className="font-semibold text-purple-800">Member Since</p>
                <p className="text-purple-600">
                  {user ? new Date(user.createdAt).toLocaleDateString("en-GB") : "—"}
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Stats */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
    </div>
  );
};

export default HomePage;
