import { Outlet } from "react-router-dom";
import SideBar from "./sideBar";

const DashBoardLayout = () => {
  return (
    <SideBar>
      <Outlet />
    </SideBar>
  );
};

export default DashBoardLayout;
