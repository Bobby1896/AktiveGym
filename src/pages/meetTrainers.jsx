import "../styles/pages/meetTrainers.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const trainers = [
  {
    name: "TOM ADAM",
    specialization: "Strength & Hypertrophy Specialist",
    experience: "6+ years",
    image: "src/assets/images/trainer6.png",
  },
  {
    name: "JESSICA LARA",
    specialization: "Kickboxing",
    experience: "12+ years",
    image: "src/assets/images/trainer2.png",
  },
  {
    name: "ESTHER SARAH",
    specialization: "Nutrition & Diet Planning",
    experience: "4+ years",
    image: "src/assets/images/trainer9.png",
  },
  {
    name: "DAVID LEE",
    specialization: "Functional Training & Mobility",
    experience: "8+ years",
    image: "src/assets/images/trainer10.png",
  },
  {
    name: "MAYA KAPOOR",
    specialization: "Yoga & Flexibility Coach",
    experience: "10+ years",
    image: "src/assets/images/trainer5.png",
  },
  {
    name: "JORDAN WILLIAMS",
    specialization: "Powerlifting & Strength Coach",
    experience: "7+ years",
    image: "src/assets/images/trainer1.png",
  },
  {
    name: "LINDA CHEN",
    specialization: "Pilates Instructor",
    experience: "5+ years",
    image: "src/assets/images/trainer7.png",
  },
  {
    name: "ALEX MURPHY",
    specialization: "CrossFit & Endurance Training",
    experience: "9+ years",
    image: "src/assets/images/trainer8.png",
  },
  {
    name: "NINA OKAFOR",
    specialization: "HIIT & Bodyweight Expert",
    experience: "6+ years",
    image: "src/assets/images/trainer4.png",
  },
];

const MeetTrainers = () => {
  return (
    <div className="meet-trainers-container">
      <div className="meet-trainers-header">
        <p className="section-title">Meet Our Trainers</p>
        <h1 className="section-subtitle">
          Transform the way you train with expert guidance
        </h1>
      </div>

     

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        slidesPerGroup={3}
        navigation
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {trainers.map((trainer, index) => (
          <SwiperSlide key={index}>
            <div className="trainer-card">
              <img src={trainer.image} alt={trainer.name} />
              <div className="overlay">
                <h3>{trainer.name}</h3>
                <p>{trainer.specialization}</p>
                <p>{trainer.experience}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MeetTrainers;
