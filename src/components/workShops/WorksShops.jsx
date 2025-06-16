import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { CalendarBlank, MapPin, Timer } from "@phosphor-icons/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Translate, useLanguage } from "translate-easy";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
function WorksShops({ workshopsData, isLoading }) {
  const { selectedLanguage } = useLanguage();

  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  function formatDate(dateString) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  }
  return (
    <div
      className="relative  p-[1rem] md:p-8 lg:py-16 xl:py-20 tab1:py-2 tab2:py-2 tab3:py-2  max-tab:p-0 bg-[--black] "
      id="workshops"
      dir="ltr"
    >
      <h2 className="text-3xl font-bold pt-5 tracking-[1rem] text-center text-[--text]  ">
        <Translate>{workshopsData?.title}</Translate>
      </h2>

      <div
        className="absolute bottom-1/2 transform translate-y-8 left-20 z-50
       custom-prev cursor-pointer max-mob:left-[1rem] tab2:top-[51%] "
      >
        <IoIosArrowBack size={30} className=" font-bold" />
      </div>
      <div
        className="absolute bottom-1/2 transform translate-y-8 
      right-20 z-50 custom-next cursor-pointer max-mob:right-[1rem] tab2:top-[51%]"
      >
        <IoIosArrowForward size={30} className=" font-bold" />
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        className="h-[80vh] tab1:h-[42vh] moblg:h-[40rem] mobl:h-[40rem] tab2:h-[50vh] tab3:h-[50vh] max-mob:h-[100vh] max-mob2:h-[105vh] lb80:h-[80vh] max-mob3:h-[105vh] 
        desk-mob:h-[32rem]
        md-lap:h-[82vh]
        mob-x:h-[83vh] 
        mob-x2:h-[83vh] 
        des24:h-[78vh]
        z-10"
      >
        {workshopsData?.workshops?.map((workshop) => (
          <SwiperSlide
            key={workshop._id}
            className="relative mt-[1.25rem] z-10 rounded-lg mob-x:mt-[5rem] mob-x2:mt-[5rem] "
          >
            <div className="absolute bottom-[0rem] left-0 right-0 grid grid-cols-4  ">
              <div
                className={`absolute -top-[90vh] larg:top-[-49rem] 
                  md-lap:-top-[90vh]
                tab1:top-[-48vh] tab1:right-[20%] tab2:top-[-54vh] tab3:top-[-56vh]
                tab2:right-[20%]  max-mob:-top-[114vh]  max-mob:right-[20%]
                max-mob2:top-[-45rem]  right-[16%] z-0
                desk-mob:top-[-37rem] lb80:top-[-44rem]
                  mob:top-[-51rem]  moblg:top-[-42rem]  mobl:top-[-42rem]
                ${
                  selectedLanguage.code === "ar"
                    ? "max-mob3:top-[-113vh] mob-x:top-[-90vh] mob-x2:top-[-90vh] des24:top-[-33rem]"
                    : "max-mob3:top-[-119vh] mob-x:top-[-46rem] mob-x2:top-[-46rem] des24:top-[-33rem] "
                }`}
                data-aos="fade-up"
              >
                <img src={workshopsData.photo} alt="Works Shops" width={250} />
              </div>
            </div>

            <div className=" z-10 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] flex flex-col items-left">
              <div
                style={{ backgroundColor: workshopsData.color }}
                className={`    rounded-full w-[70vw] h-[45vh] shadow-lg p-6 
                  moblg:h-[19rem]
                  mobl:h-[18rem]
                  flex items-center justify-between px-12 py-8  tab1:h-[24vh]  tab2:h-[24vh] tab3:h-[26vh]
                  max-mob:flex-wrap max-mob:w-[90vw] max-mob:h-max desk-mob:h-[18rem]
                  max-mob:px-[4rem] max-mob2:px-[2rem] max-mob:justify-center z-10
                  `}
              >
                <div
                  data-aos="zoom-in"
                  className="max-md:hidden absolute -left-10 bg-white w-[25vw] h-[25vh] shadow-md shadow-gray-500 rounded-full"
                ></div>
                <div className="flex flex-col ms-auto me-24 max-md:me-0 w-[20vw] max-md:w-full">
                  <h3
                    data-aos="fade-right"
                    className="text-4xl font-bold text-gray-800 mt-4 tracking-widest max-mob:text-center"
                  >
                    <Translate>{workshop.name}</Translate>
                  </h3>
                  <p data-aos="fade-left" className="max-mob:text-center">
                    <Translate>{workshop.description}</Translate>
                  </p>
                </div>
                <div>
                  <div
                    data-aos="zoom-in"
                    className={`flex flex-col items-center justify-content-center absolute -top-5 right-4 
                    shadow-md shadow-gray-900 w-[10vw] bg-white rounded-full 
                    h-[10vw] max-md:w-[12vw] max-md:h-[12vw] max-md:-top-2  
                    tab1:top-[-1.5rem] tab1:right-[4rem]
                    tab2:top-[-1.5rem] tab2:right-[4rem]
                    max-mob:w-[25vw] max-mob:h-[25vw] max-mob:top-[-3rem]
                     max-mob3:w-[30vw] max-mob3:h-[30vw] 
                     mob-x:w-[25vw] mob-x:h-[25vw]  mob-x:top-[-2.5rem]
                       larg:w-[8vw] larg:h-[8vw]  lb80:w-[8vw] lb80:h-[8vw] 
                       desk-mob:w-[13vw] desk-mob:h-[13vw] 
                       tab3:w-[13vw] tab3:h-[13vw] 
                       
                     ${
                       selectedLanguage.code === "ar"
                         ? "max-mob2:top-[-1.5rem] max-mob3:top-[-2.5rem]"
                         : "max-mob2:top-[-1.8rem] max-mob3:top-[-2.8rem]"
                     } `}
                  >
                    {workshop?.isFree ? (
                      <h3
                        className={`text-2xl max-mob:text-sm min-w-max max-mob:mb-0 font-bold text-red-700 tracking-wide`}
                      >
                        <Translate>Free</Translate>
                      </h3>
                    ) : (
                      <>
                        <h3
                          className={`text-xl max-md:text-md max-md:mb-0 font-bold text-gray-800 tracking-wide ${
                            workshop.discount ? "line-through " : ""
                          }}`}
                        >
                          {workshop.price} $
                        </h3>
                        <h3 className="text-xl max-md:text-md max-md:mb-0 font-bold  text-red-700 tracking-wide">
                          {workshop.priceAfterDiscount} $
                        </h3>
                        <h3 className="text-xl max-md:text-md max-md:mb-0 font-bold text-gray-800 tracking-wide">
                          {`${workshop.discount}% `}
                          <Translate>OFF</Translate>
                        </h3>
                      </>
                    )}
                  </div>

                  <div
                    className="w-fit absolute -bottom-6 right-96 desk-mob:right-[12rem] larg:right-[43%] lb80:right-[35%]
                    mob:right-[22%]
                  max-md:right-[35%] max-mob:right-[24%] max-mob2:right-[20%] max-mob3:right-[15%] mob-x:right-[21%]"
                  >
                    <button
                      onClick={() =>
                        navigate("/BookSeat", { state: { workshop } })
                      }
                      className="hover:bg-red-600 tracking-wider bg-[#F13B48] w-48 h-12 font-bold text-white rounded-full"
                    >
                      <Translate>Book your seat</Translate>
                    </button>
                  </div>
                  <div className="flex flex-col items-start mt-32 max-md:mt-[5.5rem] max-tab:mt-2">
                    <h3 className="min-w-max text-xl font-bold text-gray-800 flex items-center justify-content-between tracking-wide">
                      <Timer size={24} /> {workshop.time}
                    </h3>
                    <h3 className="min-w-max text-xl font-bold text-gray-800 flex items-center justify-content-between tracking-wide">
                      <CalendarBlank size={24} /> {formatDate(workshop.date)}
                    </h3>
                    <a
                      href={workshop.locationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline "
                    >
                      <h3 className="text-xl font-bold text-gray-800 flex items-center justify-content-between tracking-wide">
                        <MapPin size={24} />
                        <Translate>{workshop.location}</Translate>
                      </h3>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default WorksShops;
