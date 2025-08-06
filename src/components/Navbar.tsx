import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaRobot } from "react-icons/fa";

const AppNavbar: React.FC = () => {
  const role = localStorage.getItem("role");

  const user = role
    ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
    : "";

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <div className="container-fluid">
          <div className="text-white d-flex justify-content-center align-items-center">
            {" "}
            <FaRobot size={28} />
            <a className="navbar-brand fw-bold fs-4 ms-2" href="#">
              AI Recruiter
            </a>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarUserDropdown"
            aria-controls="navbarUserDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarUserDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* <img
                    src="https://via.placeholder.com/30"
                    alt="User Avatar"
                    className="rounded-circle me-2"
                    width="30"
                    height="30"
                  /> */}
                    <span>{user}</span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AppNavbar;
