import { useState, useEffect } from "react";
import "../styles/features/workoutPlan.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import { Link } from "react-router-dom";
import FirstLetters from "../utils/FirstLetters";
import CustomButton from "../components/CustomButton";
import SearchInput from "../components/SearchInput";
import { WorkOutType } from "../utils/plainData";

const WorkoutPlan = () => {
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWorkouts, setFilteredWorkouts] = useState(WorkOutType);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = WorkOutType?.filter((workout) =>
      workout?.name?.toLowerCase()?.includes(query?.toLowerCase())
    );
    setFilteredWorkouts(filtered);
  };

  useEffect(() => {
    if (!searchQuery) {
      setFilteredWorkouts(WorkOutType);
    }
  }, [searchQuery]);

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444">
      <div className="workout-container">
        <div className="dashboard-nav">
          <div className="dashboard-header">
            <p className="header-text">Workout Plan</p>
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

        <div className="workout-wrapper">
          <div className="workout-search">
            <p className="trainer-heading">
              We’ve built your workout plan based on your goals.
            </p>
            <SearchInput onSearch={handleSearch} />
          </div>

          <div className="workout-cards">
            {filteredWorkouts?.map((workout, index) => (
              <div key={index} className="card">
                <img
                  className="workOutImg"
                  src={workout.images}
                  alt="Workout Image Cards"
                />

                <div className="card-content">
                  <p className="trainer-heading">{workout.name}</p>
                  <p className="wp-desc">{workout.description}</p>

                  <Link
                    to={`/workOutExercises/${workout?.type}`}
                    state={{
                      workout: workout?.name,
                      type: workout?.type,
                    }}
                  >
                    <CustomButton className="workout-btn">
                      Start Now
                    </CustomButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default WorkoutPlan;
