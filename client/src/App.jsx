import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./landing/Home";
import Signup from "./landing/Signup";
import Login from "./landing/Login";
// import PrivateRoute from "./pages/PrivateRoute";
// import Dashboard from "./pages/Dashboard";
// import Quiz from "./pages/Quiz";
// import Learnmore from "./pages/Learnmore";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/learnmore" element={<Learnmore />} />
          <Route
            path="/quiz"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;