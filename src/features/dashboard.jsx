import "../styles/features/dashboard.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { MachoIcon, BmiIcon, WeightIcon, CaloriesIcon } from "../svg";
import { useDashboardQuery } from "../redux/services/DashboardApi";

const Dashboard = () => {
  const { data: userData, error, isLoading } = useDashboardQuery();
  console.log(error, "ok");

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

        <div className="user-progress">
          <div className="progress-item">
            <MachoIcon />

            {isLoading ? (
              <Skeleton count={4} />
            ) : (
              <p className="progress-data">
                {userData?.workoutProgress ?? "No workout data"}%
              </p>
            )}

            <p>Workout Progress</p>
          </div>

          <div className="progress-item">
            <CaloriesIcon />
            {isLoading ? (
              <Skeleton count={4} />
            ) : (
              <p className="progress-data">
                {userData?.caloriesBurned ?? "No calories data"}cal
              </p>
            )}
            <p>Calories Burn </p>
          </div>

          <div className="progress-item">
            <BmiIcon />
            {isLoading ? (
              <Skeleton count={4} />
            ) : (
              <p className="progress-data">{userData?.bmi ?? "No BMI data"} </p>
            )}
            <p>BMI - Normaal </p>
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
            <p>Weight </p>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Dashboard;
