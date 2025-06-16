import React, { useCallback, useEffect, useRef, useState } from "react";
import SponsorshipsModal from "./SponsorshipsModal";
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
const Sponsorships = ({ sponsorshipsData, isLoading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const swiperRef = useRef(null);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const middleIndex = Math.floor(slidesPerView / 2);
  const [selectedSponsorshipId, setSelectedSponsorshipId] = useState(null);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth <= 380) {
        setSlidesPerView(1);
      } else if (window.innerWidth <= 780) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(5);
      }
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  const handleSlideClick = useCallback(
    (index) => {
      if (swiperRef.current) {
        const realIndex = index % sponsorshipsData.sponsorships.length;
        swiperRef.current.slideToLoop(realIndex);
        setSelectedSponsorshipId(sponsorshipsData.sponsorships[realIndex]._id);
      }

      setModalShow(true);
    },
    [sponsorshipsData]
  );
  return (
    <div className="  bg-[--black] text-[--text]  p-4 md:p-8 lg:py-16 xl:py-20">
      <h2
        style={{ letterSpacing: "0.2em" }}
        className="text-center text-4xl max-mob1:text-2xl font-bold"
      >
        <Translate>{sponsorshipsData?.title}</Translate>
      </h2>

      {isLoading ? (
        <Loading />
      ) : sponsorshipsData?.sponsorships?.length > 0 ? (
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={10}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Navigation, Pagination, Autoplay]}
          className="w-[65%] max-md:w-[85%] max-tab:w-[95%] mx-auto mt-5 mb-0 p-2 h-60 max-mob1:h-40"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {sponsorshipsData?.sponsorships?.map((sponsorship, index) => (
            <SwiperSlide
              key={sponsorship._id}
              style={{ width: "fit-content" }}
              className="flex justify-center items-center max-h-[13.3rem] max-mob1:max-h-[8rem] "
            >
              <div
                data-aos="zoom-out"
                onClick={() => handleSlideClick(index)}
                className="flex justify-center items-center"
              >
                <img
                  src={sponsorship.photo}
                  alt={sponsorship.name}
                  className={`cursor-pointer transition-all duration-300 object-scale-down h-[13.3rem] w-52 max-mob1:h-[8rem] max-mob1:w-40 max-mob3:w-32 ${
                    (index +
                      sponsorshipsData.sponsorships.length -
                      activeIndex) %
                      sponsorshipsData.sponsorships.length ===
                    middleIndex
                      ? "scale-[1.4]"
                      : "scale-90"
                  }`}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center">No sponsorships available</div>
      )}

      <SponsorshipsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedSponsorshipId={selectedSponsorshipId}
      />
    </div>
  );
};

export default Sponsorships;
