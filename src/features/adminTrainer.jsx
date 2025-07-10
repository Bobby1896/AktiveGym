import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/features/userManagement.scss";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import FirstLetters from "../utils/FirstLetters";
import BasicTable from "../components/BasicTable";
import { useUsersListQuery } from "../redux/services/usersListApi";
import { formatDate } from "../utils/DateFormat";
import SearchInput from "../components/SearchInput";
import { useState } from "react";

const AdminTrainer = () => {
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();
  const { data: userData, isLoading: loadingUserData } = useUsersListQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const columns = [
    {
      name: "name",
      label: "Full Name",
      options: {
        setCellProps: () => ({
          style: { width: "200px" },
        }),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        setCellProps: () => ({
          style: { width: "300px" },
        }),
      },
    },
    {
      name: "dateJoined",
      label: "Date Joined",

      options: {
        customBodyRender: (value) => formatDate(value),
        setCellProps: () => ({}),
      },
    },
    { name: "gender", label: "Gender" },
    { name: "age", label: "Age" },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          const isActive = String(value).toLowerCase() === "active";
          const cellStyle = {
            backgroundColor: isActive ? "#D0FED5" : "#7f1d1d", // green | red
            color: "#1A85C8",
            borderRadius: "15px",
            padding: "10px 40px",
            display: "inline-block",
            textTransform: "capitalize",
          };
          return <span style={cellStyle}>{value}</span>;
        },
        setCellProps: () => ({ style: { width: "50px" } }),
      },
    },
  ];

  const rawData = userData?.content || [];
  const data = rawData
    .filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchTerm)
      )
    )
    .map((row, index) => ({ id: index, ...row }));

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444" animation="wave">
      <div className="users-container">
        <div className="dashboard-nav">
          <div className="dashboard-header">
            <p className="header-text">User Management</p>
          </div>

          <div className="name-initials">
            {uLoadingData ? (
              <>
                <Skeleton circle width={40} height={40} />
                <Skeleton width={120} height={15} style={{ marginTop: 10 }} />
              </>
            ) : (
              <>
                <FirstLetters
                  name={uProfileData?.fullName}
                  className="initials"
                />
                <p>{uProfileData?.fullName}</p>
              </>
            )}
          </div>
        </div>

        {loadingUserData ? (
          <Skeleton count={20} />
        ) : (
          <div className="users-table-wrapper">
            <div className="user-header">
              <p className="trainer-heading">List of all trainers</p>
              <SearchInput
                placeholder="Search for Trainers"
                onSearch={handleSearch}
              />
            </div>

            <BasicTable data={data} columns={columns} />
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

export default AdminTrainer;
