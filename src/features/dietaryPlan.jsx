import { useState } from "react";
import "../styles/features/dietaryPlan.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FirstLetters from "../utils/FirstLetters";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import { useDietaryPlanQuery } from "../redux/services/dietaryPlanApi";
import meal1 from "../assets/images/meal1.png";
import meal2 from "../assets/images/meal2.png";
import meal3 from "../assets/images/meal3.png";
import meal4 from "../assets/images/meal4.png";
import meal5 from "../assets/images/meal5.png";
import meal6 from "../assets/images/meal6.png";
import meal7 from "../assets/images/meal7.png";
import meal8 from "../assets/images/meal8.png";
import meal9 from "../assets/images/meal9.png";
import meal10 from "../assets/images/meal10.png";
import meal11 from "../assets/images/meal11.png";
import meal12 from "../assets/images/meal12.png";
import meal13 from "../assets/images/meal13.png";
import meal14 from "../assets/images/meal14.png";
import meal15 from "../assets/images/meal15.png";
import { FilterIcon } from "../utils/svg";

const DietaryPlan = () => {
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();
  const [activeTab, setActiveTab] = useState("ALL");

  const { data: dietaryPlanData } = useDietaryPlanQuery({
    foodType: "",
    pageNumber: 1,
    pageSize: 1000,
    type: activeTab === "ALL" ? "" : activeTab,
  });

  console.log("Dietary Plan Data:", dietaryPlanData);

  const mealImages = [
    meal1,
    meal2,
    meal3,
    meal4,
    meal5,
    meal6,
    meal7,
    meal8,
    meal9,
    meal10,
    meal11,
    meal12,
    meal13,
    meal14,
    meal15,
  ];

  const tabs = ["ALL", "LOOSE_WEIGHT", "MAINTAIN_WEIGHT", "GAIN_WEIGHT"];

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444" animation="wave">
      <div className="dietary-plan-container">
        <div className="dashboard-nav">
          <div className="dashboard-header">
            <p className="header-text">Dietary Plan</p>
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

        <div className="dietary-plan-content">
          <div className="dietary-plan-header">
            <p className="dietary-plan-title">
              Curated Dishes Based on Your Goals
            </p>
          </div>

          <div className="dietary-plan-tabs-container">
            <div className="dietary-plan-tabs">
              {tabs.map((tab) => (
                <div
                  key={tab}
                  className={`tab-button ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab
                    .replace("_", " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </div>
              ))}
            </div>

            <div>
              <div className="filter-button">
                <FilterIcon className="filter-icon" />
                <p className="filter-text">Filter</p>
              </div>
            </div>
          </div>

          <div className="dietary-plan-list">
            {dietaryPlanData?.content?.map((meal, index) => (
              <div key={index} className="meal-card">
                <img
                  className="meal-image"
                  loading="lazy"
                  src={mealImages[index % mealImages?.length]}
                  alt={`Meal ${index + 1}`}
                />

                <div className="meal-details">
                  <p className="meal-name">
                    {meal?.foodType
                      .replace("_", " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
                    |{" "}
                    {meal?.type
                      .replace("_", " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </p>
                  <p className="meal-description">{meal?.description}</p>
                  <em className="meal-nutrition">
                    {meal?.carlories} Kcal / {meal.protein} Protein /{" "}
                    {meal?.carbs} Carbs / {meal?.fat} Fats{" "}
                  </em>
                </div>
              </div>
            ))}
          </div>

          {dietaryPlanData?.data?.length === 0 && (
            <div className="no-meals-message">
              <p>No meals available for this category.</p>
            </div>
          )}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default DietaryPlan;
