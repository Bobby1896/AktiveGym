import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Steps from "./pages/steps";
import Membership from "./pages/membership";
import Login from "./auth/login";
import Signup from "./auth/signup";
import LandingPage from "./pages/landingPage";
import Dashboard from "./features/dashboard";
import DietaryPlan from "./features/dietaryPlan";
import Notification from "./features/notification";
import Trainers from "./features/trainers";
import UserManagement from "./features/userManagement";
import WorkoutPlan from "./features/workoutPlan";
import DashBoardLayout from "./pageLayouts/dashBoardLayout";
import Account from "./features/account";
import TrainersProfile from "./features/trainersProfile";
import PrivateRoute from "./utils/auth/privateRoute";
import WorkoutExercises from "./features/workoutExercises";
import AddTrainers from "./features/addTrainers";
import DietaryDetails from "./features/dietaryDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/steps" element={<Steps />} />
        <Route path="/membership" element={<Membership />} />

        <Route path="/login" element={<Login />} />
        <Route path="/login/:uuid" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          element={
            <PrivateRoute>
              <DashBoardLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dietaryPlan" element={<DietaryPlan />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/userManagement" element={<UserManagement />} />
          <Route path="/workoutPlan" element={<WorkoutPlan />} />
          <Route path="/profile" element={<Account />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route path="/trainersProfile/:id" element={<TrainersProfile />} />
          <Route path="/addTrainers" element={<AddTrainers />} />
          <Route
            path="/workOutExercises/:type"
            element={<WorkoutExercises />}
          />
          <Route path="dietaryDetails/:id" element={<DietaryDetails/>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
