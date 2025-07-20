import { useLocation } from "react-router-dom";
import "../styles/features/dietaryDetails.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaArrowLeft } from "react-icons/fa";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import { Link } from "react-router-dom";
import FirstLetters from "../utils/FirstLetters";
import {
  EatIcon,
  FoodIcon,
  HealthIcon,
  SpiceIcon,
  TimeIcon,
} from "../utils/svg";

const DietaryDetails = () => {
  const location = useLocation();
  const {
    mealImage,
    mealName,
    mealType,
    mealCalories,
    mealCarbs,
    mealFat,
    mealProtein,
    mealDirection,
    mealTools,
    mealNote,
    mealPrepTime,
    mealEatTime,
    mealScore,
    mealIngredients,
  } = location.state || {};
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();

  const nutrients = [
    { label: "Calories", value: mealCalories, unit: "kcal" },
    { label: "Protein", value: mealProtein, unit: "g" },
    { label: "Carbs", value: mealCarbs, unit: "g" },
    { label: "Fat", value: mealFat, unit: "g" },
  ];

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444" animation="wave">
      <div className="dietaryDetails-container">
        <div className="trainers-nav">
          <div className="trainer-header">
            <Link to="/dietaryPlan">
              <FaArrowLeft className="back-icon" />
            </Link>
            <p className="header-text">Dish Menu</p>
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

        <div className="dishes-details">
          <div className="dishes-section">
            <div className="dish-left-section">
              <div className="dish-meal">
                <div>
                  {mealImage && (
                    <img src={mealImage} alt="Dishes" className="dishes-img" />
                  )}
                </div>

                <div className="dish-side-details">
                  <div>
                    {mealType ? (
                      <p className="dish-type">
                        {mealType
                          ?.split("-")
                          .map((s) => s.trim())
                          .filter((s) => s)[0]
                          .replace("_", " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div>
                    {mealName ? <p className="dish-name">{mealName}</p> : " "}
                  </div>

                  {mealDirection ? (
                    <p className="dish-desc">{mealDirection}</p>
                  ) : (
                    ""
                  )}

                  <div className="dish-prep-wrapper">
                    <div className="dish-prep">
                      <div className="icon-circle">
                        <TimeIcon />
                      </div>
                      <div className="dish-prep-text">
                        <p className="dish-time-label">Prep Time</p>
                        {mealPrepTime && (
                          <p className="dish-time-value">{mealPrepTime} mins</p>
                        )}
                      </div>
                    </div>

                    <div className="dish-prep">
                      <div className="icon-circle">
                        <EatIcon />
                      </div>
                      <div className="dish-prep-text">
                        <p className="dish-time-label">Eat Time</p>
                        {mealEatTime && (
                          <p className="dish-time-value">{mealEatTime}:00 AM</p>
                        )}
                      </div>
                    </div>

                    <div className="dish-prep">
                      <div className="icon-circle">
                        <HealthIcon />
                      </div>
                      <div className="dish-prep-text">
                        <p className="dish-time-label">Health Score</p>
                        {mealScore && (
                          <p className="dish-time-value">{mealScore}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="direction-tools">
                <div className="direction-col">
                  <p className="section-header">Directions</p>
                  <ul>
                    {mealDirection?.split(/[,;]+/).map((step, index) => (
                      <li key={index}>
                        <div className="step-icon">{index + 1}</div>
                        <span className="step-text">
                          {step.trim().charAt(0).toUpperCase() +
                            step.trim().slice(1)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tools-col">
                  <p className="section-header">Tool and Equipments</p>
                  <ul>
                    {mealTools?.split(/[,;]+/).map((tool, index) => (
                      <li key={index}>
                        <div className="tool-icon">
                          <FoodIcon />
                        </div>
                        <span className="tool-text">
                          {tool.trim().charAt(0).toUpperCase() +
                            tool.trim().slice(1)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="note-col">
                <p className="section-header">Notes</p>
                <ul>
                  {mealNote?.split(",").map((step, index) => (
                    <li key={index}>
                      <div className="step-icon">{index + 1}</div>
                      <span className="step-text">
                        {step.trim().charAt(0).toUpperCase() +
                          step.trim().slice(1)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="dish-values-container">
              <div className="dish-nutrient">
                {nutrients.map(({ label, value, unit }) => (
                  <div className="nutrient-item" key={label}>
                    <p className="nutrient-label">{label}</p>
                    <div className="dish-values">
                      <p className="nutrient-value">{value}</p>
                      <p className="nutrient-unit">{unit}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="ingredient-col">
                <p className="section-header">Ingredients</p>
                <ul>
                  {mealIngredients?.split(",").map((tool, index) => (
                    <li key={index}>
                      <div className="tool-icon">
                        <SpiceIcon />
                      </div>
                      <span className="tool-text">
                        {tool.trim().charAt(0).toUpperCase() +
                          tool.trim().slice(1)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="facts-col">
                <p className="section-header" >Nutrition Facts</p>

                <div className="fact-wrapper">
                  {nutrients.map(({ label, value, unit }) => (
                    <div className="fact-details" key={label}>
                      <p className="fact-label">{label}</p>
                      <div className="fact-points">
                        <p className="fact-value">{value}</p>
                        <p className="fact-unit">{unit}</p>
                      </div>
                       
                
                    </div>
                    
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default DietaryDetails;
