import Data from "./component/post/Data";
import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetail from "./component/post/Show";
import Create from "./component/post/Create";
import Login from './pages/auth/Login';
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Data />} />
          <Route path="/create" element={<Login><Create /> </Login>} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
