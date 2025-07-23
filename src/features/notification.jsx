import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import FirstLetters from "../utils/FirstLetters";
import "../styles/features/notification.scss";
import { NoteIcon, NotificationIcon } from "../utils/svg";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import { AddIcon } from "../utils/svg";

const Notification = () => {
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444" animation="wave">
      <div className="notification-container">
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

        <div className="notification-wrapper">
          <div>
            <p className="notification-heading">Notification</p>
          </div>

          <div className="notification-welcome">
            <div>
              <NoteIcon />
              <p>No Notification Created Yet</p>
              <p>Kickstart by creating one</p>

              <Link to="/createEmail" className="createEmailIcon">
                <CustomButton>
                  Create <AddIcon  className="addIcon" />
                </CustomButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Notification;
