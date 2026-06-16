import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./landing/Home";
import Signup from "./landing/Signup";
import Login from "./landing/Login";
import PrivateRoute from "./landing/PrivateRoute";
import Dashboard from "./landing/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
