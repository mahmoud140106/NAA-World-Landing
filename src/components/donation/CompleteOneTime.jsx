import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import motsha from "../../images/motsha.svg";
  import { Translate } from "translate-easy";
const CompleteOneTime = () => {
  
  return (
    <div className="relative  dark:bg-[--black] dark:bg-opacity-4 text-[--text] pb-32">
      <div className="mx-auto w-[65%] pt-16 ">
        <div className="flex justify-end p-2 z-20">
          <button className="rounded-full z-40 text-green-500 border-[3px] border-solid w-8 h-8 font-bold border-[--text] flex justify-center items-center">
            <FaCheck />
          </button>
          <IoIosArrowForward className="w-6 h-8 z-40" />
          <button className="rounded-full z-40 border-[3px] border-solid w-8 h-8 font-bold text-green-500 border-[--text] flex justify-center items-center">
            <FaCheck />
          </button>
          <IoIosArrowForward className="w-6 h-8 z-40" />
          <button className="rounded-full border-[3px] z-40 border-solid w-8 h-8 font-bold text-red-500 border-red-500">
            3
          </button>
        </div>
        <h1 className="text-[#D93541] text-center font-bold mr-10 z-50 capitalize">
          <Translate>YOUR PAYMENT IS COMPLETE</Translate>
        </h1>
        <div
          className="bg-white rounded-full p-2 relative mx-auto w-[65%] mt-4 z-40 text-black"
          style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.9)" }}
        >
          <p className=" my-5 mx-8 text-center">
            <Translate>We are waiting for you to share happeniess again.</Translate>
          </p>
        </div>
        <img src={motsha} alt="motsha" className="absolute top-20 left-40" />
      </div>
    </div>
  );
};

export default CompleteOneTime;
