import React, { useState } from "react";
import zona from "../../images/zona.png";
import gift from "../../images/Group 83.svg";
import axios from "axios";
import { Translate, useLanguage } from "translate-easy";
import Cookies from "js-cookie";
import AcceptTerms from "../AcceptTerms";
import { SuccessAlert } from "../Alert";
import { Helmet } from "react-helmet-async";
const GiftAid = () => {
  const [modalShow, setModalShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { selectedLanguage } = useLanguage();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid =
    firstname &&
    lastname &&
    email &&
    phonenumber &&
    address &&
    postcode &&
    isChecked;

  const donate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        "https://naaworld.uk/api/v1/giftAidForm",
        { firstname, lastname, email, phonenumber, address, postcode },
        {
          withCredentials: true,
          headers: {
            "X-CSRF-Token": Cookies.get("_coo_123"),
            "X-API-KEY": "naa246lan",
          },
        }
      );
      SuccessAlert({ title: "Success", text: "Your refer done successfully" });
    } catch (error) {
      console.error("Error complete donate:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative dark:bg-[--black] dark:bg-opacity-4 dark:text-white">
      <Helmet>
        <title>NAA World - Gift Aid</title>
        <link rel="canonical" href={`https://naaworld.uk/Gift-Aid`} />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div className="mx-auto w-[50%] max-tab:w-[70%] pt-20 max-mob1:pt-3">
        <h1 className="text-[#D93541] text-center font-bold  ">
          <Translate>Give more with Gift Aid</Translate>
        </h1>
        <div
          className=" rounded-full p-2 relative dark:text-white z-20 bg-[--black] dark:bg-opacity-4 max-mob:mt-10 w-[95%] max-mob1:w-[100%]"
          style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.9)" }}
        >
          <p className="w-[80%] max-tab:w-[75%] max-mob:w-[80%]  my-5 mx-auto">
            <Translate>
              Make your donation go further for young people at no extra cost to
              you. If you are a UK taxpayer and agree to Gift Aid your donation,
              NAA WORLD can reclaim the tax on your gift. For eligible
              donations, this increases the value of your donation by 25p for
              each $1 you give. You can make a Gift Aid declaration now using
              the form below.
            </Translate>
          </p>
        </div>
      </div>
      <div
        className="mx-32 tab2:mx-16   max-mob1:mt-0 pt-28 max-mob1:pt-12 max-md:mx-36 max-tab:mx-16 max-mob1:mx-8 mt-5 pb-14 relative 
      after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 
      after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out before:content-[''] 
      before:absolute before:-left-1 before:-bottom-1 before:w-2 before:h-2 before:bg-red-500 before:rounded-full 
      max-mob1:pb-20 max-mob1:mb-40 max-mob1:after:-bottom-40 max-mob1:before:-bottom-[10.2rem]"
      >
        <h2 className="font-bold max-mob1:mb-5">
          <Translate>With Gift Aid:</Translate>
        </h2>
        <div className="mx-auto tab2:gap-20 flex justify-center max-mob1:flex-wrap text-black items-center gap-36 max-mob1:gap-10">
          <div
            className="rounded-full z-20 bg-[#F9B8B4F2] shadow-md shadow-gray-500 w-60 h-20 text-center p-3 flex justify-center items-center 
          max-tab:h-32 "
          >
            <p className=" mt-3">
              <Translate>A $20 donation becomes $25</Translate>
            </p>
          </div>
          <div
            className="rounded-full z-20 bg-[#F9B8B4F2] shadow-md shadow-gray-500 w-60 h-20 text-center p-3 flex justify-center items-center 
          max-tab:h-32"
          >
            <p className=" mt-3">
              <Translate>A $100 donation becomes $125</Translate>
            </p>
          </div>
          <div
            className="rounded-full z-20 bg-[#F9B8B4F2] shadow-md shadow-gray-500 w-60 h-20 text-center p-3 flex justify-center items-center 
          max-tab:h-32"
          >
            <p className=" mt-3">
              <Translate>A $5,000 donation becomes $6,250</Translate>
            </p>
          </div>
        </div>
        <img
          src={zona}
          alt="zona"
          loading="lazy"
          className={`absolute w-64 -bottom-16 max-mob:bottom-[-14rem] 
            ${
              selectedLanguage.code === "ar"
                ? "-left-14 max-md:left-24 max-tab:left-14 max-mob1:left-10 max-mob2:left-5 max-mob3:left-0 tab1:left-[10rem] moblg:left-[9rem] mobl:left-[9rem] "
                : "-right-14 max-md:right-24 max-tab:right-14 max-mob1:right-10 max-mob2:right-5 max-mob3:right-0 tab1:right-[10rem] moblg:right-[9rem] mobl:right-[9rem] "
            }`}
        />
      </div>
      <form className="relative z-20" onSubmit={donate}>
        <div className=" max-mob1:mt-0 pb-3 pt-28 max-mob1:pt-12 mx-48 max-md:mx-36 max-tab:mx-16 max-mob1:mx-8">
          <p className="text-xl font-extrabold">
            <Translate>
              Thank you for deciding to Gift Aid your donations to NAA WORLD
            </Translate>
          </p>
          <p>
            <Translate>Gift Aid is reclaimed by</Translate>{" "}
            <span className="font-bold">NAA WORLD</span>{" "}
            <Translate>
              from the tax you pay for the current tax year. There is no extra
              cost to you.
            </Translate>
          </p>

          <label className="flex gap-4 cursor-pointer">
            <input type="checkbox" className="w-6 h-6" />
            <p className="w-2/3">
              <Translate>I wish</Translate>{" "}
              <span className="font-bold">NAA WORLD</span>{" "}
              <Translate>
                to Gift Aid any donations I may make in the future, and all
                donations I have made in the past four years. I am a UK taxpayer
                and understand that if I pay less Income Tax and/or Capital
                Gains Tax than the amount of Gift Aid claimed on all of my
                donations in that tax year it is my responsibility to pay any
                difference. The Prince’s Trust will be able to reclaim 25p for
                each $1 I have been able to donate.
              </Translate>
            </p>
          </label>
          <p>
            <Translate>
              Please let us know if you change your name, address or no longer
              pay enough tax. You can cancel your declaration at any time.
            </Translate>
          </p>
          <p className="text-xl font-extrabold">
            <Translate>Personal Details</Translate>
          </p>
          <div className="mb-5">
            <label className="block ml-3 mt-2 " htmlFor="firstName">
              <Translate>First Name</Translate>
            </label>
            <input
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="firstName"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              placeholder="type here"
            />
          </div>
          <div
            // className="absolute top-1/4 right-32 w-[330px] max-tab:right-2 max-mob:top-[35%] h-[480px]  bg-cover bg-center -z-20"
            // style={{ backgroundImage: `url(${gift})` }}
            className={`absolute top-1/4 
              ${
                selectedLanguage.code === "ar"
                  ? "left-32 max-tab:left-2"
                  : "right-32 max-tab:right-2"
              } 
              w-[330px] max-mob:top-[35%] h-[480px] bg-cover bg-center -z-20`}
            style={{ backgroundImage: `url(${gift})` }}
          />
          <div className="mb-5">
            <label className="block ml-3 mt-2 " htmlFor="lastName">
              <Translate>Last Name</Translate>
            </label>
            <input
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="lastName"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              placeholder="type here"
            />
          </div>
          <div className="mb-5">
            <label className="block ml-3 mt-2 " htmlFor="email">
              <Translate>Email</Translate>
            </label>
            <input
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="type here"
            />
          </div>
          <div className="mb-5">
            <label className="block ml-3 mt-2 " htmlFor="Phone">
              <Translate>Phone Number</Translate>
            </label>
            <input
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="Phone"
              value={phonenumber}
              onChange={(e) => {
                setPhonenumber(e.target.value);
              }}
              placeholder="type here"
            />
          </div>
          <div className="mb-5">
            <label className="block ml-3 mt-2 " htmlFor="Address">
              <Translate>Address</Translate>
            </label>
            <input
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="type here"
            />
          </div>
          <div className="mb-5">
            <label className="block ml-3 mt-2 " htmlFor="Post">
              <Translate>Post Code</Translate>
            </label>
            <input
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="Post"
              value={postcode}
              onChange={(e) => {
                setPostcode(e.target.value);
              }}
              placeholder="type here"
            />
          </div>
          <p className="w-2/3">
            <Translate>
              You are able to cancel this declaration at any time by emailing
              NAAWORLD@..uk Keeping in touch. We’d love to share inspiring
              stories of young lives changed and let you know more ways you can
              get involved.
            </Translate>
          </p>
          <label className="flex gap-4 cursor-pointer font-bold">
            <input type="checkbox" className="w-6 h-6" />
            <p>
              <Translate>Email updates</Translate>
            </p>
          </label>
          <p className="w-2/3">
            <Translate>
              You can tailor your communication preferences, or unsubscribe at
              any time by using the link at the bottom of any email we send. We
              promise not to share your details with anyone else for marketing
              purposes and you can stop receiving communications at any time. To
              change the way we contact you get in touch on 020 7543 1384 or
              at hello@princes-trust.org.uk To understand how we will store and
              use your details please see our  privacy policy.
            </Translate>
          </p>

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
          <div className="ml-auto w-fit pb-14 mt-10">
            <button
              className={`rounded-full w-48 h-12  ${
                isFormValid
                  ? "bg-[#F13B48] text-white"
                  : "bg-gray-200 text-gray-700 cursor-not-allowed"
              }`}
              disabled={!isFormValid || loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GiftAid;
