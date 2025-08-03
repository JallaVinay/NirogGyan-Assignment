import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import './index.css'

const Header = () => (
  <nav className="Header-container">
    <h1 className="logo-img">
      <Link to="/">NirogGyan</Link>
    </h1>
    <ul className="nav-links-container">
      <li className="nav-link-item">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-link-item">
        <Link to="/">My Appointments</Link>
      </li>
      <li className="profile-icon">
        <Link to="/" title="Profile">
          <FaUserCircle size={28} />
        </Link>
      </li>
    </ul>
  </nav>
)

export default Header
