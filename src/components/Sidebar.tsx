import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBars, FaUser, FaUsers, FaFileAlt, FaSignOutAlt,
  FaTachometerAlt, FaUserTie, FaStream, FaChartLine
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-dark text-white d-flex flex-column ${isCollapsed ? 'p-2' : 'p-3'} min-vh-100`}
      style={{ width: isCollapsed ? '70px' : '220px' }}
    >
      <div className="d-flex align-items-center mb-4">
        <button onClick={toggleSidebar} className="btn btn-outline-light btn-sm me-2">
          <FaBars />
        </button>
        {!isCollapsed && <span className="fs-5 fw-bold">AI Recruiter</span>}
      </div>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/app" className="nav-link text-white d-flex align-items-center">
            <FaTachometerAlt className="me-2" /> {!isCollapsed && 'Dashboard'}
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/app/candidates" className="nav-link text-white d-flex align-items-center">
            <FaUser className="me-2" /> {!isCollapsed && 'Candidates'}
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/app/jobs" className="nav-link text-white d-flex align-items-center">
            <FaUsers className="me-2" /> {!isCollapsed && 'Jobs'}
          </Link>
        </li>

        {role === 'COMPANY' && (
          <li className="nav-item mb-2">
            <Link to="/app/generate-jd" className="nav-link text-white d-flex align-items-center">
              <FaFileAlt className="me-2" /> {!isCollapsed && 'Job Descriptions'}
            </Link>
          </li>
        )}

        <li className="nav-item mb-2">
          <Link to="/app/add-candidate" className="nav-link text-white d-flex align-items-center">
            <FaUserTie className="me-2" /> {!isCollapsed && 'Add Candidate'}
          </Link>
        </li>

        {role === 'USER' && (
          <>
            <li className="nav-item mb-2">
              <Link to="/app/hr-screening" className="nav-link text-white d-flex align-items-center">
                <FaStream className="me-2" /> {!isCollapsed && 'HR Screening'}
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/app/technical-screening" className="nav-link text-white d-flex align-items-center">
                <FaChartLine className="me-2" /> {!isCollapsed && 'Technical Screening'}
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className="mt-auto">
        <Link to="/app/logout" className="nav-link text-white d-flex align-items-center">
          <FaSignOutAlt className="me-2" /> {!isCollapsed && 'Logout'}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
