import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import UserRoute from "./routes/UserRoute";
import { ToastContainer } from "react-toastify";
import PartnerRoute from "./routes/PartnerRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoute />} />
        <Route path="/partner/*" element={<PartnerRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
      <div className="fixed">
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
