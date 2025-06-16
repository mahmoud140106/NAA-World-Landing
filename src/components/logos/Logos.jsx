import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Translate } from "translate-easy";
import Loading from "../Loading";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Logos = ({ isLoading }) => {
  const [logos, setLogos] = useState([]);

  const [slidesPerView, setSlidesPerView] = useState(4);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth <= 380) {
        setSlidesPerView(1);
      } else if (window.innerWidth <= 780) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(4);
      }
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await axios.get(
          "https://naaworld.uk/api/v1/logos/list"
        );
        const allLogos = response.data.data;

        const validLogos = allLogos.filter((logo) => {
          const currentDate = new Date();
          const expireDate = new Date(logo.expireDate);
          return expireDate > currentDate;
        });

        setLogos(validLogos);
        console.log(validLogos);
      } catch (error) {
        console.error("Error fetching Logos:", error);
      }
    };
    fetchLogos();
  }, []);

  return (
    <div
      dir="ltr"
      className="  bg-[--black] text-[--text]  p-4 md:p-8 lg:py-16 xl:py-20"
    >
      <h2
        style={{ letterSpacing: "0.2em" }}
        className="text-center text-4xl max-mob1:text-2xl font-bold"
      >
        <Translate>Sponsorship Members</Translate>
      </h2>

      {isLoading ? (
        <Loading />
      ) : logos?.length > 0 ? (
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={10}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Navigation, Pagination, Autoplay]}
          className={`custom-swiper w-[65%] max-md:w-[85%] max-tab:w-[95%]  mx-auto mt-5 mb-0 p-2 h-60 max-mob1:h-40 d-flex justify-center items-center `}

        >
          {logos?.map((logo) => (
            <SwiperSlide
              key={logo._id}
              style={{ width: "fit-content" }}
              className="d-flex justify-center items-center  max-mob1:max-h-[8rem] "
            >
              <div
                data-aos="zoom-out"
                className="d-flex justify-center items-center max-h-[10.3rem]"
              >
                <img
                  src={logo.logo}
                  alt={logo.name}
                  className={`cursor-pointer h-[10.3rem] w-52 transition-all duration-300 object-fill max-mob1:h-[8rem] max-mob1:w-40 max-mob3:w-32 
                    `}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center">No Logos available</div>
      )}
    </div>
  );
};

export default Logos;
