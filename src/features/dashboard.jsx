import "../styles/features/dashboard.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  MachoIcon,
  BmiIcon,
  WeightIcon,
  CaloriesIcon,
  CalenderIcon,
  LocationIcon,
} from "../svg";
import { useDashboardQuery } from "../redux/services/DashboardApi";
import { Link } from "react-router-dom";
import { StarIcon } from "../svg";
import { useRecommendedTrainerQuery } from "../redux/services/recommendedTrainerApi";
import trainer1 from "../assets/images/smallTrainer1.png";
import trainer2 from "../assets/images/smallTrainer2.png";
import trainer3 from "../assets/images/smallTrainer3.png";
import trainer4 from "../assets/images/smallTrainer2.png";
import CustomButton from "../components/CustomButton";

const Dashboard = () => {
  const { data: userData, isLoading: isLoadingData } = useDashboardQuery();
  const { data: rTrainerData, isLoading } = useRecommendedTrainerQuery();

  const trainerImages = [trainer1, trainer2, trainer3, trainer4];

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="red">
      <div className="dashboard-container">
        <div className="dashboard-nav">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
          </div>

          <div className="name-initials">
            <p className="initials">{"22"}</p>
            <p>{"Stella Sarah"}</p>
          </div>
        </div>

        <section className="user-progress">
          <div className="progress-item">
            <MachoIcon />

            {isLoadingData ? (
              <Skeleton count={4} />
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
              <Skeleton count={4} />
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
              <Skeleton count={4} />
            ) : (
              <p className="progress-data">{userData?.bmi ?? "No BMI data"} </p>
            )}
            <p className="user-desc">BMI - Normaal </p>
          </div>

          <div className="progress-item">
            <WeightIcon />
            {isLoading ? (
              <Skeleton count={4} />
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
                    <img
                      className="rec-images"
                      src={trainerImages[index]}
                      alt={trainer.fullName}
                    />

                    <div className="rtrainer-name">
                      <div>
                        <p className="rec-fullname">{trainer.fullName} </p>
                        <p className="rec-speciality">{trainer.speciality} </p>
                      </div>

                      <div className="rating">
                        <StarIcon />
                        {trainer.rating}
                      </div>
                    </div>

                    <CustomButton to="">View Profile</CustomButton>
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

            <div className="membership-card">
              <img
                src="src/assets/images/Member Card.png"
                alt="Membership Card"
              />
              <p className="gymId">
                GYM ID: <br /> <span style={{fontWeight: 600}}>{"12389398"}</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </SkeletonTheme>
  );
};

export default Dashboard;
