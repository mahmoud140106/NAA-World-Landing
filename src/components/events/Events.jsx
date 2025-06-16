import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Eventbg from "../../images/event.svg";
import { Translate, useLanguage } from "translate-easy";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
function Events({ eventsData, isLoading }) {
  const { selectedLanguage } = useLanguage();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  if (isLoading) {
    return <Loading />;
  }

  function formatEventDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  }

  return (
    <div
      className="relative dark:bg-[--black] py-16 mob-x:py-1 mob-x2:py-1 tab1:py-2 tab2:py-2 tab3:py-2 overflow-x-hidden"
      id="events"
      dir="ltr"
    >
      <h2 className="text-4xl font-bold pt-[3rem] max-mob:pt-3 tracking-[1rem] text-center text-[--text]">
        <Translate>{eventsData?.title}</Translate>
      </h2>
      {windowWidth > 780 && (
        <>
          <div
            className="absolute bottom-1/2 transform translate-y-8 
          left-20 
          max-md:left-[2rem] max-md:bottom-[44%]
          tab1:bottom-[52%]
          max-tab:left-10 max-tab:translate-y-[4.5rem] 
          desk-mob:bottom-[52%]
          max-mob:left-10 z-50 custom-prev cursor-pointer"
          >
            <IoIosArrowBack size={30} className="font-bold" />
          </div>
          <div
            className="absolute bottom-1/2 transform translate-y-8 
          right-14 
           max-md:right-[0.5rem] max-md:bottom-[44%]
            tab1:bottom-[52%]
          max-tab:right-4 max-tab:translate-y-[4.5rem] 
          desk-mob:bottom-[52%]
          max-mob:right-10  z-50 custom-next cursor-pointer"
          >
            <IoIosArrowForward size={30} className="font-bold" />
          </div>
        </>
      )}

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
        // className="lg:h-[100vh] h-[100vh] md:h-[100vh] max-tab:h-[110vh] max-mob1:h-[100vh] max-mob2:h-[65vh] "
        className="h-[90vh] max-md:h-[95vh] max-mob1:h-[70vh] tab1:h-[57vh] tab2:h-[52vh] tab3:h-[60vh]"
      >
        {eventsData?.events?.map((event, index) => (
          <SwiperSlide key={index} className="relative  ">
            <div className="relative bgEvent flex justify-between items-center mt-[2rem]  tab1:mt-[0rem] tab2:mt-[0rem] tab3:mt-[0rem] max-mob1:mt-0">
              <div
                data-aos="zoom-in"
                className="absolute 
                left-[24%] top-[-5.5%]
                larg:top-[7%] larg:left-[27%]
                max-md:left-[13%]
                max-md:top-[-9%]
                md-lap:top-[-5.5%]
                des24:top-[-9%]
                tab3:top-[-2%]
                tab1:top-[9%]
                tab2:top-[5%]
                mob-x:top-[24%]
                lb80:top-[-1.5%] lb80:left-[21%]
                max-tab:left-[13%]
                max-tab:top-[-6%]
                max-mob1:top-[20%]
                max-mob2:top-[19%]
                mob:top-[21%]
                max-mob3:top-[20.5%]
                desk-mob:top-[9%]
                moblg:top-[17%]
                mobl:top-[17%]
                larg2:left-[30%]
                z-50"
              >
                <img
                  src={eventsData.photo}
                  alt="event girl"
                  className="drop-shadow-2xl max-mob1:w-[5rem] tab3:w-[8.5rem] des24:w-[7rem] md-lap:w-[150px]"
                  width={150}
                />
              </div>
              <div
                data-aos="zoom-in"
                className="absolute
                   top-[22rem] left-[20vw] 
                   larg:top-[25rem] larg:left-[22vw]
                   max-lg:left-[18vw]
                   max-md:left-[7rem] max-md:top-[15rem]
                   lb80:left-[16vw] des24:left-[4rem] md-lap:left-[20vw] 
                   tab1:top-[24rem] tab1:left-[5rem]
                   tab2:top-[21rem] tab2:left-[4rem]
                   max-tab:left-[4rem] max-tab:top-[18rem]
                   max-mob1:left-[1.5rem]
                   max-mob2:left-[.5rem] mob:top-[21rem]
                   max-mob2:top-[16rem]
                   mob-x:top-[21rem]
                   desk-mob:top-[26rem] desk-mob:left-[5rem]
                   tab3:top-[17rem] tab3:left-[4rem] mob-x:left-[1.5rem] 
                   moblg:top-[33rem]
                   mobl:top-[33rem]
                   larg2:left-[30rem]
                    z-30"
              >
                <div
                  className="flex flex-col items-center justify-content-center shadow-md   mob-x:w-[16vw] mob-x:h-[16vw] 
                   larg:w-[8vw] larg:h-[8vw]  lb80:w-[8vw] lb80:h-[8vw] desk-mob:w-[13vw] desk-mob:h-[13vw] 
                       shadow-gray-900 xl:w-[8vw] xl:h-[8vw] w-[10vw] md:w-[15vw] md:h-[15vw] tab1:w-[12vw] tab1:h-[12vw] tab2:w-[13vw] tab2:h-[13vw]  tab3:w-[13vw] tab3:h-[13vw]
                       bg-white rounded-full h-[10vw] max-md:w-[11vw] max-md:h-[11vw] max-mob1:w-[17vw] max-mob1:h-[17vw] 
                       "
                >
                  {event.isFree ? (
                    <h3
                      className={`text-xl max-mob:text-sm min-w-max max-mob:mb-0 font-bold text-red-700 tracking-wide`}
                    >
                      <Translate>Free</Translate>
                    </h3>
                  ) : (
                    <>
                      <h3
                        className={`text-xl max-mob:text-sm max-mob3:text-xs min-w-max max-tab:mb-0 font-bold text-gray-800 tracking-wide ${
                          event.discount ? "line-through" : ""
                        }`}
                      >
                        {event.price} $
                      </h3>
                      <h3 className="text-xl max-mob:text-sm max-mob3:text-xs min-w-max max-tab:mb-0 font-bold text-red-700 tracking-wide">
                        {event.priceAfterDiscount
                          ? `${event.priceAfterDiscount} $`
                          : "0 $"}
                      </h3>
                      <h3 className="text-xl max-mob:text-sm max-mob3:text-xs min-w-max max-tab:mb-0 font-bold text-gray-800 tracking-wide">
                        {`${event.discount || 0} % `}
                        <Translate>OFF</Translate>
                      </h3>
                    </>
                  )}
                </div>
              </div>
              <div
                className={`relative  top-[20%]
                larg:top-[18%] 
                tab1:top-[17%] 
                tab2:top-[18%]
                lb80:top-[20%]
                lb80:left-[31%]
               tab3:top-[20%]
               tab3:left-[24%]
               moblg:left-[33%] moblg:top-[15%]
               mobl:left-[31%] mobl:top-[12%]
               larg2:left-[38%]
                ${
                  selectedLanguage.code === "ar"
                    ? "left-[38%] larg:left-[39%] max-md:left-[32%] max-tab:left-[30%] desk-mob:left-[30%] max-mob1:top-[16%] max-mob1:left-[24%]  max-mob2:left-[22%]  max-mob3:left-[20%]  tab2:left-[31%] tab1:left-[32%] mob-x:top-[13%] mob-x:left-[23%] lb80:left-[35%] tab3:left-[30%]"
                    : " left-[33%] larg:left-[36%] max-md:left-[28%] max-tab:left-[23%] max-mob1:left-[24%]  max-mob2:left-[22%] max-mob3:left-[22%] tab2:left-[24%] tab1:left-[27%] mob-x:top-[13%] mob-x:left-[23%] moblg:left-[27%] mobl:left-[27%]"
                }
              max-mob3:top-[15%] max-mob1:top-[15%]
              `}
              >
                <h3
                  data-aos="fade-left"
                  className={`text-xl font-bold text-center text-gray-800 mt-4 max-mob1:text-sm  max-mob3:w-[9rem] max-mob3:text-[14px]
                   tracking-widest border-b-2 pb-2 max-mob1:pb-0 border-t-0 border-x-0 border-black border-solid max-mob1:mb-0 
                   `}
                >
                  <Translate>{event.name}</Translate>
                </h3>
                <p
                  data-aos="fade-right"
                  className="tracking-widest mb-0 text-lg max-mob1:w-[10rem] 
                  max-mob2:w-[9.6rem]  max-mob1:text-center max-mob1:text-[10px]  max-mob1:tracking-normal  "
                >
                  <Translate>
                    {formatEventDate(event.date)} . {event.time}
                  </Translate>
                </p>
                <a
                  data-aos="fade-left"
                  href={event.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline z-50 max-w-min"
                >
                  <p className="tracking-widest text-lg text-black min-w-max font-bold max-mob1:text-xs max-mob1:text-center">
                    <Translate>{event.location}</Translate>
                  </p>
                </a>
                <div className="mx-auto mt-5 w-fit">
                  <button
                    data-aos="fade-right"
                    onClick={() => navigate("/BookSeat", { state: { event } })}
                    className="bg-red-500 rounded-full font-bold relative 
                      text-white tracking-wide z-50 w-40 h-12
                      "
                  >
                    <Translate>Book your seat</Translate>
                  </button>
                </div>
              </div>
              <div
                className="relative
               left-[-14%] top-[2%] 
               larg:top-[2%] larg:left-[-18%]
               max-lg:left-[-16%]
               max-md:top-[3%] max-md:left-[-0%]
               tab2:left-[2%]
               tab1:left-[0%]
               lb80:left-[-10%]
               max-tab:left-[6%]
               max-mob1:left-[13%] max-mob1:top-[1%]
               max-mob2:left-[18%]
               mob:left-[17%]
               max-mob3:left-[21%]
               max-mob3:top-[-0%]
             mob-x:left-[17%] mob-x:top-0
             desk-mob:left-[5%]
             tab3:left-[6%] 
             moblg:top-[1rem]
             mobl:top-[1rem]
             tab3:top-[1rem]
             larg2:left-[-22%]
               "
              >
                <div
                  className="relative z-20 transform rotate-[-90deg] 
                  -translate-x-20 
                  "
                >
                  <h3
                    className="text-3xl text-center fw-bold text-gray-800 w-60 max-mob3:text-[14px]
                     max-mob:mb-0 max-tab:text-xl max-mob:text-lg max-mob1:text-base max-mob:w-28 tracking-widest"
                    data-aos="fade-left"
                  >
                    Book Now
                  </h3>
                  <p
                    data-aos="fade-right"
                    className="tracking-wider text-center max-mob:mb-0 text-md  moblg:text-[15px] mobl:text-[15px] larg:text-[15px] larg2:text-[15px]
                    max-mob1:text-sm max-mob2:text-[8px] max-mob1:w-[8rem] max-mob2:pb-[0.1rem] max-mob3:w-[6rem] max-mob3:text-[6px] 
                     border-b-2 border-t-0 border-x-0 border-black border-solid pb-[0.5rem] max-mob1:pb-0 mob-x:text-[6px] "
                  >
                    {formatEventDate(event.date)} . {event.time}
                  </p>
                </div>
              </div>

              <img
                src={Eventbg}
                alt="Background"
                className="w-40 object-contain z-40 absolute 
                    right-[6rem] bottom-[-2rem] 
                    max-md:w-28
                    max-md:right-[1rem] max-md:bottom-[-3rem]
                    tab1:bottom-[2rem]
                    tab2:bottom-[1rem] tab2:right-[3rem]
                    max-tab:w-24 max-mob1:bottom-[4rem]
                    mob-x:bottom-[7rem]
                    lb80:bottom-[-2rem]
                    tab3:bottom-0
                    mob:bottom-[6rem]
                    "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default React.memo(Events);
