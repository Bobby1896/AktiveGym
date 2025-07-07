import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/features/userManagement.scss";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import FirstLetters from "../utils/FirstLetters";
import BasicTable from "../components/BasicTable";
import { useUsersListQuery } from "../redux/services/usersListApi";
import { formatDate } from "../utils/DateFormat";

const UserManagement = () => {
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();
  const { data: userData } = useUsersListQuery();

  const columns = [
    {
      name: "name",
      label: "Name",
      // options: {
      //   filter: true,
      //   sort: true,
      // },
    },
    {
      name: "email",
      label: "Email",
      // options: {
      //   filter: true,
      //   sort: true,
      // },
    },
    {
      name: "dateJoined",
      label: "Date Joined",
      options: {
        // sort: true,
        customBodyRender: (value) => formatDate(value),
      },
    },
    {
      name: "gender",
      label: "Gender",
      // options: {
      //   filter: false,
      //   sort: false,
      // },
    },
    {
      name: "age",
      label: "Age",
      // options: {
      //   filter: false,
      //   sort: true,
      // },
    },
    {
      name: "status",
      label: "Status",
      // options: {
      //   filter: true,
      //   sort: true,
      // },
    },
  ];

  const data =
    userData?.content?.map((row, index) => ({
      id: index,
      ...row,
    })) || [];

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

        <div>
          <BasicTable
            // title="User List"
            data={data}
            columns={columns}
            options={{
              filter: false,
              sort: false,
              search: false,
              print: false,
              download: false,
              selectableRows: "none",

              viewColumns: false,
            }}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default UserManagement;
