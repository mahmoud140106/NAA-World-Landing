import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import man from "../../images/مستر رفيق 1.svg";
import { Translate } from "translate-easy";
import { useLocation } from "react-router-dom";

const CompleteDonation = () => {
  const location = useLocation()
  const amount = location.state?.amount
  return (
    <div className="relative  dark:bg-[--black] dark:bg-opacity-4 text-[--text]">
      <div className=" mx-auto w-[65%] max-tab:w-[80%] pt-20 max-mob:pt-3 ">
        <div className="flex justify-end p-2 z-20">
          <button className="rounded-full text-green-500 border-[3px] border-solid w-8 h-8 font-bold border-[--text] flex justify-center items-center">
            <FaCheck />
          </button>
          <IoIosArrowForward className="w-6 h-8" />
          <button className="rounded-full border-[3px] border-solid w-8 h-8 font-bold text-green-500 border-[--text] flex justify-center items-center">
            <FaCheck />
          </button>
          <IoIosArrowForward className="w-6 h-8" />
          <button className="rounded-full border-[3px] border-solid w-8 h-8 font-bold text-red-500 border-red-500">
            3
          </button>
        </div>
        <h1 className="text-[#D93541] text-center font-bold mr-10 z-20 capitalize">
          <Translate>Complete Your Donation</Translate>
        </h1>
        <div
          className="bg-white rounded-full p-1 relative mx-auto w-[70%] max-md:w-[100%] mt-4 z-20 text-black"
          style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)" }}
        >
          <div className="relative my-5 mx-16 text-left max-mob:text-center w-[68%] max-mob:mx-14 max-mob2:mx-12 max-mob3:mx-10 text-xl">
            <p>
              <Translate>Donation is not only for many you can share happiness with other
                way. you can donate with Clothes, Books, Medical supplies or any
                thing that.</Translate>
            </p>

            <div className="absolute -right-[11rem] -top-[11.1rem] max-tab:top-[-9.5rem] max-mob:hidden">
              <img
                src={man}
                alt="man"
                className="relative z-10 drop-shadow-xl "
              />
            </div>
          </div>
        </div>

        {/* <div className="mx-auto w-[80%] py-14">
          <button
            type="button"
            className="bg-[#F13B48] text-white rounded-full w-44 h-12 flex items-center justify-center text-xl capitalize"
          >
            <Translate> PAY NOW</Translate>£ {amount}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CompleteDonation;
