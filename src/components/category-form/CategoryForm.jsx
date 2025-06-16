import React, { useState } from "react";
import man from "../../images/man.png";
import backgroundImage from "../../images/lines-bg.svg";
import nuts from "../../images/event.svg";
import axios from "axios";
import { Translate, useLanguage } from "translate-easy";
import AcceptTerms from "../AcceptTerms";
import Cookies from "js-cookie";
import { ErrorAlert, SuccessAlert } from "../Alert";
import { Helmet } from "react-helmet-async";
const CategoryForm = () => {
  const [modalShow, setModalShow] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
        "https://naaworld.uk/api/v1/referPerson",
        { firstname, lastname, email, phonenumber, address, details },
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
    <div>
      <Helmet>
        <title>NAA World - Category</title>
        <link rel="canonical" href={`https://naaworld.uk/category`} />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div
        className="absolute inset-0 bg-cover bg-center z-20 dark:opacity-10 dark:bg-[--black]"
        style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.2 }}
      />
      {/* <div className="bg-[#F9B8B4] pt-2 rounded-full absolute top-12 right-1 z-50">
        <div className="  flex flex-col w-16 justify-center items-center z-40">
          <Header />
          <div className="w-16 h-0.5 bg-red-600 my-2"></div>
          <LanguageSelector />
        </div>
      </div> */}
      <div className="relative dark:bg-[--black] dark:text-white">
        <div
          className={`absolute top-1/3 bg-cover w-48 h-48 ${
            selectedLanguage.code === "ar" ? "left-28" : "right-28"
          } bg-center z-20`}
          style={{ backgroundImage: `url(${nuts})` }}
        />
        <div className="mx-auto relative z-20 w-fit pt-20 ">
          <h1
            className={`text-[#D93541] text-center font-bold ${
              selectedLanguage.code === "ar"
                ? "ml-20 max-mob1:ml-0"
                : "mr-20 max-mob1:mr-0"
            } max-mob1:mb-24`}
          >
            <Translate>Refer a person in need</Translate>
          </h1>
          <div
            className=" dark:bg-[--black] rounded-full p-2 relative max-mob1:mx-5"
            style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.9)" }}
          >
            <img
              src={man}
              alt="man"
              loading="lazy"
              className={`w-48 absolute -top-[122px] -z-50 ${
                selectedLanguage.code === "ar" ? "left-[13px]" : "right-[13px]"
              } max-mob1:${
                selectedLanguage.code === "ar" ? "left-[33px]" : "right-[33px]"
              } max-mob1:-z-10`}
            />
            <p
              className={`w-2/3 my-5 ${
                selectedLanguage.code === "ar" ? "mr-5" : "ml-5"
              } z-20`}
            >
              <Translate>
                You can help a person in need that you know by refering him to
                us so we can reach him.
              </Translate>
            </p>
          </div>
        </div>
        <form className="relative z-20" onSubmit={donate}>
          <div className="pt-28 max-mob1:pt-16 pb-3 mx-48 max-md:mx-36 max-tab:mx-16 max-mob1:mx-8">
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
                <Translate>Phone</Translate>
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
              <p className="block ml-3 mt-2 w-72 max-mob1:w-72 max-mob3:w-60 ">
                <Translate>
                  Can you please, tell us the story about the person you think
                  he need our help?
                </Translate>
              </p>
              <textarea
                className="max-mob1:w-80 max-mob3:w-64 w-96 h-36 p-4 pl-3 mt-3 rounded-2xl border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                type="text"
                value={details}
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
                placeholder="type here"
              ></textarea>
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
            <div className="mx-auto flex justify-center w-[23rem] max-mob1:w-80 max-mob3:w-64 pb-14 mt-10">
              <button
                className={` rounded-full w-48 h-12 ${
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
    </div>
  );
};

export default CategoryForm;
