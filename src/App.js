import Data from "./component/post/Data";
import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetail from "./component/post/Show";
import Create from "./component/post/Create";
import Login from './pages/auth/Login';
import Home from './pages/Home'
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Profile from "./component/profile/Profile";

function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Data />} />
          <Route path="/create" element={<Create />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
