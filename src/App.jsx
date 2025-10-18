// App.jsx
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import appRoutes from "../src/user/routes/appRoutes";
import LoginPage from "./user/pages/Login";
import SignUpPage from "./user/pages/Signuppage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLayout from "./user/UserLayout";
import UserProtector from "./user/middleware/UserProtector";
// 
// 
function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
      
        <Route path="/" element={<Navigate to="/login" replace />} />

        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign" element={<SignUpPage />} />

        <Route element={<UserProtector compo={<UserLayout />} />}>
          {appRoutes
            .filter((route) => !["/login", "/sign", "/"].includes(route.path))
            .map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
