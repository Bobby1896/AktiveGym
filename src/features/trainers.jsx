import { useState } from "react";
import "../styles/features/trainers.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import CustomButton from "../components/CustomButton";
import FirstLetters from "../utils/FirstLetters";
import SearchInput from "../components/SearchInput";
import { useTrainersQuery } from "../redux/services/trainersApi";
import { StarIcon } from "../utils/svg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteTrainerMutation } from "../redux/services/trainersApi";
import { AddIcon } from "../utils/svg";
import BasicTable from "../components/BasicTable";
import { formatDate } from "../utils/DateFormat";
import BasicModal from "../components/BasicModal";
import DeleteIcon from "@mui/icons-material/Delete";
import trainer1 from "../assets/images/smallTrainer1.png";
import trainer2 from "../assets/images/smallTrainer2.png";
import trainer3 from "../assets/images/smallTrainer3.png";
import trainer4 from "../assets/images/trainer6.png";
import trainer5 from "../assets/images/smallTrainer5.png";
import trainer6 from "../assets/images/smallTrainer6.png";
import trainer7 from "../assets/images/smallTrainer7.png";
import trainer8 from "../assets/images/smallTrainer8.png";
import trainer9 from "../assets/images/smallTrainer3.png";
import useUserRole from "../utils/roles";

const Trainers = () => {
  const { isAdmin, isUser } = useUserRole();
  const [searchTrainer, setSearchTrainer] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();
  const {
    data: trainersData,
    isLoading,
    refetch,
  } = useTrainersQuery({
    pageNumber: 1,
    pageSize: 10000, 
    searchQuery: "",
    category: activeTab,
  });
  const [deleteTrainer] = useDeleteTrainerMutation();

  const trainersImages = [
    trainer1,
    trainer2,
    trainer3,
    trainer4,
    trainer5,
    trainer6,
    trainer7,
    trainer8,
    trainer9,
  ];

  const handleSearch = (query) => {
    setSearchTrainer(query.toLowerCase());
  };

  const handleDeleteUser = async (user) => {
    try {
      await deleteTrainer({ id: user.id }).unwrap();
      setOpenModal(false);
      toast.success(`Trainer ${user.fullName} deleted successfully!`);
      refetch();
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

  const columns = [
    {
      name: "fullName",
      label: "Full Name",
      options: {
        setCellProps: () => ({
          style: { width: "250px" },
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
          style: { width: "250px" },
        }),
      },
    },
    {
      name: "createdAt",
      label: "Date Joined",

      options: {
        customBodyRender: (value) => formatDate(value),
        setCellProps: () => ({ style: { width: "150px" } }),
      },
    },
    {
      name: "speciality",
      label: "Field",
      options: {
        customBodyRender: (value) => value || "Not Specified",
        setCellProps: () => ({
          style: { width: "150px" },
        }),
      },
    },

    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          const normalized = String(value).toLowerCase();
          const isActive = normalized === "active";
          const displayText = isActive ? "Active" : "Inactive";

          const cellStyle = {
            backgroundColor: isActive ? "#D0FED5" : "#7f1d1d", // green | red
            color: isActive ? "#1A85C8" : "#ffffff",
            borderRadius: "15px",
            padding: "10px 40px",
            display: "inline-block",
            textTransform: "capitalize",
          };
          return <span style={cellStyle}>{displayText}</span>;
        },
        setCellProps: () => ({ style: { width: "100px" } }),
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
        setCellProps: () => ({ style: { width: "50px" } }),
      },
    },
  ];

  const rawData = trainersData?.content || [];
  const data = rawData
    .filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchTrainer)
      )
    )
    .map((row, index) => ({ id: index, ...row }));

  const filteredTrainers =
    trainersData?.content?.filter((trainer) =>
      Object.values(trainer).some((val) =>
        String(val).toLowerCase().includes(searchTrainer)
      )
    ) || [];

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444" animation="wave">
      {" "}
      <div className="trainers-container">
        <div className="dashboard-nav">
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

        <div className="trainers">
          <div className="">
            <p className="trainer-heading">
              {isAdmin ? "List of All Trainers" : " Meet your Fitness Trainers"}
            </p>
            <SearchInput
              placeholder="Search for trainers"
              onSearch={handleSearch}
            />
          </div>

          {isUser && (
            <>
              <div className="trainers-cards">
                {isLoading ? (
                  Array(9)
                    .fill(null)
                    .map((_, index) => (
                      <div className="trainer" key={index}>
                        <Skeleton width={100} height={100} />
                        <Skeleton width={100} height={15} />
                        <Skeleton width={80} height={15} />
                        <Skeleton width={60} height={15} />
                      </div>
                    ))
                ) : filteredTrainers?.length === 0 ? (
                  <p className="no-results">No trainers match your search.</p>
                ) : (
                  filteredTrainers?.map((trainer, index) => (
                    <div className="trainer" key={trainer.id}>
                      <div className="trainer-image-wrapper">
                        <img
                          className="trainer-images"
                          src={trainersImages[index % trainersImages.length]}
                          alt="Trainer"
                        />
                      </div>

                      <div className="rtrainer-name">
                        <div>
                          <p className="fullname">{trainer?.fullName}</p>
                          <p className="speciality">
                            {
                              trainer?.role
                                ?.split("-")
                                .map((s) => s.trim())
                                .filter((s) => s)[0]
                            }
                          </p>
                        </div>

                        <div className="rating">
                          <StarIcon />
                          {trainer?.rating}
                        </div>
                      </div>

                      <Link
                        to={`/trainersProfile/${trainer?.id}`}
                        state={{
                          trainer: trainer,
                          image: trainersImages[index % trainersImages.length],
                        }}
                      >
                        <CustomButton className="profile-btn">
                          View Profile
                        </CustomButton>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {isAdmin && (
            <>
              <div className="tabs-and-add">
                <div className="tabs">
                  {["ALL", "NEW", "PAST"].map((tab) => (
                    <div
                      key={tab}
                      className={`tab-button ${
                        activeTab === tab ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveTab(tab);
                        setSearchTrainer("");
                      }}
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
              <div>
                <BasicTable data={data} columns={columns} />
              </div>{" "}
            </>
          )}
        </div>
      </div>
      {openModal && (
        <BasicModal
          isOpen={openModal}
          title={`Are you sure you want to delete ${selectedUser?.fullName}?`}
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

export default Trainers;
