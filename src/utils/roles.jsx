import { useEffect, useState } from "react";

const useUserRole = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const roleFromStorage = localStorage.getItem("userRole");
    setUserRole(roleFromStorage);
  }, []);

  const isAdmin = userRole === "ADMIN";
  const isUser = userRole === "MEMBER";

  return { userRole, isAdmin, isUser };
};

export default useUserRole;
