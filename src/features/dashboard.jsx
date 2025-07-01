import "../styles/features/dashboard.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MachoIcon,
  BmiIcon,
  WeightIcon,
  CaloriesIcon,
  CalenderIcon,
  LocationIcon,
  StarIcon,
} from "../svg";
import { useDashboardQuery } from "../redux/services/DashboardApi";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import { Link } from "react-router-dom";
import { useRecommendedTrainerQuery } from "../redux/services/recommendedTrainerApi";
import trainer1 from "../assets/images/smallTrainer1.png";
import trainer2 from "../assets/images/smallTrainer2.png";
import trainer3 from "../assets/images/smallTrainer3.png";
import trainer4 from "../assets/images/trainer6.png";
import food1 from "../assets/images/smallFood1.png";
import food2 from "../assets/images/smallFood2.png";
import food3 from "../assets/images/smallFood3.png";
import CustomButton from "../components/CustomButton";
import FirstLetters from "../utils/FirstLetters";

const Dashboard = () => {
  const { data: userData, isLoading: isLoadingData } = useDashboardQuery();
  const { data: rTrainerData, isLoading: isLoadingRData } =
    useRecommendedTrainerQuery();
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();

  const trainerImages = [trainer1, trainer2, trainer3, trainer4];
  const foodImages = [food1, food2, food3];

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444" animation="wave">
      <div className="dashboard-container">
        <div className="dashboard-nav">
          <div className="dashboard-header">
            <p className="header-text">Dashboard</p>
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

        <section className="user-progress">
          <div className="progress-item">
            <MachoIcon />

            {isLoadingData ? (
              <Skeleton count={2} />
            ) : (
              <p className="progress-data">
                {userData?.workoutProgress ?? "No workout data"}%
              </p>
            )}

            <p className="user-desc">Workout Progress</p>
          </div>

          <div className="progress-item">
            <CaloriesIcon />
            {isLoadingData ? (
              <Skeleton count={2} />
            ) : (
              <p className="progress-data">
                {userData?.caloriesBurned ?? "No calories data"}cal
              </p>
            )}
            <p className="user-desc">Calories Burn </p>
          </div>

          <div className="progress-item">
            <BmiIcon />
            {isLoadingData ? (
              <Skeleton count={2} />
            ) : (
              <p className="progress-data">{userData?.bmi ?? "No BMI data"} </p>
            )}
            <p className="user-desc">BMI - Normal </p>
          </div>

          <div className="progress-item">
            <WeightIcon />
            {isLoadingRData ? (
              <Skeleton count={2} />
            ) : (
              <p className="progress-data">
                {userData?.weight ?? "No Weight data"}kg
              </p>
            )}
            <p className="user-desc">Weight </p>
          </div>
        </section>

        <section className="second-section">
          <div className="recommendation-sect">
            <div className="recommended-trainer">
              <div className="recommended-header">
                <p className="rec-text">Recommended Trainer</p>

                <Link to="/trainers" className="rec-view">
                  View More
                </Link>
              </div>

              <div className="rtrainer-list">
                {rTrainerData?.slice(0, 4).map((trainer, index) => (
                  <div className="rtrainer" key={trainer.id}>
                    <div className="rec-image-wrapper">
                      <img
                        className="rec-images"
                        src={trainerImages[index]}
                        alt={trainer?.fullName}
                      />
                    </div>

                    <div className="rtrainer-name">
                      <div>
                        {isLoadingRData ? (
                          <>
                            <Skeleton width={100} height={15} />
                            <Skeleton width={80} height={15} />
                          </>
                        ) : (
                          <>
                            <p className="rec-fullname">{trainer?.fullName}</p>
                            <p className="rec-speciality">
                              {
                                trainer?.speciality
                                  ?.split("-")
                                  .map((s) => s.trim())
                                  .filter((s) => s)[0]
                              }
                            </p>
                          </>
                        )}
                      </div>

                      {isLoadingRData ? (
                        <Skeleton width={60} height={15} />
                      ) : (
                        <div className="rating">
                          <StarIcon />
                          {trainer?.rating}
                        </div>
                      )}
                    </div>

                    <Link
                      to={`/trainersProfile/${trainer.id}`}
                      state={{
                        trainer: trainer,
                        image: trainerImages[index % trainerImages.length],
                      }}
                    >
                      <CustomButton className="profile-btn">
                        View Profile
                      </CustomButton>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="rec-food">
              <div className="rec-food-header">
                <p className="rec-text">Recommended Food</p>

                <Link to="/dietaryPlan" className="rec-view">
                  View More
                </Link>
              </div>

              <div className="rfood-list">
                {(isLoadingRData
                  ? Array(3).fill({})
                  : rTrainerData?.slice(0, 3)
                )?.map((trainer, index) => (
                  <div className="rfood" key={index}>
                    <img
                      className="food-rec-images"
                      src={foodImages[index]}
                      alt={trainer?.fullName || "Food"}
                    />

                    <div>
                      {isLoadingRData ? (
                        <>
                          <Skeleton width={100} height={15} />
                          <Skeleton width={80} height={15} />
                        </>
                      ) : (
                        <>
                          <p className="rfood-name">{trainer?.fullName}</p>
                          <p className="rfood-type">
                            {
                              trainer?.speciality
                                ?.split("-")
                                .map((s) => s.trim())
                                .filter((s) => s)[0]
                            }
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="event-section">
            <div className="event-info">
              <p className="event-header">Upcoming Event</p>
              <p className="event-text">Run to Help 2025</p>
              <em className="event-logo">By AktiveGym</em>
            </div>

            <div className="event-details">
              <div className="event-period">
                <CalenderIcon className="event-icon" />
                <div className="event-date">
                  <p className="event-day">
                    Monday, July 7th 2025 <br />
                    <span style={{ fontSize: 16 }}>09:00 AM - 14:00 PM</span>
                  </p>
                </div>
              </div>

              <div className="event-location">
                <LocationIcon />
                <div className="event-site">
                  <p className="event-center">
                    AktiveGym Center
                    <br />
                    <span style={{ fontSize: 16 }}>Manchester</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="membership-card">
              <img
                src="src/assets/images/MemberCard.png"
                alt="Membership Card"
                className="gymId-Icon"
              />
              <p className="gymId">
                GYM ID: <br />{" "}
                {uLoadingData ? (
                  <Skeleton count={1} />
                ) : (
                  <span style={{ fontWeight: 600 }}>
                    {uProfileData?.membershipId}
                  </span>
                )}
              </p>
            </div>
          </div>
        </section>
      </div>
    </SkeletonTheme>
  );
};

export default Dashboard;
