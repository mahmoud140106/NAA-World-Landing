import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Translate } from "translate-easy";
import Aos from "aos";
import "aos/dist/aos.css";
import background from "../../images/Vector.svg";
import Rectangle from "../../images/Rectangle.svg";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

const Product = ({ isLoading, productsData }) => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className="relative py-12 max-mob1:py-1 dark:bg-[--black] z-50"
      id="products"
      dir="ltr"
    >
      <div className={`absolute inset-0 z-0 `}>
        <img
          src={background}
          alt="Background"
          className={`absolute z-10 bottom-2 tab1:bottom-[17rem] tab2:bottom-[8rem] object-cover h-[37rem] w-[42rem] max-mob:w-full max-mob:h-[24rem] left-0`}
        />
        <img
          src={Rectangle}
          alt="Rectangle"
          className={`absolute z-0 bottom-[0rem] tab1:bottom-[17rem] tab2:bottom-[8rem]  object-cover h-[41rem] w-[38rem]
            max-mob1:h-[28rem]  max-mob1:w-[30rem]
            left-0`}
        />
      </div>
      <div
        className="relative z-10 p-[1.5rem] md:p-8 tab1:p-1 tab2:p-1 tab3:p-1 max-mob1:p-1"
        ref={swiperRef}
      >
        <h2 className="text-2xl md:text-4xl font-bold my-5 tracking-[1rem] text-center text-[--text]">
          <Translate>{productsData?.title}</Translate>
        </h2>
        <Swiper
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          // className="mySwiper h-[70vh] w-[80vw] md:w-[80vw] d-flex items-center justify-between max-tab:justify-center "
          className="w-[65%] h-[80vh]  tab1:h-[48vh] tab2:h-[60vh] max-md:w-[85%] max-tab:w-[95%] tab3:h-[50vh]  mob-x:h-[56vh]
          desk-mob:h-[27rem] larg:h-[66vh] lb80:h-[65vh] mobl:h-[40vh] moblg:h-[40vh]
          max-mob1:h-[65vh] mx-auto mt-5 mb-0 p-2 z-50 "
        >
          {productsData?.products.map((product) => (
            <SwiperSlide
              key={product._id}
              className="relative z-50 d-flex justify-center items-center"
            >
              <div
                className="relative mt-8 md:mt-16 w-[18vw] max-md:w-[24vw] max-tab:w-[35vw] z-50 moblg:w-[30vw] mobl:w-[30vw] 
              max-mob:w-[55vw] max-mob2:w-[60vw] max-mob3:w-[65vw] mob-x:h-[36vh] mob-x:w-[66vw] moblg:h-[23rem] mobl:h-[23rem] 
               bg-[--black] h-[40vh] md:h-[50vh] desk-mob:h-[18rem] larg:h-[42vh] tab1:h-[26vh] tab2:h-[26vh] tab3:h-[30vh]
              shadow-md shadow-gray-700 dark:shadow-white rounded-tl-full rounded-tr-full "
                data-aos="flip-left"
              >
                <img
                  src={product.cover}
                  alt="Product"
                  className="w-[20rem] h-[20rem] md:h-[20rem] top-[3.5rem] object-contain relative drop-shadow-md 
                  inset-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
                <div className="absolute bottom-4 left-0 right-0 text-center py-2 md:py-5 px-3 md:px-6 rounded-b-lg ">
                  <h2 className="text-sm md:text-lg font-medium text-[--text] my-4 ">
                    <Translate>{product.name}</Translate>
                  </h2>
                </div>
                <button
                  style={{ backgroundColor: productsData.btnColor }}
                  onClick={() => navigate(`/products/${product._id}`)}
                  className={`absolute -bottom-4 md:-bottom-6 left-1/2 transform -translate-x-1/2  shadow-md
                 w-32 font-bold py-[0.8rem] rounded-full`}
                >
                  <Translate>Shop</Translate>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Product;
