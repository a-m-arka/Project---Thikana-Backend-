import {
  HiOutlineBell,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './navbar.scss';
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initials = (user?.name || 'U').slice(0, 1).toUpperCase();
  return (
    <header className="navbar">
      <label className="navbar__search">
        <HiOutlineMagnifyingGlass />
        <input placeholder="Search properties" />
      </label>
      <div className="navbar__actions">
        <button title="Notifications" className="icon-button">
          <HiOutlineBell />
        </button>
        <button title="Messages coming soon" className="icon-button">
          <HiOutlineChatBubbleOvalLeft />
        </button>
        <button className="navbar__user" onClick={() => navigate('/app/profile')}>
          <span>{initials}</span>
          <strong>{user?.name || 'My account'}</strong>
        </button>
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          title="Log out"
          className="icon-button navbar__logout"
        >
          <HiOutlineArrowRightOnRectangle />
        </button>
      </div>
    </header>
  );
}
