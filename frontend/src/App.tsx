import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './comonents/NavBar';
import BlogDetail from './comonents/BlogDetail';
import PublicRoute from './comonents/publicRoute';
import BlogInput from './pages/BlogInput';
import Home from './pages/Home';
import { RecoilRoot } from 'recoil';
import PrivateRoute from './comonents/privateRoute';

// const isAuthenticated = !!localStorage.getItem('user');
function App() {

  return (
    <div>
      <RecoilRoot>
      <BrowserRouter>
        <NavBar />
        <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {/* <Route element={<PublicRoute />}>
        </Route> */}
          <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/blog/input" element={<BlogInput />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
            </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      </RecoilRoot>
    </div>
  )
}

export default App