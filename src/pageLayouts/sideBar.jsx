import { useState, useEffect } from "react";
import "../styles/pageLayouts/sideBar.scss";
import {
  DashboardIcon,
  DietaryIcon,
  LogOutIcon,
  NotificationIcon,
  ProfileIcon,
  TrainerIcon,
  WorkoutPlanIcon,
} from "../utils/svg";
import { FaBars, FaTimes
 } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUserRole from "../utils/roles";
import whiteLogo from "../assets/images/whiteLogo.png";

const SideBar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

 useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const { isAdmin, isUser } = useUserRole();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("expiresIn");
    navigate("/", { replace: true });
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItem = [
    ...(isUser
      ? [
          {
            path: "/dashboard",
            name: "Dashboard",
            icon: <DashboardIcon />,
          },
          {
            path: "/dietaryPlan",
            name: "Dietary Plan",
            icon: <DietaryIcon />,
          },
          {
            path: "/workoutPlan",
            name: "Work-Out Plan",
            icon: <WorkoutPlanIcon />,
          },

          {
            path: "/trainers",
            name: "Trainers",
            icon: <TrainerIcon />,
          },
        ]
      : []),

    ...(isAdmin
      ? [
          {
            path: "/userManagement",
            name: "User Management",
            icon: <ProfileIcon />,
          },

          {
            path: "/trainers",
            name: "Trainers",
            icon: <TrainerIcon />,
          },
          {
            path: "/notification",
            name: "Notification",
            icon: <NotificationIcon />,
          },
        ]
      : []),
  ];

  const bottomItems = [
    ...(isUser
      ? [
          {
            path: "/profile",
            name: "Account",
            icon: <ProfileIcon />,
          },
        ]
      : []),

    {
      path: "/logout",
      name: "Log Out",
      icon: <LogOutIcon />,
    },
  ];
  return (
    <aside className="sidebar-container">
      <div>
       {isMobile && (
        <button className="hamburger-btn" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}
      </div>
      

      <div className={`sidebar ${isMobile ? (isOpen ? 'open' : 'closed') : ''}`}>
        <div className="sidebar-top-section">
          <img src={whiteLogo} alt="White Logo" />
          <button className="hamburger-btn" onClick={toggleSidebar}>
             {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
          <div className="sidebar-menu">
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active-sidebar" : "sidebar-link"
                }
                onClick={() => isMobile && setIsOpen(false)}
              >
                <div className="icon">{item.icon}</div>
                <div className="link-text">{item.name}</div>
              </NavLink>
            ))}
          </div>
       

        <div className="sidebar-footer">
          {bottomItems.map((item, index) => {
            if (item.name === "Log Out") {
              return (
                <div
                  key={index}
                   onClick={() => {
                    handleLogout();
                    isMobile && setIsOpen(false);
                  }}
                  className="sidebar-link"
                  style={{ cursor: "pointer" }}
                >
                  <div className="icon">{item.icon}</div>
                  <div className="link-text">{item.name}</div>
                </div>
              );
            } else {
              return (
                <NavLink
                  to={item.path}
                  key={index}
                  className={({ isActive }) =>
                    isActive ? "sidebar-link active-sidebar" : "sidebar-link"
                  }
                   onClick={() => isMobile && setIsOpen(false)}
                >
                  <div className="icon">{item.icon}</div>
                  <div className="link-text">{item.name}</div>
                </NavLink>
              );
            }
          })}
        </div>
      </div>
      <main className={`main-layout ${isMobile && isOpen ? 'sidebar-open' : ''}`}>
        {children}
      </main>
    </aside>
  );
};

export default SideBar;
