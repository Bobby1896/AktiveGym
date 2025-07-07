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

const UserManagement = () => {
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
          style: { width: "150px" },
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
    { name: "status", label: "Status" },
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
    <SkeletonTheme>
      <div className="users-container">
        <div className="dashboard-nav">
          <div className="dashboard-header">
            <p className="header-text">Trainer</p>
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
              <p className="trainer-heading">Meet your Fitness Trainers</p>
              <SearchInput
                placeholder="Search for User"
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

export default UserManagement;
