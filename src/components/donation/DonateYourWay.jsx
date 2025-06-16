import React, { useState } from "react";
import young from "../../images/young.png";
import lezy from "../../images/lezy.png";
import axios from "axios";
import { Translate, useLanguage } from "translate-easy";
import AcceptTerms from "../AcceptTerms";
import Cookies from "js-cookie";
import { ErrorAlert, SuccessAlert } from "../Alert";
import { Helmet } from "react-helmet-async";
const DonateYourWay = () => {
  const [modalShow, setModalShow] = useState(false);
  const { selectedLanguage } = useLanguage();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [delivery, setDelivery] = useState(null);

  const isFormValid =
    firstname &&
    lastname &&
    email &&
    phonenumber &&
    address &&
    details &&
    isChecked;

  const donate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        "https://naaworld.uk/api/v1/donateWayForm",
        { firstname, lastname, email, phonenumber, address, details, delivery },
        {
          withCredentials: true,
          headers: {
            "X-CSRF-Token": Cookies.get("_coo_123"),
            "X-API-KEY": "naa246lan",
          },
        }
      );
      SuccessAlert({
        title: "Success",
        text: "Your donation done successfully",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      ErrorAlert({
        text:
          error?.response?.data?.message || "An error occured! pleae try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative dark:bg-[--black] dark:bg-opacity-4 text-[--text] overflow-x-hidden">
      <Helmet>
        <title>NAA World - Donate your way</title>
        <link rel="canonical" href={`https://naaworld.uk/donate-your-way`} />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div className="relative z-20 w-[700px] mx-auto pt-20 max-tab:w-[80%] max-mob1:w-[85%] max-mob1:pt-3">
        <h1 className="text-[#D93541] text-center font-bold mr-10 ">
          <Translate>Donate your way</Translate>
        </h1>
        <div
          className="bg-[--black] rounded-full p-2 relative max-mob:mt-24 w-[95%] max-mob1:w-[100%] z-20"
          style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.9)" }}
        >
          <img
            src={young}
            alt="young"
            loading="lazy"
            className={`w-56 absolute -top-40 
              ${
                selectedLanguage.code === "ar"
                  ? "-left-7 max-mob1:-left-8 max-mob2:-left-10"
                  : "right-0 max-mob1:-right-8 max-mob2:-right-10"
              } 
               -z-10`}
          />
          <p className="my-5 mx-8  z-20 w-[80%] max-tab:w-[75%] max-mob:w-[70%] ">
            <Translate>
              Donation is not only for many you can share happiness with other
              way. you can donate with Clothes, Books, Medical supplies or
              anything that could be helpful to people in need.
            </Translate>
          </p>
        </div>
      </div>
      <form className="relative z-20" onSubmit={donate}>
        <div className="pt-28  max-mob1:pt-8 max-mob2:pt-8 mx-48 max-md:mx-36 max-tab:mx-16 max-mob1:mx-8 pb-3 z-10">
          <p className="text-xl font-extrabold">
            <Translate>Personal Details</Translate>
          </p>
          <div className="mb-5">
            <label className="block ml-3 mt-2" htmlFor="firstName">
              <Translate>First Name</Translate>
            </label>
            <input
              className=" max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="firstName"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="type here"
            />
          </div>
          <div
            // className="-z-10 absolute bottom-80 left-[40%] max-mob:w-20
            // max-mob:h-64 selectedLanguage ?ar  max-md:left-[50%] max-tab:left-[65%] max-mob1:left-[65%] max-mob1:bottom-28 w-48 h-80 bg-cover bg-center
            // max-mob2:left-[75%] max-mob3:left-[78%]  "
            className={`-z-10 absolute bottom-80 left-[40%] max-mob:w-20 
              max-mob:h-64 ${
                selectedLanguage.code === "ar"
                  ? "max-md:left-[25%] max-tab:left-[15%] max-mob1:left-[15%]  max-mob2:left-[15%] max-mob3:left-[15%] tab2:left-[15%] "
                  : "max-md:left-[75%] max-tab:left-[65%] max-mob1:left-[75%]  max-mob2:left-[75%] max-mob3:left-[79%] tab2:left-[70%] "
              }  max-mob1:bottom-28
                w-48 h-80 bg-cover bg-center 
            `}
            style={{ backgroundImage: `url(${lezy})` }}
          />
          <div className="mb-5">
            <label className="block ml-3 mt-2" htmlFor="lastName">
              <Translate>Last Name</Translate>
            </label>
            <input
              className=" max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="lastName"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="type here"
            />
          </div>
          <div className="mb-5">
            <label className="block ml-3 mt-2" htmlFor="email">
              <Translate>Email</Translate>
            </label>
            <input
              className=" max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="type here"
            />
          </div>
          <div className="mb-5">
            <label className="block ml-3 mt-2" htmlFor="Phone">
              <Translate>Phone Number</Translate>
            </label>
            <input
              className=" max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="Phone"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              placeholder="type here"
            />
          </div>
          <div className="mb-5">
            <label className="block ml-3 mt-2" htmlFor="Address">
              <Translate>Address</Translate>
            </label>
            <input
              className=" max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="type here"
            />
          </div>
          <div className="mb-5">
            <p className="ml-3 mt-2 w-72 max-mob1:w-80 max-mob3:w-64">
              <Translate>
                What’s the thing that you want to donate with?
              </Translate>
            </p>
            <textarea
              className=" max-mob1:w-80 max-mob3:w-64 w-96 h-36 p-4 pl-3 mt-3 rounded-2xl border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              placeholder="type here"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>
          <div className="">
            <p className="ml-3 mt-2 w-72">
              <Translate>Do you need delivery?</Translate>
            </p>
            <div className="mt-4">
              <label className="flex gap-4 cursor-pointer font-bold">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="yes"
                  checked={delivery === true}
                  onChange={() => setDelivery(true)}
                  className="w-6 h-6"
                />
                <p>
                  <Translate>Yes</Translate>
                </p>
              </label>
            </div>
            <div>
              <label className="flex gap-4 cursor-pointer font-bold">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="self_delivery"
                  checked={delivery === false}
                  onChange={() => setDelivery(false)}
                  className="w-6 h-6"
                />
                <p>
                  <Translate>No, I want to deliver it myself.</Translate>
                </p>
              </label>
            </div>
          </div>
          <div className="flex">
            <label className="flex gap-4 cursor-pointer">
              <input
                type="checkbox"
                className="w-6 h-6 "
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <p>
                <Translate>Accept Our </Translate>
              </p>
            </label>
            <span
              className="text-[#F13B48] underline cursor-pointer mx-1 "
              onClick={() => setModalShow(true)}
            >
              <Translate>Terms & Conditions</Translate>
            </span>
          </div>
          <AcceptTerms show={modalShow} onHide={() => setModalShow(false)} />
          <div
            className=" w-[50%]
          mx-auto flex justify-center max-mob1:w-80 max-mob3:w-64 pb-14 mt-10
          "
          >
            <button
              className={`rounded-full w-48 h-12 ${
                isFormValid
                  ? "bg-[#F13B48] text-white"
                  : "bg-gray-200 text-gray-700 cursor-not-allowed"
              }`}
              disabled={!isFormValid || loading}
            >
              <Translate>{loading ? "Loading..." : "Submit"}</Translate>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DonateYourWay;
