import './App.css';
import Header from './Components/Header';
import Blogs from './Components/Blogs';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import UserBlogs from "./Components/UserBlogs"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginState from './context/loginState';
import CreateBlog from './Components/CreateBlog';
import BlogDetails from './Components/BlogDetails';
import  { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    <Toaster/>
    <LoginState>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/all-blogs" element={<Blogs />} />
          <Route path="/my-blogs" element={<UserBlogs />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
        </Routes>
      </BrowserRouter>
    </LoginState>
    </>
  );
}

export default App;
