import { Link } from "react-router-dom";
import MainNav from "../common/MainNav";
import { Button } from "../../components/ui/button";
import { motion } from "react-dom/client";
import { ArrowRight, Sparkles, Target } from "lucide-react";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-[url('https://images.ctfassets.net/mrbo2ykgx5lt/24908/b4ee67676ec7de49340be65693afda9b/frontiers-in-psychology-soccer-coaches-assessing-developing-player-football.jpg')] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundAttachment: "fixed",
        backgroundColor: "rgba(255,255,255,0.85)",
        backgroundBlendMode: "lighten",
      }}
    >
      <MainNav />

      <main className="flex flex-col items-center justify-center min-h-[87vh] px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-green-800 mb-4">
            Train Smarter with Your{" "}
            <span className="text-green-600">AI Football Coach</span>
          </h1>

          <p className="text-base sm:text-lg mt-4 max-w-xl mx-auto text-gray-700">
            Personalized training plans, feedback, and progress tracking — powered
            by AI. Improve your skills every day with intelligent coaching
            support.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Target className="w-4 h-4 mr-2" />
                Already a member?
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <Sparkles className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-800">AI-Powered</p>
              <p className="text-xs text-gray-600">Smart training plans</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-800">Personalized</p>
              <p className="text-xs text-gray-600">Based on your position</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <ArrowRight className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-800">Daily Tips</p>
              <p className="text-xs text-gray-600">Keep improving daily</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
