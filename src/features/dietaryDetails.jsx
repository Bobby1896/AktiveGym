import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaArrowLeft } from "react-icons/fa";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import { Link } from "react-router-dom";
import FirstLetters from "../utils/FirstLetters";

const DietaryDetails = () => {
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444" animation="wave">
      <div className="dietaryDetails-container">
        <div className="trainers-nav">
          <div className="trainer-header">
            <Link to="/trainers">
              <FaArrowLeft className="back-icon" />
            </Link>
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
      </div>
    </SkeletonTheme>
  );
};

export default DietaryDetails;
