import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

const getAuthToken = () => localStorage.getItem("token");

const TrainingPage = () => {
  const [trainingPlan, setTrainingPlan] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  //   useEffect(() => {
  //     fetchTrainingPlans();
  //   }, []);

  //   const fetchTrainingPlans = async () => {
  //     try {
  //       const response = await axios.get(`${API}/training/plans`, {
  //         headers: { Authorization: `Bearer ${getAuthToken()}` },
  //       });
  //       setTrainingPlans(response.data);
  //     } catch (error) {
  //       console.error("Error fetching training plans:", error);
  //     }
  //   };

  const generateNewPlan = async () => {
    setGenerating(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/training/generate`,
        {},
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        }
      );
      // const fullText = response.data.trainingPlan;
      //   const parts = fullText.split("\n").filter((line) => line.trim() !== "");
setTrainingPlan([response.data.trainingPlan]);
    } catch (error) {
      console.error("Error generating plan:", error);
    }
    setGenerating(false);
  };

  //   const completePlan = async (planId, rating, notes) => {
  //     try {
  //       await axios.post(
  //         `${API}/training/complete`,
  //         { training_plan_id: planId, rating, notes },
  //         { headers: { Authorization: `Bearer ${getAuthToken()}` } }
  //       );
  //       alert("Training session completed!");
  //       setSelectedPlan(null);
  //     } catch (error) {
  //       console.error("Error completing training:", error);
  //     }
  //   };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Training Plans</h2>
        <Button
          onClick={generateNewPlan}
          className="cursor-pointer"
          disabled={generating}
        >
          {generating ? "Generating..." : "🤖 Generate New Plan"}
        </Button>
      </div>
.
      {/* {trainingPlan.map((plan)=>  (
        <div className="mt-10 max-w-2xl bg-white/5 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-black">Plan:</h2>
          <p className="text-lg mb-4">{plan}</p>
        </div>
      ))} */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {trainingPlan.map((plan) => (
          <Card key={plan.id} className="flex flex-col justify-between h-full">
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Duration: {plan.duration_minutes} minutes</p>
                <p>
                  Difficulty: <span className={
                    plan.difficulty === "Easy" ? "text-green-600" :
                    plan.difficulty === "Medium" ? "text-yellow-600" : "text-red-600"
                  }>{plan.difficulty}</span>
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Drills:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {plan.drills.map((drill, idx) => (
                    <li key={idx}>{drill}</li>
                  ))}
                </ul>
              </div>
              <Button variant="outline" onClick={() => setSelectedPlan(plan)}>
                Start Training
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

     <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Training Session</DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                completePlan(
                  selectedPlan.id,
                  parseInt(formData.get("rating")),
                  formData.get("notes")
                );
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Rating (1-5 stars)</Label>
                <Select name="rating" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ Good</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ Average</SelectItem>
                    <SelectItem value="2">⭐⭐ Below Average</SelectItem>
                    <SelectItem value="1">⭐ Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notes (optional)</Label>
                <Textarea
                  name="notes"
                  rows={10}
                  placeholder="How did you feel? Any observations?"
                  className="h-[150px]"
                />
              </div>

              <div className="space-x-3">
                <div className="flex justify-center flex-col w-[300px] gap-[20px] ml-[80px]">
                <Button type="submit">
                  Complete
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedPlan(null)}
                >
                  Cancel
                </Button>
                </div>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog> 
    </div>
  );
};

export default TrainingPage;
