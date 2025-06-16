import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Translate } from "translate-easy";
import Loading from "../Loading";
import Aos from "aos";
import "aos/dist/aos.css";
function CategoriesCard({ categoriesData, isLoading }) {
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  // console.log(categoriesData);
  const getFingerColor = (index, fingerPosition, categoriesData) => {
    return index % 8 === fingerPosition ? categoriesData.finger1 : categoriesData.finger2;
  };
  return (
    <div
      className="relative  moblg:pt-20 mobl:pt-20 tab1:z-50 tab2:z-50 
      dark:bg-[--black]  p-[1rem] md:p-8 tab1:p-1 tab2:p-1 tab3:p-1 max-mob:p-0 lg:py-20 xl:py-16 tab1:py-2 tab2:py-2 "
      id="categories"
    >
      <div
        className="absolute bottom-24 md:bottom-96 transform -translate-y-1/2 left-4
        max-tab:bottom-[22rem]
        max-mob2:bottom-[10rem]
        larg:bottom-[25rem]
        desk-mob:bottom-[20rem]
        moblg:bottom-[19rem]
        lb80:bottom-[23rem]
       md:left-16 mob-x:bottom-[13rem]   tab1:bottom-[19rem] tab2:bottom-[19rem] tab3:bottom-[15rem]  max-mob1:bottom-[19rem]  z-50 custom-prev cursor-pointer "
      >
        <IoIosArrowBack size={24} className="font-bold" />
      </div>
      <div
        className="absolute mob-x:bottom-[13rem] bottom-24 md:bottom-96 transform -translate-y-1/2 right-4
        max-tab:bottom-[22rem]
         max-mob2:bottom-[10rem]
         larg:bottom-[25rem]
         desk-mob:bottom-[20rem]
          lb80:bottom-[23rem]
          moblg:bottom-[19rem]
          tab1:bottom-[19rem]
       md:right-16  tab2:bottom-[19rem] tab3:bottom-[15rem]
       max-mob1:bottom-[19rem] 
       z-50 custom-next cursor-pointer "
      >
        <IoIosArrowForward size={24} className="font-bold" />
      </div>

      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        className=" 
        max-mob1:min-h-[98vh] max-mob1:h-[98vh] 
        max-mob2:min-h-[70vh] max-mob2:h-[70vh] 
        mob:min-h-[55vh]  mob:h-[55vh] 
        mob-x:min-h-[30rem] mob-x:h-[30rem] 
        mob-x2:min-h-[31rem] mob-x2:h-[31rem] 

        max-md:min-h-[100vh] max-md:h-[100vh]   
        desk-mob:min-h-[38rem] desk-mob:h-[38rem]
        des24:min-h-[41rem] des24:h-[41rem]
        larg:min-h-[80vh] larg:h-[80vh]
        lb80:min-h-[81vh] lb80:h-[81vh]
        moblg:min-h-[40rem] moblg:h-[40rem]
        mobl:min-h-[40rem] mobl:h-[40rem]
       
        tab1:min-h-[45vh]  tab1:h-[45vh] 
        tab2:min-h-[54vh] tab2:h-[54vh]
         tab3:h-[50vh]  tab3:min-h-[50vh]
        md-lap:min-h-[41rem] md-lap:h-[41rem]
        "
      >
        {categoriesData?.categories?.map((category, index) => (
          <SwiperSlide
            key={index}
            className="relative  dark:bg-[#191919f3]  p-[1.5rem] md:p-8 tab1:p-1 tab2:p-1 tab3:p-1 rounded-lg"
          >
            <div dir="rtl">
              {/* First Row of Divs */}
              <div className="relative w-[55%] bottom-0 right-0 flex flex-row-reverse justify-center gap-2">
                <div
                  style={{
                    backgroundColor:  getFingerColor(index, 0, categoriesData),
                  }}
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className={`hidden tab2:block lg:block h-80 w-20 shadow-md shadow-[#541519] rounded-full`}
                ></div>
                <div
                  style={{
                    backgroundColor: getFingerColor(index, 1, categoriesData),
                  }}
                  data-aos="fade-up"
                  data-aos-duration="1100"
                  className={`hidden tab2:block lg:block h-60 w-20 relative top-16 shadow-md shadow-[#541519] rounded-full`}
                ></div>
                <div
                  style={{
                    backgroundColor: getFingerColor(index , 2, categoriesData),
                  }}
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  className={`hidden tab2:block lg:block h-80 w-20 shadow-md shadow-[#541519] rounded-full`}
                ></div>
                <div
                  style={{
                    backgroundColor: getFingerColor(index , 3, categoriesData),
                  }}
                  data-aos="fade-up"
                  data-aos-duration="1300"
                  className={`hidden tab2:block lg:block h-60 w-20 relative top-16 shadow-md shadow-[#541519] rounded-full`}
                ></div>
              </div>

              {/* Second Row of Divs */}
              <div className="relative w-[55%] bottom-0 right-0 flex flex-row-reverse justify-center gap-2">
                <div
                  style={{
                    backgroundColor: getFingerColor(index , 4, categoriesData),
                  }}
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className={`hidden tab2:block lg:block h-60 larg:min-h-[19rem] w-20 relative -top-16 shadow-md shadow-[#541519] rounded-full`}
                ></div>
                <div
                  style={{
                    backgroundColor: getFingerColor(index , 5, categoriesData),
                  }}
                  data-aos="fade-down"
                  data-aos-duration="1100"
                  className={`hidden tab2:block lg:block h-72 w-20 shadow-md shadow-[#541519] rounded-full`}
                ></div>
                <div
                  style={{
                    backgroundColor: getFingerColor(index , 6, categoriesData),
                  }}
                  data-aos="fade-down"
                  data-aos-duration="1200"
                  className={`hidden tab2:block lg:block h-60 larg:min-h-[19rem] w-20 relative -top-16 shadow-md shadow-[#541519] rounded-full`}
                ></div>
                <div
                  style={{
                    backgroundColor: getFingerColor(index , 7, categoriesData),
                  }}
                  data-aos="fade-down"
                  data-aos-duration="1300"
                  className={`hidden tab2:block lg:block h-72 w-20 shadow-md shadow-[#541519] rounded-full`}
                ></div>
              </div>
            </div>
            {/* Content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] flex flex-col items-left">
              <h2
                data-aos="zoom-in-up"
                className="xl:text-7xl text-3xl md:text-5xl sm:text-2xl font-bold text-[#541519] dark:text-white -mb-1 ms-2 md:ms-4  "
              >
                <Translate>{categoriesData?.title?.split(" ")[0]}</Translate>
                <br />
                <Translate>{categoriesData?.title?.split(" ")[1]}</Translate>
              </h2>
              <div
                className="bg-white rounded-full w-[60vw] md:w-[70vw] h-[30vh] 
              max-mob:w-[80vw] max-mob:h-[45vh] 
               mob-x:w-[90vw] mob-x:h-[26vh]
              max-md:h-[45vh] 
              larg:h-[40vh]
              md-lap:h-[40vh]
              tab1:h-[25vh]  tab1:w-[75vw]
              tab2:h-[25vh]  tab2:w-[75vw]
              tab3:h-[25vh] tab3:w-[65vw]
              max-mob1:h-[12rem] 
              max-mob2:h-[11rem] 
              desk-mob:h-[18rem] 
             larg:w-[72vw]  desk-mob:w-[65vw] des24:w-[70vw]
              moblg:h-[18rem]
              mobl:h-[16vh]
               shadow-lg p-4 md:p-6 flex items-center justify-evenly px-6 md:px-12 py-4 md:py-8"
              >
                <p className="text-gray-600 text-sm md:text-base tab2:text-sm tab2:w-[33vw] tab2:mx-6 w-[30vw] hidden tab2:block lg:block">
                  <Translate>{category.description}</Translate>
                </p>
                <div className="flex flex-col items-center">
                  <img
                    src={category.photo}
                    alt={category.name}
                    className="w-40 md:w-52"
                  />
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mt-2 max-mob1:text-center  md:mt-4 tracking-wide md:tracking-widest">
                    <Translate>{category.name}</Translate>
                  </h3>
                </div>
              </div>
            </div>

            {/* Button */}
            <div
              className="
             relative 
              bottom-[7rem] 
              max-mob2:bottom-[-15.5rem]
              larg:bottom-[3rem]
             max-md:bottom-[7rem]  
             des24:bottom-[7rem]
             md-lap:bottom-[7rem]
             tab1:bottom-[5rem]
             tab2:bottom-[5rem]
             tab3:bottom-[-25rem]
             max-tab:bottom-[-30rem]
             max-mob1:bottom-[-28rem]
             mob-x:bottom-[-22rem]
            mob-x2:bottom-[-22rem]
             desk-mob:bottom-[-28rem]
             moblg:bottom-[5rem]
             lb80:bottom-[7rem]
             w-fit mx-auto"
            >
              <button
                onClick={() => navigate("/category")}
                className={`hover:bg-red-600 tracking-wider bg-[#F13B48]  w-52 h-12 font-bold text-white rounded-full`}
              >
                <Translate>Refer a person in need</Translate>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CategoriesCard;
