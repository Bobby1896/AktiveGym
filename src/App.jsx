import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import About from "./pages/about";
import Steps from "./pages/steps";
import Membership from "./pages/membership";
import Logout from "./authentication/logout";
import SignUp from "./authentication/signup";
import Navbar from "./pageLayouts/navBar";
import LandingPage from "./pages/landingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/steps" element={<Steps />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Logout />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
