import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { toast } from "react-hot-toast";
import { Lightbulb, Quote, Loader2 } from "lucide-react";

const getAuthToken = () => localStorage.getItem("token");

export const Dailytip = () => {
  const [dailyTip, setDailyTip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDailyTip();
  }, []);

  const fetchDailyTip = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/daily-tip`,
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        }
      );
      setDailyTip(res.data);
    } catch (err) {
      toast.error("Failed to load daily tip", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      ) : dailyTip ? (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              Today&apos;s Tip
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed">{dailyTip.tip}</p>
            <blockquote className="border-l-4 border-green-500 pl-4 italic text-muted-foreground">
              <Quote className="w-4 h-4 inline mr-1" />
              {dailyTip.motivational_quote}
            </blockquote>
          </CardContent>
        </Card>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <Lightbulb className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-muted-foreground">No daily tip available</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
