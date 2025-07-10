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
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideBar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const menuItem = [
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
      path: "/notification",
      name: "Notification",
      icon: <NotificationIcon />,
    },
    {
      path: "/trainers",
      name: "Trainers",
      icon: <TrainerIcon />,
    },
    {
      path: "/userManagement",
      name: "User Management",
      icon: <ProfileIcon />,
    },
    {
      path: "/workoutPlan",
      name: "Work-Out Plan",
      icon: <WorkoutPlanIcon />,
    },
     {
      path: "/adminTrainer",
      name: "Admin Trainer",
      icon: <WorkoutPlanIcon />,
    },
  ];

  const bottomItems = [
    {
      path: "/profile",
      name: "Account",
      icon: <ProfileIcon />,
    },
    {
      path: "/logout",
      name: "Log Out",
      icon: <LogOutIcon />,
    },
  ];
  return (
    <aside className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-top-section">
          <img src="src/assets/images/whiteLogo.png" alt="White Logo" />
          <div className="bars">{/* <FaBars /> */}</div>
        </div>

        <div className="sidebar-menu">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                isActive ? "sidebar-link active-sidebar" : "sidebar-link"
              }
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
                  onClick={handleLogout}
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
                >
                  <div className="icon">{item.icon}</div>
                  <div className="link-text">{item.name}</div>
                </NavLink>
              );
            }
          })}
        </div>
      </div>
      <main className="main-layout">{children}</main>
    </aside>
  );
};

export default SideBar;
