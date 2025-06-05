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
import {trainers} from "../plainData"; 


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
        // onSlideChange={() => console.log("")}
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
