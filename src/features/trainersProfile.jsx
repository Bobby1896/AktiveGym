import { CalenderIcon, LocationIcon, CertificateIcon } from "../utils/svg";
import { Link, useParams, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import { useGetTrainerByIdQuery } from "../redux/services/trainersApi";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/features/trainersProfile.scss";
import FirstLetters from "../utils/FirstLetters";
import CustomButton from "../components/CustomButton";
import { useAssignTrainerMutation } from "../redux/services/assignTrainerApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TrainersProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const { image } = location.state || {};

  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();
  const { data: trainersData, isLoading } = useGetTrainerByIdQuery({ id });
  const [assignTrainer, { isLoading: isLoadingAssignT }] =
    useAssignTrainerMutation();

  const navigate = useNavigate();

  const handleAssignSubmit = async () => {
    try {
      await assignTrainer({ trainerId: id }).unwrap();
      toast.success(
        `Your request for ${trainersData?.fullName} has been received. Our team will connect with you shortly.`
      );
      navigate("/trainers");
    } catch (error) {
      toast.error(error?.data?.error || "Unable to Request Trainer");
    }
  };

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444">
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

      <div className="trainers">
        <div>
          <p className="trainer-heading">Profile</p>
        </div>

        <div className="trainers-profile">
          {isLoading ? (
            <Skeleton width={100} height={100} />
          ) : (
            <div className="trainer-img">
              {image && <img src={image} alt="Trainer" />}
            </div>
          )}

          <div className="trainer-details">
            <>
              {isLoading ? (
                <Skeleton count={2} />
              ) : (
                <p className="trainer-fullName">
                  {trainersData?.fullName} <br />{" "}
                  <span className="trainer-x">
                    {trainersData?.role} - {trainersData?.yearsOfExperience}{" "}
                    Years of Experience
                  </span>
                </p>
              )}

              <em className="trainer-desc">
                {" "}
                {isLoading ? <Skeleton /> : trainersData?.description}{" "}
              </em>

              <div>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <p className="trainer-text">Speciality</p>
                )}
                <ul className="trainer-specialities">
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    trainersData?.speciality
                      ?.split("-")
                      ?.map((item) => item.trim())
                      ?.filter((item) => item)
                      ?.map((item, index) => <li key={index}>{item}</li>)
                  )}
                </ul>
              </div>

              <div className="trainer-icons">
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <div className="stats">
                    <LocationIcon />
                    <p>Available for in-gym sessions</p>
                  </div>
                )}

                {isLoading ? (
                  <Skeleton />
                ) : (
                  <div className="stats">
                    <CalenderIcon />
                    <p>{trainersData?.availablePeriod}</p>
                  </div>
                )}

                {isLoading ? (
                  <Skeleton />
                ) : (
                  <div className="stats">
                    <CertificateIcon />
                    <p>{trainersData?.certification}</p>
                  </div>
                )}
              </div>
            </>

            {isLoading ? (
              <Skeleton />
            ) : (
              <div className="request-btn">
                <CustomButton
                  type="submit"
                  onClick={handleAssignSubmit}
                  disabled={isLoadingAssignT}
                >
                  {isLoadingAssignT ? "Processsing..." : " Request Trainer"}
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default TrainersProfile;
