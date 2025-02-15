import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";

import Convert from "./components/Convert/Convert";
// import Question from "./components/Summary/Summary";

const App = () => {
  return (
    <Routes>
      <Route index element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/convert" element={<Convert />} />
    </Routes>
  );
};

export default App;
