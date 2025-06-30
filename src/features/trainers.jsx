import { useState } from "react";
import "../styles/features/trainers.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import CustomButton from "../components/CustomButton";
import FirstLetters from "../utilis/FirstLetters";
import SearchInput from "../components/SearchInput";
import { useTrainersQuery } from "../redux/services/trainersApi";
import { StarIcon } from "../svg";
import { Link } from "react-router-dom";
import trainer1 from "../assets/images/smallTrainer1.png";
import trainer2 from "../assets/images/smallTrainer2.png";
import trainer3 from "../assets/images/smallTrainer3.png";
import trainer4 from "../assets/images/trainer6.png";
import trainer5 from "../assets/images/smallTrainer5.png";
import trainer6 from "../assets/images/smallTrainer6.png";
import trainer7 from "../assets/images/smallTrainer7.png";
import trainer8 from "../assets/images/smallTrainer8.png";
import trainer9 from "../assets/images/smallTrainer3.png";

const Trainers = () => {
  const [searchTrainer, setSearchTrainer] = useState("");
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();
  const { data: trainersData, isLoading } = useTrainersQuery({
    pageNumber: 1,
    pageSize: 10,
    searchQuery: "",
  });

  const trainersImages = [
    trainer1,
    trainer2,
    trainer3,
    trainer4,
    trainer5,
    trainer6,
    trainer7,
    trainer8,
    trainer9,
  ];

  const handleSearch = (query) => {
    setSearchTrainer(query.toLowerCase());
  };

  const filteredTrainers = trainersData?.content?.filter((trainer) => {
    const nameMatch = trainer.fullName.toLowerCase().includes(searchTrainer);
    const specialityMatch = trainer.speciality
      ?.toLowerCase()
      .includes(searchTrainer);
    return nameMatch || specialityMatch;
  });

  return (
    <SkeletonTheme baseColor="#2C2C2C"  animation="wave">
      {" "}
      <div className="trainers-container">
        <div className="dashboard-nav">
          <div className="dashboard-header">
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
          <div className="">
            <p className="trainer-heading">Meet your Fitness Trainers</p>
            <SearchInput onSearch={handleSearch} />
          </div>

          <div className="trainers-cards">
            {isLoading ? (
              Array(9)
                .fill(null)
                .map((_, index) => (
                  <div className="trainer" key={index}>
                    <Skeleton width={100} height={100} />
                    <Skeleton width={100} height={15} />
                    <Skeleton width={80} height={15} />
                    <Skeleton width={60} height={15} />
                  </div>
                ))
            ) : filteredTrainers?.length === 0 ? (
              <p className="no-results">No trainers match your search.</p>
            ) : (
              filteredTrainers?.slice(0, 9)?.map((trainer, index) => (
                <div className="trainer" key={trainer.id}>
                  <div className="trainer-image-wrapper">
                    <img
                      className="trainer-images"
                      src={trainersImages[index % trainersImages.length]}
                      alt="Trainer"
                    />
                  </div>

                  <div className="rtrainer-name">
                    <div>
                      <p className="fullname">{trainer?.fullName}</p>
                      <p className="speciality">
                        {
                          trainer?.speciality
                            ?.split("-")
                            .map((s) => s.trim())
                            .filter((s) => s)[0]
                        }
                      </p>
                    </div>

                    <div className="rating">
                      <StarIcon />
                      {trainer?.rating}
                    </div>
                  </div>

                  <CustomButton className="profile-btn" to="">
                    View Profile
                  </CustomButton>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Trainers;
