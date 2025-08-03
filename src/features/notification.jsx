import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import FirstLetters from "../utils/FirstLetters";
import "../styles/features/notification.scss";
import { EditIcon, NoteIcon, NotificationIcon } from "../utils/svg";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";
import { AddIcon } from "../utils/svg";
import BasicTable from "../components/BasicTable";
import { useGetAllNotificationEmailQuery } from "../redux/services/notificationEmailApi";
import { formatDate } from "../utils/DateFormat";
import SearchInput from "../components/SearchInput";

const Notification = () => {
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();
  const { data: emailData } = useGetAllNotificationEmailQuery();
  const [searchEmail, setSearchEmail] = useState("");

  const handleSearch = (value) => {
    setSearchEmail(value.toLowerCase());
  };

  const columns = [
    {
      name: "subject",
      label: "Title",
      options: {
        setCellProps: () => ({
          style: { width: "200px" },
        }),
      },
    },

    {
      name: "createdAt",
      label: "Date Created",

      options: {
        customBodyRender: (value) => formatDate(value),
        setCellProps: () => ({
          style: { width: "200px" },
        }),
      },
    },
    {
      name: "notificationType",
      label: "Notification Type",
      options: {
        customBodyRender: (value) => value || "N/A",
        setCellProps: () => ({
          style: { width: "300px" },
        }),
      },
    },

    {
      label: "Actions",
      name: "actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const emailId = data[rowIndex]?.id;

          return (
            <Link to={`/createEmail?id=${emailId}`}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                title="View Email"
              >
                <EditIcon className="del-trainer" />
              </button>
            </Link>
          );
        },
        setCellProps: () => ({ style: { width: "50px" } }),
      },
    },
  ];

  const rawData = emailData?.content || [];
  const data = rawData
    .filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchEmail)
      )
    )
    .map((row, index) => ({ id: index, ...row }));

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444" animation="wave">
      <div className="notification-container">
        <div className="note-nav">
          <div className="dashboard-header">
            <p className="header-text">Trainers</p>
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

        {emailData?.length === 0 ? (
          <div className="notification-wrapper">
            <div>
              <p className="notification-heading">Notification</p>
            </div>

            <div className="notification-welcome">
              <div>
                <div className="notification">
                  <NoteIcon />
                  <p className="notification-sub">
                    No Notification Created Yet
                  </p>
                  <p>Kickstart by creating one</p>
                </div>

                <Link to="/createEmail" className="createEmailIcon">
                  <CustomButton size="large">
                    <span className="create-text">Create</span>{" "}
                    <AddIcon className="addIcon" />
                  </CustomButton>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="users-table-wrapper">
            <div className="user-header">
              <p className="trainer-heading">List of all Notification</p>

              <div className="search-add">
                <SearchInput
                  placeholder="Search for Notification by Title"
                  onSearch={handleSearch}
                />
                <div>
                  <Link className="add-trainer-button" to="/createEmail">
                    <p>Create Email</p>
                    <AddIcon />
                  </Link>
                </div>
              </div>
            </div>

            <BasicTable data={data} columns={columns} />
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

export default Notification;
