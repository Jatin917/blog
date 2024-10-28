import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './comonents/NavBar';
import BlogDetail from './comonents/BlogDetail';
import BlogInput from './pages/BlogInput';
import Home from './pages/Home';
import { RecoilRoot } from 'recoil';


function App() {

  return (
    <div>
      <RecoilRoot>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog/publish" element={<BlogInput />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      </RecoilRoot>
    </div>
  )
}

export default App