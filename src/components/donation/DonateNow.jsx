import React, { useState } from "react";
import Eosha from "../../images/eosha.png";
import hand from "../../images/Group 64.png";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Translate } from "translate-easy";
import { Helmet } from "react-helmet-async";

const DonateNow = () => {
  const navigate = useNavigate();
  const [way, setWay] = useState("one-time");
  const [amount, setAmount] = useState("5");
  const money = ["5", "10", "25", "50"];

  return (
    <div
      className="relative dark:bg-[--black] dark:bg-opacity-2 min-h-[78vh]
        tab1:px-[2rem]
        tab2:px-[2rem]
        dark:text-white  flex justify-center max-tab:flex-wrap "
    >
      <Helmet>
        <title>NAA World - Donate Now</title>
        <link rel="canonical" href={`https://naaworld.uk/Donate-Now`} />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div className="z-40 my-20 max-tab:my-2 max-tab:mt-8 max-tab:mx-auto max-mob:mx-10 ">
        <h2 className="text-red-500 font-bold">
          <Translate>It’s Time</Translate>
        </h2>
        <h2>
          <span className="font-bold">
            <Translate>To</Translate>
          </span>
          <Translate> Share Happiness</Translate>
        </h2>
        <p>
          <Translate>MAKE YOUR DONATION</Translate>
        </p>
        <img
          src={Eosha}
          alt="eosha"
          loading="lazy"
          className="-ml-20 max-tab:ml-0 -mt-10 tab2:w-80 tab2:mx-5"
        />
      </div>
      <div
        className="dark:bg-opacity-2 dark:text-white my-20 shadow-md w-[40%]  dark:bg-[--black] bg-[#fff]
             max-md:w-[45%] tab2:w-[50%] max-tab:w-[80%] max-mob:w-[90%] max-mob:p-[2rem] max-tab:p-[3rem] max-tab:my-5
             max-tab:mt-0 max-md:p-[2rem] max-lg:p-[3rem] h-fit  z-30 shadow-gray-600 rounded-[4rem]"
      >
        <div className="flex justify-between">
          <p className="font-bold">
            <Translate>Donation amount</Translate>
          </p>
          <div className="flex">
            <button className="rounded-full text-red-500 border-[3px] border-solid w-8 h-8 font-bold border-red-500">
              1
            </button>
            <IoIosArrowForward className="w-6 h-8" />
            <button className="rounded-full border-[3px] border-solid w-8 h-8 font-bold">
              2
            </button>
            <IoIosArrowForward className="w-6 h-8" />
            <button className="rounded-full border-[3px] border-solid w-8 h-8 font-bold">
              3
            </button>
          </div>
        </div>
        <div className="max-lg:mt-4 max-md:mt-4 max-mob2:mt-8 mx-3 flex justify-center max-lg:gap-5 max-md:gap-5 max-mob1:gap-3">
          <button
            className={`border-[3px] border-solid border-red-500 rounded-full px-4 max-md:py-2 max-lg:py-2 mr-2 max-mob2:py-0 max-mob2:mr-0 ${
              way === "monthly"
                ? " bg-red-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              setWay("monthly");
            }}
          >
            <Translate>Monthly</Translate>
          </button>
          <div className='relative font-bold before:content[""]  before:h-10 before:w-0.5 before:bg-black before:absolute pt-2 before:-top-3/4 before:left-1/2 after:content-[""] after:h-10 after:w-0.5 after:bg-black after:absolute after:-bottom-3/4 after:left-1/2 dark:after:bg-white dark:before:bg-white'>
            <Translate>OR</Translate>
          </div>
          <button
            className={`border-[3px] border-solid border-red-500 rounded-full px-4  max-md:py-2 max-lg:py-2 max-mob2:py-0 ${
              way === "one-time"
                ? " bg-red-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setWay("one-time")}
          >
            <Translate>One-Time</Translate>
          </button>
        </div>
        <div className="flex justify-evenly mt-20">
          {money.map((price, index) => (
            <button
              key={index}
              className={`rounded-full  h-8 w-12 border-[3px] border-solid ${
                amount === price
                  ? "text-red-500  border-red-500"
                  : "dark:bg-[--black] dark:text-white"
              }`}
              onClick={() => {
                setAmount(price);
              }}
            >
              ${price}
            </button>
          ))}
        </div>
        <div className="flex gap-3 items-center">
          <img src={hand} alt="hand" className="w-8 h-8" />
          <p>
            <Translate>
              Over the next year, your {amount} monthly donation could give a
              young person an online session with a support worker to develop
              their confidence, resilience and motivation to build a brighter
              future.
            </Translate>
          </p>
        </div>
        <p className="font-bold">
          <Translate>Or your choice of:</Translate>
        </p>
        <input
          type="text"
          className="border-2 px-3 py-1 border-solid rounded-full w-3/4 block"
          placeholder={`$${amount}`}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <div className="w-fit mx-auto">
          <button
            className="rounded-full bg-red-500 h-10 w-28 text-white mt-3 "
            onClick={() => {
              way === "monthly"
                ? navigate("/Donate-monthly", { state: { amount } })
                : navigate("/Donate-one-time", { state: { amount } });
            }}
          >
            <Translate>Donate</Translate>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateNow;
