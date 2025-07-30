import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/features/workoutExercises.scss";
import { FaArrowLeft } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FirstLetters from "../utils/FirstLetters";
import { useUserProfileQuery } from "../redux/services/userProfileApi.jsx";
import {
  useWorkOutQuery,
  useUpdateWorkoutProgressMutation,
} from "../redux/services/workOutApi.jsx";

const WorkoutExercises = () => {
  const { state } = useLocation();
  const type = state?.type;
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();
  const {
    data: workoutData,
    isLoading: loadingWorkoutData,
    refetch,
  } = useWorkOutQuery(type);
  const [updateWorkoutProgress] = useUpdateWorkoutProgressMutation();

  const [selectedExercises, setSelectedExercises] = useState([]);
  const [formattedExercises, setFormattedExercises] = useState([]);
  const [lastCheckedExercise, setLastCheckedExercise] = useState(null);

  useEffect(() => {
    if (workoutData) {
      const exercises = [];
      const selected = [];

      Object.keys(workoutData).forEach((key) => {
        if (
          typeof workoutData[key] === "boolean" &&
          !key.includes("ImageUrl") &&
          !key.includes("HowToDoIt")
        ) {
          const name = key;
          const imageUrl = workoutData[`${key}ImageUrl`];
          const howToDoIt = workoutData[`${key}HowToDoIt`];
          exercises.push({ name, imageUrl, howToDoIt });

          if (workoutData[key] === true) {
            selected.push({ name, imageUrl, howToDoIt });
          }
        }
      });

      setFormattedExercises(exercises);
      if (selected.length > 0) {
        setSelectedExercises(selected);
        setLastCheckedExercise(selected[selected.length - 1]);
      } else {
        setSelectedExercises([]);
        setLastCheckedExercise(exercises[0]);
      }
    }
  }, [workoutData]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const formatExerciseKey = (name) => {
    return name.replace(/([a-z])([A-Z])/g, "$1_$2").toUpperCase();
  };

  const handleToggleExercise = async (exercise) => {
    const alreadySelected = selectedExercises.find(
      (ex) => ex.name === exercise.name
    );

    const flag = !alreadySelected;

    try {
      await updateWorkoutProgress({
        exercise: formatExerciseKey(exercise?.name),
        flag: flag,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update workout progress:", err);
    }

    if (alreadySelected) {
      if (selectedExercises.length === 1) return;

      const updated = selectedExercises.filter(
        (ex) => ex.name !== exercise.name
      );
      setSelectedExercises(updated);

      if (lastCheckedExercise?.name === exercise.name) {
        setLastCheckedExercise(updated[updated.length - 1] || null);
      }
    } else {
      setSelectedExercises((prev) => [...prev, exercise]);
      setLastCheckedExercise(exercise);
    }
  };

  const formatExerciseName = (name) => {
    return name.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444">
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
          <div className="exercise-card">
            <div className="exercise-gif">
              {lastCheckedExercise && (
                <div className="exercise-detail">
                  <h3>
                    {loadingWorkoutData ? (
                      <Skeleton />
                    ) : (
                      formatExerciseName(lastCheckedExercise.name)
                    )}
                  </h3>
                  {lastCheckedExercise.imageUrl && (
                    <img
                      src={
                        loadingWorkoutData ? (
                          <Skeleton />
                        ) : (
                          lastCheckedExercise.imageUrl.trim()
                        )
                      }
                      alt={lastCheckedExercise.name}
                      className="exercise-img"
                    />
                  )}
                  <p className="exercise-subheading">
                    {" "}
                    {loadingWorkoutData ? <Skeleton /> : "How to do it"}
                  </p>
                  <p className="exercise-text">
                    {loadingWorkoutData ? (
                      <Skeleton />
                    ) : (
                      lastCheckedExercise.howToDoIt
                    )}
                  </p>
                </div>
              )}
            </div>

            {loadingWorkoutData ? (
              <Skeleton count={6} />
            ) : (
              <div className="exercise-checks">
                <h3 style={{ fontSize: 24, fontWeight: 600 }}> Exercises</h3>
                <ol className="exercise-checkbox-list">
                  {formattedExercises.map((exercise, idx) => (
                    <li key={idx}>
                      <span className="exercise-index">{idx + 1}.</span>
                      <span className="exercise-name">
                        {formatExerciseName(exercise.name)}
                      </span>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedExercises.some(
                            (ex) => ex.name === exercise.name
                          )}
                          onChange={() => handleToggleExercise(exercise)}
                        />
                      </label>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default WorkoutExercises;
