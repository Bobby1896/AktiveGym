import { useLocation, Link } from "react-router-dom";
import "../styles/features/workoutExercises.jsx";
import { FaArrowLeft } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FirstLetters from "../utils/FirstLetters";
import { useUserProfileQuery } from "../redux/services/userProfileApi.jsx";
import { useWorkOutQuery } from "../redux/services/workOutApi.jsx";

const WorkoutExercises = () => {
  const { state } = useLocation();
  const type = state?.type;

  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();
  const { data: workoutData, isLoading: loadingWorkoutData } =
    useWorkOutQuery(type);

  console.log(workoutData, uProfileData, "okay");

  return (
    <div className="exercises-container">
      <div className="trainers-nav">
        <div className="trainer-header">
          <Link to="/workoutPlan">
            <FaArrowLeft className="back-icon" />
          </Link>
          <p className="header-text">{state?.workout}</p>
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

      <div className="exercise-wrapper">
        {loadingWorkoutData ? (
          <Skeleton count={5} />
        ) : (
          workoutData?.map((exercise, idx) => (
            <div key={idx} className="exercise-card">
              <p>{exercise?.name}</p>
              <p>{exercise?.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkoutExercises;
