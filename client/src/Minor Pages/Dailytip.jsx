import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
const getAuthToken = () => localStorage.getItem("token");

export const Dailytip = () => {
  const [dailyTip, setDailyTip] = useState(null);

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
      console.error("Error fetching daily tip:", err);
    }
  };

  return (
    <div>
      {dailyTip && (
        <Card className="text-black w-[700px] p-[25px] ml-[250px] h-[300px] mt-[50px] border-white">
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
