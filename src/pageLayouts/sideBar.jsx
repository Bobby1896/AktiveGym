import "../styles/pageLayouts/sideBar.scss";
import {
  DashboardIcon,
  DietaryIcon,
  LogOutIcon,
  NotificationIcon,
  ProfileIcon,
  TrainerIcon,
  WorkoutPlanIcon,
} from "../svg";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SideBar = ({ children }) => {
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
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-top-section">
          <img src="src/assets/images/white logo.png" alt="White Logo" />
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
          {bottomItems.map((item, index) => (
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
      </div>
      <main>{children}</main>
    </div>
  );
};

export default SideBar;
