import "../styles/pages/testimony.scss";
import { TestimonyData } from "../utils/plainData";
import { Autoplay, Pagination } from "swiper/modules";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Testimony = () => {
  return (
    <div className="testimony-container">
      <div className="testimony-header">
        <h1 className="testimony-title">
          Your Gains – Real Stories from <br /> Real People{" "}
        </h1>
        <p>What are our members saying?</p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={30}
        // slidesPerView={3}
        // slidesPerGroup={3}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => swiper}
        // navigation
         breakpoints={{
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          769: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1024:{
             slidesPerView: 2,
            slidesPerGroup: 2,
          }
        }}
      >
        {TestimonyData.map((testimony, index) => (
          <SwiperSlide key={index}>
            <div className="testimony-card">
              <img src={testimony.image} alt={testimony.name} />
              <div className="overlay">
                <div className="feeback">
                  <p>{testimony.feedback}</p>
                </div>
                <div className="reviewer">
                  <p className="">{testimony.name}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimony;
