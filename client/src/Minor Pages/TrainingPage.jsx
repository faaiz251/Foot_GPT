import { useState } from "react";
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
import { toast } from "react-hot-toast";
import { Loader2, Dumbbell, Clock, Flame } from "lucide-react";

const getAuthToken = () => localStorage.getItem("token");

const TrainingPage = () => {
  const [trainingPlan, setTrainingPlan] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

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
      setTrainingPlan([response.data.trainingPlan]);
      toast.success("Training plan generated!", { duration: 3000 });
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to generate training plan.";
      toast.error(msg, { duration: 4000 });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Training Plans</h2>
        <Button
          onClick={generateNewPlan}
          disabled={generating}
          className="cursor-pointer disabled:opacity-50"
        >
          {generating ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </span>
          ) : (
            <>
              <Dumbbell className="w-4 h-4 mr-2" />
              Generate New Plan
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {trainingPlan.map((plan) => (
          <Card key={plan.id} className="flex flex-col justify-between h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-green-600" />
                {plan.title}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {plan.duration_minutes} min
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  <span className={
                    plan.difficulty === "Easy" ? "text-green-600" :
                    plan.difficulty === "Medium" ? "text-yellow-600" : "text-red-600"
                  }>{plan.difficulty}</span>
                </span>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Drills:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {plan.drills.map((drill, idx) => (
                    <li key={idx}>{drill}</li>
                  ))}
                </ul>
              </div>
              <Button variant="outline" onClick={() => setSelectedPlan(plan)} className="w-full">
                Start Training
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Training Session</DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                toast.success(`Training completed! Rating: ${formData.get("rating")}/5`, { duration: 3000 });
                setSelectedPlan(null);
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
                  rows={4}
                  placeholder="How did you feel? Any observations?"
                  className="resize-none"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">Complete</Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedPlan(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingPage;
