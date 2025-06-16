import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import illian from "../../images/illian.svg";
import woman from "../../images/woman.svg";
import text from "../../images/text.svg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Translate, useLanguage } from "translate-easy";
import AcceptTerms from "../AcceptTerms";
import { Helmet } from "react-helmet-async";
const DonateOneTime = () => {
  const { selectedLanguage } = useLanguage();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [customAddress, setCustomAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const location = useLocation();
  const amount = location.state?.amount;
  const [isAddressDifferent, setIsAddressDifferent] = useState(false);
  const handleCheckboxChange = (e) => {
    setIsAddressDifferent(e.target.checked);
  };
  const isFormValid =
    firstname &&
    lastname &&
    email &&
    phonenumber &&
    address &&
    city &&
    country &&
    postcode;

  const Donate = async (e) => {
    e.preventDefault();
    try {
      const EXRate = await axios.get(
        `https://v6.exchangerate-api.com/v6/773e0e7e5870b9f10ddab3aa/latest/USD`
      );
      const rate = EXRate.data.conversion_rates["EGP"];
      setLoading(true);

      const requestData = {
        amount: parseInt(amount * 100 * rate),
        currency: "EGP",
        payment_methods: [2992320, 2992321],
        items: [
          {
            name: "donate one time",
            amount: parseInt(amount * 100 * rate),
            description: "donate",
            quantity: 1,
          },
        ],
        billing_data: {
          first_name: firstname,
          last_name: lastname,
          phone_number: phonenumber,
        },
        extras: {
          firstname,
          lastname,
          email,
          phonenumber,
          address,
          city,
          country,
          postcode,
          donate: amount,
          routeName: "DonateOneTimeForm",
        },
      };

      const response = await axios.post(
        "https://accept.paymob.com/v1/intention/",
        requestData,
        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_PAYMOB_TOKEN}`, // Your Paymob token here
          },
        }
      );

      window.location.href = `https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_live_VtdlVZz5UZXFmIVG1B3xJLgk0qmHrv2c&clientSecret=${response.data.client_secret}`;
    } catch (error) {
      console.error("Error during donation:", error);
    } finally {
      setLoading(false);
    }
  };

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
        console.log("country", response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchCountry();
  }, []);
  return (
    <div className="relative  dark:bg-[--black] dark:bg-opacity-4 text-[--text]">
      <Helmet>
        <title>NAA World - Donate one time</title>
        <link rel="canonical" href={`https://naaworld.uk/Donate-one-time`} />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div className=" mx-auto w-[65%] pt-20 max-tab:w-[80%] max-mob1:w-[85%] max-mob1:pt-3 ">
        <div className="flex justify-end p-2  ">
          <button className="z-30 rounded-full text-green-500 border-[3px] border-solid w-8 h-8 font-bold border-[--text] flex justify-center items-center">
            <FaCheck />
          </button>
          <IoIosArrowForward className="w-6 h-8 z-30" />
          <button className="z-30 rounded-full border-[3px] border-solid w-8 h-8 font-bold text-red-500 border-red-500">
            2
          </button>
          <IoIosArrowForward className="w-6 h-8 z-30" />
          <button className="rounded-full z-30 border-[3px] border-solid w-8 h-8 font-bold">
            3
          </button>
        </div>
        <h1 className="text-[#D93541] text-center font-bold mr-10 z-40">
          <Translate>Thank you</Translate>
        </h1>
        <div
          className="bg-white rounded-full p-2 relative mx-auto w-[90%] max-mob1:w-[100%] mt-4 z-20 text-black"
          style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.9)" }}
        >
          <p className=" my-5 mx-8 text-center  ">
            <Translate>
              Your donation today will give a young person the chance they
              deserve.
            </Translate>{" "}
            <Translate>You are making a one time donation of </Translate>$
            {amount}
          </p>
        </div>
        <div
          className="mb-10 relative z-20 py-16 after:content-[''] after:absolute after:-left-0 after:bottom-0 after:w-[100%] after:h-0.5 
       after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out after:-z-20
        before:content-[''] before:absolute before:-left-0 before:bottom-0 
        before:w-2 before:h-2 before:bg-red-500  max-mob:pb-36
       before:rounded-full before:translate-y-1/2"
        >
          <h3 className="font-bold mb-3">
            <Translate>Personal Details</Translate>
          </h3>
          <div className="mb-4">
            <label className="block mt-2 text-xl  " htmlFor="firstName">
              <Translate>First Name</Translate>
            </label>
            <input
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full  border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="firstName"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="type here"
            />
          </div>
          <div className="mb-4">
            <label className="block mt-2 text-xl " htmlFor="lastName">
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
            <label className="block  mt-2 text-xl " htmlFor="email">
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
            <label className="block  mt-2 text-xl " htmlFor="Phone">
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
            <label className="block mt-2 text-xl " htmlFor="Address">
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
            <label className="block  mt-2 text-xl " htmlFor="Address">
              <Translate>Town / City</Translate>
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
            <label className="block  mt-2 text-xl " htmlFor="Address">
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
          <div>
            <label className="flex gap-4 cursor-pointer">
              <input
                type="checkbox"
                className="w-6 h-6"
                checked={isAddressDifferent}
                onChange={handleCheckboxChange}
              />
              <p className="text-2xl">
                <Translate>I have different billing address</Translate>
              </p>
            </label>
          </div>
          {isAddressDifferent && (
            <div className="mb-4 pb-4">
              <label className="block mt-2 text-xl" htmlFor="Address">
                <Translate>Address</Translate>
              </label>
              <input
                className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                type="text"
                id="Address"
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                placeholder="type here"
              />
            </div>
          )}
          <img
            src={illian}
            alt="illian"
            className={`absolute -bottom-16 -z-10 max-mob1:w-48 max-mob1:-bottom-8 ${
              selectedLanguage.code === "ar"
                ? "left-0 max-mob1:left-[23%] tab2:left-[-5rem]"
                : "right-0 max-mob1:right-[23%] tab2:right-[-5rem]"
            }`}
          />
        </div>
        <div
          className="mb-16 relative z-20 py-10 after:content-[''] after:absolute after:-left-0 after:bottom-0 after:w-[100%] after:h-0.5 
       after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out
        before:content-[''] before:absolute before:-left-0 before:bottom-0
        before:w-2 before:h-2 before:bg-red-500 
       before:rounded-full before:translate-y-1/2"
        >
          <h3 className=" font-bold">
            <Translate>Let's Stay In Touch</Translate>
          </h3>
          <p className="text-xl ">
            <Translate>
              We'd love to share inspiring stories of the young lives you've
              helped change and let you know more ways you can get involved.
              Please use the boxes below to let us know how you'd like to hear
              from us:
            </Translate>
          </p>
          <div>
            <label className="flex gap-4 cursor-pointer">
              <input
                type="checkbox"
                name="contactMethod"
                value="email"
                className="w-6 h-6"
              />
              <p className="text-xl">
                <Translate>
                  EMAIL - Yes, I want to receive updates by email.
                </Translate>
              </p>
            </label>
          </div>
          <div>
            <label className="flex gap-4 cursor-pointer">
              <input
                type="checkbox"
                name="contactMethod"
                value="phone"
                className="w-6 h-6"
              />
              <p className="text-xl">
                <Translate>
                  PHONE - Yes, I'm happy to be called occasionally.
                </Translate>
              </p>
            </label>
          </div>

          <p className="text-xl">
            <Translate>
              From time to time, we might also contact you by post to share
              updates on our work and other ways you can help. If you do not
              want us to contact you via post or would like to check your
              communication preferences and change how we contact you, please
              get in touch with our Supporter Care team at hello@Naaworld.org.uk
              or on 0000000000. We'd love to hear from you!
            </Translate>
            <br />
            <Translate>
              To understand how we will store and use your details, please see
              our{" "}
            </Translate>
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => setModalShow(true)}
            >
              <Translate>Privacy Policy</Translate>
            </span>
          </p>
        </div>
        <AcceptTerms show={modalShow} onHide={() => setModalShow(false)} />
        <div className="flex justify-center w-[23rem] max-mob1:w-80 max-mob3:w-64 pb-14 mt-10 max-mob1:pb-[48vh]">
          <button
            type="button"
            className={` ${
              isFormValid
                ? "bg-[#F13B48] text-white"
                : "bg-gray-200 text-gray-700 cursor-not-allowed"
            } rounded-full w-48 h-12  flex items-center justify-center text-xl capitalize`}
            onClick={Donate}
            disabled={!isFormValid || loading}
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                <Translate>PAY NOW</Translate>$ {amount}
              </>
            )}
          </button>
        </div>
        <img
          src={woman}
          alt="woman"
          className={`absolute z-30 larg:w-96 bottom-[-15rem] ${
            selectedLanguage.code === "ar"
              ? "left-[14rem] max-md:left-[8rem] max-md:bottom-[-16rem] max-tab:left-16"
              : "right-[6rem] max-md:w-96 max-md:right-[2rem] max-md:bottom-[-13.5rem] max-tab:-right-0 larg:bottom-[-12rem]"
          }  max-mob1:-right-0 max-mob1:bottom-[-13rem] 
          max-mob3:bottom-[-10rem]`}
        />
        <img
          src={text}
          alt="text"
          className={`absolute -z-10 bottom-[8.5rem] ${
            selectedLanguage.code === "ar"
              ? "left-[20%] max-md:bottom-[7rem] max-tab:left-[16%] max-mob1:left-[15%] max-mob2:left-[10%] max-mob3:left-0  larg:bottom-[5rem] larg:left-[15%]"
              : "right-[20%] max-tab:bottom-[7rem] max-tab:right-[22%] max-mob1:right-[44%] max-mob2:right-[42%] larg:bottom-[8rem] larg:right-[16%]"
          } max-mob1:bottom-[9rem] max-mob2:bottom-[6rem]`}
        />
      </div>
    </div>
  );
};

export default DonateOneTime;
