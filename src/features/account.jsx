import { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../styles/features/account.scss";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import FirstLetters from "../utils/FirstLetters";
import Membership from "../pages/membership";

const Account = () => {
  const {
    data: uProfileData,
    isLoading: uLoadingData,
    refetch,
  } = useUserProfileQuery();

  useEffect(() => {
    refetch();
  });
  const personalDetails = [
    { label: "Name", value: uProfileData?.fullName },
    { label: "Email", value: uProfileData?.email },
    { label: "Gender", value: uProfileData?.gender },
    { label: "Age", value: uProfileData?.age },
  ];

  const fitnessDetails = [
    { label: "Height", value: uProfileData?.height },
    { label: "Weight", value: uProfileData?.weight },
    { label: "Fitness Goal", value: uProfileData?.fitnessGoal },
    { label: "Dietary Preference", value: uProfileData?.dietaryPreference },
  ];

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444">
      <div className="account-container">
        <div className="dashboard-nav">
          <div className="dashboard-header">
            <p className="header-text">Profile</p>
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

        <div className="account-main">
          <div className="user-profile">
            <FirstLetters
              name={uProfileData?.fullName || "N/A"}
              className="account-initials"
            />
            <p className="user-name">
              <span style={{ fontWeight: 600, fontSize: 20 }}>
                {uLoadingData ? <Skeleton /> : uProfileData?.fullName || "N/A"}
              </span>
              <br />
              <span style={{ opacity: 0.7, fontSize: 18 }}>
                {uLoadingData ? <Skeleton /> : uProfileData?.email || "N/A"}
              </span>{" "}
              <br />{" "}
              <span>
                Current Trainer:{" "}
                {uLoadingData ? (
                  <Skeleton />
                ) : (
                  uProfileData?.trainer?.fullName || "N/A"
                )}
              </span>{" "}
            </p>
          </div>

          <div className="account-payment">
            <Membership />
          </div>

          <div className="user-details">
            <div className="personal">
              <h3>Personal Details</h3>
              <div className="details-grid">
                {uLoadingData ? (
                  <Skeleton count={4} />
                ) : (
                  personalDetails.map(({ label, value }) => (
                    <div className="detail-row" key={label}>
                      <p className="label">{label}</p>
                      <p className="value">{value || "N/A"}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="body-fitness">
              <h3>Fitness & Body Information</h3>
              <div className="details-grid">
                {uLoadingData ? (
                  <Skeleton count={4} />
                ) : (
                  fitnessDetails.map(({ label, value }) => (
                    <div className="detail-row" key={label}>
                      <p className="label">{label}</p>
                      <p className="value">{value || "N/A"}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Account;
