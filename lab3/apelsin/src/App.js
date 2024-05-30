import { Route, Routes } from "react-router-dom";
import Registration from "./components/login/registration";
import LogIn from "./components/login/login";
import UserPage from "./components/userPage/userPage";
import './components/login/style/registration.css'
import './components/userPage/style/main.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Registration />} />      
      <Route path="/login" element={<LogIn />} />
           
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
}

export default App;
