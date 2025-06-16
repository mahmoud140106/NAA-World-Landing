import React, { useEffect, useState } from "react";
import tree from "../../images/Group 115 (1).svg";
import EventGirl from "../../images/EventGirl.svg";
import Eventbg from "../../images/event.svg";

import {  MdKeyboardArrowDown } from "react-icons/md";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Translate, useLanguage } from "translate-easy";
import { ErrorAlert, SuccessAlert } from "../Alert";
import { Helmet } from "react-helmet-async";

const BookSeat = () => {
  const location = useLocation();
  const workshop = location.state?.workshop;
  const event = location.state?.event;

  const [country, setCountry] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const isFormValid =
    firstname &&
    lastname &&
    email &&
    phonenumber &&
    address &&
    postcode &&
    city &&
    country;
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://naaworld.uk/api/v1/countries`,
          {
            withCredentials: true,
            headers: {
              "X-API-KEY": "naa246lan",
            },
          }
        );
        setOptions(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchCountry();
  }, []);
  const donate = async (e) => {
    e.preventDefault();
    try {
      const EXRate = await axios.get(
        `https://v6.exchangerate-api.com/v6/773e0e7e5870b9f10ddab3aa/latest/USD`
      );
      const rate = EXRate.data.conversion_rates["EGP"];
      // console.log(parseInt(workshop?.priceAfterDiscount * 100 * rate));
      // console.log(workshop?.price * 100 * rate);
      setLoading(true);
      const formType = workshop ? "workShopForm" : event ? "eventForm" : "";
      if (workshop?.isFree || event?.isFree) {
        await axios.post(
          `https://naaworld.uk/api/v1/${formType}`,
          {
            workshopId: workshop?._id,
            eventId: event?._id,
            firstname,
            lastname,
            email,
            phonenumber,
            address,
            city,
            postcode,
            country,
          },
          {
            headers: {
              "X-API-KEY": "naa246lan",
            },
          }
        );
        SuccessAlert({
          title: "Success",
          text: "Your booking done successfully",
        });
      } else {
        const requestData = {
          amount: parseInt(
            workshop?.priceAfterDiscount
              ? workshop?.priceAfterDiscount * 100 * rate
              : workshop?.price * 100 * rate || event?.priceAfterDiscount
              ? event?.priceAfterDiscount * 100 * rate
              : event?.price * 100 * rate
          ),
          currency: "EGP",
          payment_methods: [2992320, 2992321],
          items: [
            {
              name: workshop ? "workShopForm" : event ? "eventForm" : null,
              amount: parseInt(
                workshop?.priceAfterDiscount
                  ? workshop?.priceAfterDiscount * 100 * rate
                  : workshop?.price * 100 * rate || event?.priceAfterDiscount
                  ? event?.priceAfterDiscount * 100 * rate
                  : event?.price * 100 * rate
              ),
              description: workshop?.description || event?.description,
              quantity: 1,
            },
          ],
          billing_data: {
            first_name: firstname,
            last_name: lastname,
            phone_number: phonenumber,
          },
          extras: {
            workshopId: workshop?._id,
            eventId: event?._id,
            firstname,
            lastname,
            email,
            phonenumber,
            address,
            city,
            country,
            postcode,
            routeName: workshop ? "workShopForm" : event ? "eventForm" : null,
          },
        };

        const response = await axios.post(
          "https://accept.paymob.com/v1/intention/",
          requestData,
          {
            headers: {
              Authorization: `Token ${process.env.REACT_APP_PAYMOB_TOKEN}`,
            },
          }
        );

        console.log("Paymob response:", response.data);

        window.location.href = `https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_live_VtdlVZz5UZXFmIVG1B3xJLgk0qmHrv2c&clientSecret=${response.data.client_secret}`;
      }
    } catch (error) {
      console.error("Error complete donate:", error);
      ErrorAlert({
        text:
          error?.response?.data?.message || "An error occured! pleae try again",
      });
    } finally {
      setLoading(false);
    }
  };
  const { selectedLanguage } = useLanguage();
  return (
    <div className="relative overflow-hidden dark:bg-[--black] dark:bg-opacity-4 dark:text-white">
      <Helmet>
        <title>NAA World - Book Seat</title>
        <link rel="canonical" href={`https://naaworld.uk/BookSeat`} />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div className="mx-48 max-md:mx-36 max-tab:mx-16 max-mob1:mx-8 ">
        <div className="relative pb-5 pt-[10vh] z-30">
          <h2 className="font-bold">
            <Translate>Book your seat in</Translate>
          </h2>
          <h3 className="italic">
            <Translate>{workshop?.name || event?.name}</Translate>
          </h3>
        </div>
        <div
          className="relative pt-5 pb-5 z-30
        after:content-[''] after:absolute after:-left-0 after:top-0 after:w-[100%] after:h-0.5 
       after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out
        before:content-[''] before:absolute before:-left-0 before:top-0
        before:w-2 before:h-2 before:bg-red-500 
       before:rounded-full before:-translate-y-1/2
        "
        >
          <div
            className="relative z-30
          after:content-[''] after:absolute after:-left-0 after:top-[14.4rem] after:w-[100%] after:h-0.5 
after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out
 before:content-[''] before:absolute before:-left-0 before:top-[14.4rem]
 before:w-2 before:h-2 before:bg-red-500
  max-mob3:after:top-[21.4rem] max-mob3:before:top-[21.4rem]  
  max-mob2:after:top-[18.4rem] max-mob2:before:top-[18.4rem]  
before:rounded-full before:-translate-y-1/2
          "
          >
            <h4 className="font-bold">
              <Translate>
                Some information about{workshop?.name || event?.name}
              </Translate>{" "}
            </h4>
            <p className="py-3 w-[48rem] tab2:w-[26rem] max-md:w-[32rem] max-mob1:w-[18rem] max-mob2:w-[15rem] max-mob3:w-[13rem]">
              <Translate>
                {workshop?.description || event?.description}
              </Translate>
            </p>
            <div
              className={`absolute ${
                selectedLanguage.code === "ar"
                  ? "left-10 max-md:left-3 max-tab:-left-8 max-mob1:left-[-5rem] max-mob2:left-[-5.5rem] tab2:left-[-2rem]"
                  : "right-10 max-md:right-3 max-tab:-right-8 max-mob1:right-[-5rem] max-mob2:-right-16 tab2:right-[-2rem] "
              } -top-0 z-40  max-mob1:top-[3.2rem] max-mob2:top-[7.2rem] max-mob3:top-[10.2rem]`}
            >
              <img
                src={EventGirl}
                alt="EventGirl"
                width={200}
                className="max-mob1:h-[32vh] "
              />
            </div>
          </div>
        </div>
        <form className="relative z-30" onSubmit={donate}>
          <div
            className={`pt-28  max-mob2:pt-8 pb-3 
            ${
              selectedLanguage.code === "ar"
                ? "max-mob1:pt-12 max-mob2:pt-24 max-mob3:pt-28"
                : "max-mob1:pt-0"
            }
            `}
          >
            <div className="relative">
              <div
                className={`absolute ${
                  selectedLanguage.code === "ar"
                    ? "left-16 max-tab:left-0"
                    : "right-16 max-tab:right-0"
                } bottom-52 -z-10`}
              >
                <img
                  src={Eventbg}
                  alt="Eventbg"
                  // className={`${selectedLanguage.isRtl ? "rotate-180" : ""}`}
                />
              </div>
              <p className="text-xl font-extrabold ml-3 mb-3">
                <Translate>Personal Details</Translate>
              </p>
              <div className="mb-4">
                <label className="block ml-3 mt-2 " htmlFor="firstName">
                  <Translate>First Name</Translate>
                </label>
                <input
                  className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                  type="text"
                  id="firstName"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="type here"
                />
              </div>
              <div className="mb-4">
                <label className="block ml-3 mt-2 " htmlFor="lastName">
                  <Translate>Last Name</Translate>
                </label>
                <input
                  className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                  type="text"
                  id="lastName"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="type here"
                />
              </div>
              <div className="mb-4">
                <label className="block ml-3 mt-2 " htmlFor="email">
                  <Translate>Email</Translate>
                </label>
                <input
                  className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="type here"
                />
              </div>
              <div className="mb-4">
                <label className="block ml-3 mt-2 " htmlFor="Phone">
                  <Translate>Phone Number</Translate>
                </label>
                <input
                  className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                  type="text"
                  id="Phone"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  placeholder="type here"
                />
              </div>
              <div className="mb-4">
                <label className="block ml-3 mt-2 " htmlFor="Address">
                  <Translate>Address</Translate>
                </label>
                <input
                  className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                  type="text"
                  id="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="type here"
                />
              </div>
              <div className="mb-4">
                <label className="block ml-3 mt-2 " htmlFor="Address">
                  <Translate>Town/City</Translate>
                </label>
                <input
                  className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                  type="text"
                  id="Website"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="type here"
                />
              </div>
              <div className="relative mb-4 w-[23rem] max-mob1:w-80 max-mob3:w-64">
                <label className="block  mt-2 text-xl " htmlFor="Address">
                  <Translate>Country</Translate>
                </label>
                <select
                  className="
                max-mob1:w-80  max-mob3:w-64 w-96 py-2 pr-3 pl-6 mt-3 rounded-full border-gray-200 h-16
                border-1 border-solid shadow-md focus:outline-none text-gray-800 dark:text-black  text-xl
                appearance-none 
                "
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                >
                  <option value="" className="" disabled>
                    <Translate>Select</Translate>
                  </option>
                  {options?.map((option, index) => (
                    <option key={index} value={option.name}>
                      <Translate>{option.name}</Translate>
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none text-black font-bold">
                  <MdKeyboardArrowDown
                    className={`absolute top-[3.5rem] 
                    ${selectedLanguage.code === "ar" ? "left-1" : "right-1"}`}
                    size={32}
                  />
                </div>
              </div>
              <div className="mb-4 pb-4">
                <label className="block ml-3 mt-2 " htmlFor="Address">
                  <Translate>Post Code</Translate>
                </label>
                <input
                  className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                  type="text"
                  id=" PostCode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="type here"
                />
              </div>
            </div>
            <div>
              {" "}
              <div
                className="relative pt-4
             after:content-[''] after:absolute after:-left-0 after:top-0 after:w-[100%] after:h-0.5 
       after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out
        before:content-[''] before:absolute before:-left-0 before:top-0
        before:w-2 before:h-2 before:bg-red-500 
       before:rounded-full before:-translate-y-1/2
            "
              >
                <div
                  className={`absolute ${
                    selectedLanguage.code === "ar"
                      ? "-left-48 max-md:-left-36 max-tab:-left-16 max-mob1:-left-8"
                      : "-right-48 max-md:-right-36 max-tab:-right-16 max-mob1:-right-8"
                  } -top-5 -z-10`}
                >
                  <img
                    src={tree}
                    alt="tree"
                    className={` ${
                      selectedLanguage.isRtl ? "rotate-180" : ""
                    } w-72 max-mob1:w-64 `}
                  />
                </div>
              </div>
              <div className="flex justify-between ml-2 py-4 w-[23rem] text-lg max-mob1:w-80 max-mob3:w-64 ">
                <p className="font-bold">
                  <Translate>Total amount </Translate>
                </p>
                <p className="flex items-center justify-center">
                  $
                  {!workshop?.isFree && workshop?.priceAfterDiscount
                    ? workshop?.priceAfterDiscount
                    : workshop?.price ||
                      (!event?.isFree && event?.priceAfterDiscount)
                    ? event?.priceAfterDiscount
                    : event?.price || "0"}
                </p>
              </div>
              <p className="text-green-500 text-lg font-bold ml-2">
                <Translate>
                  *You will receive your ticket shortly on Email
                </Translate>
              </p>
              <div className="flex justify-center w-[23rem] max-mob1:w-80 max-mob3:w-64 pb-14 mt-10">
                <button
                  className={` rounded-full w-48 h-12 ${
                    isFormValid
                      ? "bg-[#F13B48] text-white"
                      : "bg-gray-200 text-gray-700 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid || loading}
                >
                  <Translate>{loading ? "Loading..." : "PAY NOW"}</Translate>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookSeat;
