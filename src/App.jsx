import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import CreateStory from "./components/CreateStory";
import EditStory from "./components/EditStory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-story" element={<CreateStory />} />
        <Route path="/edit-story/:id" element={<EditStory />} />
      </Routes>
    </Router>
  );
}

export default App;
