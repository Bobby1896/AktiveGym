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
import BasicModal from "../components/BasicModal";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "../components/CustomButton";
import { toast } from "react-toastify";
import { useDeleteTrainerMutation } from "../redux/services/trainersApi";
import { AddIcon } from "../utils/svg";
import { Link } from "react-router-dom";

const AdminTrainer = () => {
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();
  const { data: userData, isLoading: loadingUserData } = useUsersListQuery();
  const [deleteTrainer] = useDeleteTrainerMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("ALL");

  const handleDeleteUser = async (user) => {
    try {
      await deleteTrainer({ id: user.id }).unwrap();
      setOpenModal(false);
      toast.success(`Trainer ${user.name} deleted successfully!`);
      // setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to delete user:", error);
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

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
        filter: false,
        sort: false,
        customBodyRender: (value) => value || "N/A",
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
    {
      name: "speciality",
      label: "Field",
      options: {
        setCellProps: () => ({
          style: { width: "200px" },
        }),
      },
    },

    {
      label: "Actions",
      name: "actions",
      options: {
        customBodyRender: (_, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const user = data[rowIndex];

          return (
            <button
              onClick={() => handleDeleteClick(user)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
              title="Delete User"
            >
              <DeleteIcon className="del-trainer" />
            </button>
          );
        },
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

            <div className="tabs-and-add">
              <div className="tabs">
                {["ALL", "NEW", "PAST"].map((tab) => (
                  <div
                    key={tab}
                    className={`tab-button ${
                      activeTab === tab ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              <div className="add-trainer">
                <div>
                  <Link className="add-trainer-button" to="/addTrainers">
                    <p>Add Trainer</p>
                    <AddIcon />
                  </Link>
                </div>
              </div>
            </div>

            <BasicTable data={data} columns={columns} />
          </div>
        )}
      </div>

      {openModal && (
        <BasicModal
          isOpen={openModal}
          title={`Are you sure you want to delete ${selectedUser?.name}?`}
          onConfirm={() => {
            <CustomButton
              size="large"
              onClick={handleDeleteUser(selectedUser)}
              text="Delete"
            />;
          }}
          onCancel={handleCloseModal}
        />
      )}
    </SkeletonTheme>
  );
};

export default AdminTrainer;
