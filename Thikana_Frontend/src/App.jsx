import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/protectedRoute';
import AppSidebar from './components/AppSidebar/appSidebar';
import Navbar from './components/Navbar/navbar';
import Landing from './pages/Landing/landing';
import Login from './pages/Login/login';
import Signup from './pages/Signup/signup';
import Home from './pages/Home/home';
import Explore from './pages/Explore/explore';
import MyProperties from './pages/MyProperties/myProperties';
import Profile from './pages/Profile/profile';
import './App.scss';

function AppLayout() {
  return (
    <div className="app-layout">
      <AppSidebar />
      <div className="app-content">
        <Navbar />
        <main>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="my-properties" element={<MyProperties />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="home" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/app/*" element={<AppLayout />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
