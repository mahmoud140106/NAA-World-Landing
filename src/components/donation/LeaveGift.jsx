import React, { useState } from "react";
import gift from "../../images/present.svg";
import tant from "../../images/tant.png";
import tnt from "../../images/tnt.png";
import nuts from "../../images/event.svg";
import Cookies from "js-cookie";
import axios from "axios";
import { Translate, useLanguage } from "translate-easy";
import AcceptTerms from "../AcceptTerms";
import { ErrorAlert, SuccessAlert } from "../Alert";
import { Helmet } from "react-helmet-async";
const LeaveGift = () => {
  const [modalShow, setModalShow] = useState(false);
  const { selectedLanguage } = useLanguage();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const isFormValid =
    firstname && lastname && email && phonenumber && isChecked;
  const donate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        "https://naaworld.uk/api/v1/giftInWillForm",
        { firstname, lastname, email, phonenumber },
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
  return (
    <div className="w-full mx-auto relative dark:bg-[--black] dark:bg-opacity-4 max-mob1:overflow-x-hidden ">
      <Helmet>
        <title>NAA World - Leave a gift</title>
        <link rel="canonical" href={`https://naaworld.uk/Leave-a-gift`} />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div className="mx-48 max-md:mx-36 max-tab:mx-16 max-mob1:mx-3 ">
        <div
          dir="ltr"
          className={`bg-[#FEEBEDC7] mx-auto max-lg:py-5 max-md:py-5 max-mob1:py-0 w-[100%] 
        shadow-md shadow-gray-500 rounded-[50px] relative top-6 after:content[""]
         after:h-full after:absolute after:top-0 after:right-28 after:w-6 after:bg-red-600 z-30
          max-mob:after:-z-10 `}
        >
          <h1 className="w-1/2 max-mob1:w-3/4 py-4 px-20 max-md:px-5 max-tab:px-4 max-mob:z-40">
            <Translate>Be there for a young person through</Translate>{" "}
            <span className="text-red-500 font-bold">
              <Translate>a gift in your Will.</Translate>
            </span>
          </h1>
          <div className="h-6 w-full bg-red-600"></div>
          <img
            src={gift}
            alt="gift"
            loading="lazy"
            className="absolute right-12 top-[33%] z-10 max-mob:-z-0"
          />
          <img
            src={tant}
            alt="gift"
            loading="lazy"
            className={`absolute w-60  max-mob1:w-48 ${
              selectedLanguage.code === "ar"
                ? " right-1/4 -top-0  max-tab:top-[1.8rem] max-mob1:-right-10 z-10 max-mob1:top-[-1rem] max-mob2:top-[-1rem] max-mob3:top-[1rem] tab1:top-[-.8rem] tab2:top-[1.8rem] moblg:top-[-1.2rem] mobl:top-[-1.2rem] "
                : " right-1/4 top-10 larg:top-0  max-tab:top-[1.8rem] max-mob1:-right-10 z-10 max-mob1:top-[1rem] max-mob2:top-[3rem] tab1:top-[1.8rem] tab2:top-[3.8rem] "
            }  `}
          />
          <p className="w-1/2 max-mob:relative max-mob1:w-3/4 py-4 px-20 max-md:px-5 max-tab:px-4 text-lg max-mob:z-40">
            <Translate>Through a gift in your Will to </Translate>
            <span className="font-bold">NAA WORLD</span>{" "}
            <Translate>
              your belief in young people will live on. You will be creating a
              turning point for a young person that enables them to change their
              life for the better.
            </Translate>
          </p>
        </div>
        <div
          className="relative dark:text-white z-50 py-10 after:content-[''] after:absolute after:left-0 
        after:bottom-0 after:w-full after:h-0.5 after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out before:content-[''] before:absolute 
        pb-5 before:left-0 before:bottom-[2px] before:w-2 before:h-2 before:bg-red-500 before:rounded-full before:translate-y-2/3"
        >
          <p className="text-xl font-extrabold pt-4 max-mob1:px-2">
            <Translate>Why leave a legacy gift for young people?</Translate>
          </p>
          <p className="max-mob1:px-2">
            <Translate>
              Many young people grow up facing disadvantage. They may experience
              a chaotic home life, having to be a young carer, losing someone
              they relied on, and other forms of adversity. They may be
              struggling with a crushing lack of confidence, anxiety or a
              feeling that they aren’t worth anything. These young people
              desperately need a turning point – an intervention that shows them
              how much they actually do have to offer the world. They need the
              support to channel their potential. And they deserve the
              opportunity to build the confidence and skills they need to live,
              learn and earn a good living. You can help give a struggling young
              person self-belief and confidence, often for the first time in
              their life, through a gift in your Will to The Prince’s Trust.
              You'll be helping them see that they are good enough. That they
              can achieve something at school or on a course or work experience
              programme. You'll be ensuring they have smart clothes for an
              interview – and showing them that they can get that first job.
            </Translate>
          </p>
        </div>
        <p className="text-xl font-extrabold mt-3 dark:text-white pt-4 max-mob1:px-2">
          <Translate>Get in touch</Translate>
        </p>
        <p className="dark:text-white max-mob1:px-2">
          <Translate>If you have left a gift to </Translate>
          <span className="font-bold">NAA WORLD</span>
          <Translate>
            {" "}
            in your Will, please do contact us to let us know. We would love to
            thank you for your pledge and keep you up to date on our work. Our
            Legacies team is also here to answer any questions you may have
            about legacy giving. To contact us,Please fill the following form:
          </Translate>
        </p>
        <form
          onSubmit={donate}
          className="relative max-mob1:px-2 z-30 dark:text-white after:content-[''] my-10 after:absolute after:left-0 
          after:bottom-0 after:w-full after:h-0.5 after:bg-red-500 after:transition-all after:duration-500 
          after:ease-in-out before:content-[''] before:absolute pb-[1.25rem] before:left-[-.3rem] before:-bottom-1  mob-x:pb-[11rem] mob-x2:pb-[11rem]
          before:w-2 before:h-2 before:bg-red-500 before:rounded-full max-mob1:after:-z-30 moblg:mb-[5rem]  mobl:mb-[5rem] "
        >
          <div
            className={`absolute -top-0 -z-10 
        ${
          selectedLanguage.code === "ar"
            ? "-left-0 max-tab:left-[-40px]"
            : "-right-0 max-tab:right-[-40px]"
        } 
        max-mob1:-right-5`}
          >
            <img src={nuts} alt="nuts" />
          </div>
          <div className="mt-10 mb-3">
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
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="type here"
              />
            </div>
            <div
              className={`absolute -bottom-48 
                ${
                  selectedLanguage.code === "ar"
                    ? "-left-24 max-tab:left-[3rem] max-mob1:left-4"
                    : "-right-24  max-tab:right-[3rem] max-mob1:-right-2"
                } max-tab:h-[410px] moblg:h-[320px] moblg:bottom-[-7rem] mobl:h-[320px] mobl:bottom-[-7rem]
                w-[24rem] h-[490px] bg-cover bg-center z-40 max-mob:-z-10 tab3:bottom-[-12rem]
                max-tab:w-28 max-tab:bottom-[-10rem]  max-mob1:bottom-[-7rem]  mob-x:bottom-[-10rem] mob-x2:bottom-[-10rem]
                max-mob2:right-[1.5rem] max-mob3:right-[2.5rem]`}
              style={{ backgroundImage: `url(${tnt})` }}
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
                onChange={(e) => setLastname(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPhonenumber(e.target.value)}
                placeholder="type here"
              />
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
            <div className="flex justify-center w-[23rem] max-mob1:w-80 max-mob3:w-64  mt-10 z-30">
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
        <p className="text-xl font-extrabold dark:text-white z-40 max-mob1:px-2">
          <Translate>Our legacy promise</Translate>
        </p>
        <p className="text-lg dark:text-white z-40 max-mob1:px-2">
          <Translate>
            Here are the promises that we make when you choose to leave a gift
            toNAA World in your Will:
          </Translate>
        </p>
        <ul className="list-disc text-lg pb-5 mb-0 dark:text-white z-40 ">
          <li>
            <Translate>
              Your privacy is important, and any information you provide will be
              held in the strictest confidence.
            </Translate>
          </li>
          <li>
            <Translate>
              We understand and respect that your family and friends come first.
            </Translate>
          </li>
          <li>
            <Translate>
              Your gift will be used wisely and with care, helping young people
              in the most effective and efficient way possible.
            </Translate>
          </li>
          <li>
            <Translate>
              If you would like to tell us about your gift, we very much look
              forward to thanking you. At any point in the future, you of course
              have the absolute right to change your mind.
            </Translate>
          </li>
          <li>
            <Translate>
              We will ensure we keep in touch with you as you wish. You and your
              family will always be welcome to visit our work.
            </Translate>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeaveGift;
