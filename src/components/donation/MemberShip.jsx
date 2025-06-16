import React, { useCallback, useEffect, useState } from "react";
import police from "../../images/police.png";
import lady from "../../images/lady.png";
import FormSelect from "../sponsorships/FormSelect";
import axios from "axios";
import { Translate, useLanguage } from "translate-easy";
import { SuccessAlert } from "../Alert";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";

const MemberShip = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessContactName, setBusinessContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [signature, setSignature] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [donation, setDonation] = useState(null);
  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleDayChange = (e) => setSelectedDay(e.target.value);

  // const yearOptions = Array.from({ length: 100 }, (_, i) => {
  //   const year = new Date().getFullYear() - i;
  //   return { value: year, label: year };
  // });
  const yearOptions = Array.from({ length: 2050 - 2010 + 1 }, (_, i) => {
    const year = 2010 + i;
    return { value: year, label: year };
  });
  
  const monthOptions = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const donationArray = [
    { text: "Larg Businesses turnover over $500,000", amount: 350 },
    {
      text: "Medium Business with turnover over $100,000 & under$500,000",
      amount: 240,
    },
    {
      text: "Small Business with turnover under $100,000 . New Start-Ups.",
      amount: 120,
    },
  ];
  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1),
  }));

  const isFormValid =
    businessName &&
    businessContactName &&
    email &&
    phonenumber &&
    address &&
    website &&
    signature &&
    date &&
    donation &&
    details;

  const formatDate = (day, month, year) => {
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      setDate(formatDate(selectedDay, selectedMonth, selectedYear));
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  const donate = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoading(true);

        await axios.post(
          "https://naaworld.uk/api/v1/memberShipForm",
          {
            businessName,
            businessContactName,
            email,
            address,
            phonenumber,
            website,
            signature,
            date,
            donation,
            details,
          },
          {
            headers: {
              "X-API-KEY": "naa246lan",
            },
          }
        );
        SuccessAlert({
          title: "Success",
          text: "Your membership done successfully",
        });
        setBusinessName("");
        setBusinessContactName("");
        setEmail("");
        setAddress("");
        setPhonenumber("");
        setWebsite("");
        setSignature("");
        setDate("");
        setSelectedDay("");
        setSelectedMonth("");
        setSelectedYear("");
        setDonation("");
        setDetails("");
        if (isFormValid) {
          Navigate("/Complete-Donation", { state: { donation } });
        }
      } catch (error) {
        console.error("Error in membership:", error);
      } finally {
        setLoading(false);
      }
    },
    [
      businessName,
      businessContactName,
      email,
      phonenumber,
      address,
      website,
      signature,
      date,
      donation,
      details,
    ]
  );

  const { selectedLanguage } = useLanguage();
  return (
    <div className="relative  dark:bg-[--black] dark:bg-opacity-4 dark:text-white ">
      <Helmet>
        <title>NAA World - Membership</title>
        <link rel="canonical" href={`https://naaworld.uk/membership`} />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div
        className="z-30 max-mob:after:-z-20 h-44 relative top-16 max-mob:top-12 max-mob2:top-8 mx-48 max-md:mx-36 max-tab:mx-16 max-mob1:mx-8 after:content-[''] after:absolute after:left-0 
            after:bottom-0 after:w-full after:h-0.5 after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out before:content-[''] 
            before:absolute before:left-[-.3rem] before:bottom-[-2px] before:w-2 before:h-2 before:bg-red-500 before:rounded-full "
      >
        <div
          className={`${
            selectedLanguage.code === "ar" ? "mr-5 max-mob:mr-10 " : ""
          }`}
        >
          <h1 className="font-bold max-mob:z-10">NAA World</h1>
          <h1 className="text-red-500 max-mob:z-10">
            <Translate>Membership</Translate>
          </h1>
        </div>

        <img
          src={police}
          alt="police"
          loading="lazy"
          className={`absolute w-80 z-20 
            ${
              selectedLanguage.code === "ar"
                ? "left-5  max-mob:-left-8"
                : "right-5 max-mob:-right-8"
            } 
            -bottom-36 max-mob3:-bottom-32 max-mob:-z-10`}
        />
      </div>
      <form
        className="relative z-20 max-md:overflow-x-hidden"
        onSubmit={donate}
      >
        <div className=" pt-28 mx-48 max-md:mx-36 max-tab:mx-16 max-mob1:mx-8 pb-3">
          <p className="text-xl font-extrabold ">
            <Translate>Personal Details</Translate>
          </p>
          <div className="mb-4">
            <label className="block ml-3 mt-2 " htmlFor="BusinessName">
              <Translate>Business Name</Translate>
            </label>
            <input
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="BusinessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="type here"
            />
          </div>

          <div className="mb-4">
            <label className="block ml-3 mt-2 " htmlFor="BusinessContact">
              <Translate>Business Contact Name</Translate>
            </label>
            <input
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="BusinessContact"
              value={businessContactName}
              onChange={(e) => setBusinessContactName(e.target.value)}
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
            <label className="block ml-3 mt-2 " htmlFor="Website">
              <Translate>Website</Translate>
            </label>
            <input
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="type here"
            />
          </div>
          <div className="mb-4">
            <p className="ml-3 mt-2 w-72 max-mob1:w-80 max-mob3:w-64 ">
              <Translate>
                What’s the main reason for you joining NAA WORLD Membership?
              </Translate>
            </p>
            <textarea
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-36 p-4 pl-3 mt-3 rounded-2xl border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="type here"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block ml-3 mt-2 " htmlFor="Signature">
              <Translate>Signature</Translate>
            </label>
            <input
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="Signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="type here"
            />
          </div>
          <div className="mb-4">
            <label className="block ml-3 mt-2 " htmlFor="date">
              <Translate>Date</Translate>
            </label>
            <div className="flex justify-start gap-3 w-[24rem] max-mob1:w-80 max-mob3:w-64 flex-wrap ">
              <FormSelect
                selectLabel="Select Day"
                handleChange={handleDayChange}
                options={dayOptions}
                value={selectedDay}
                name="day"
                headOption="Day"
              />
              <FormSelect
                selectLabel="Select Month"
                handleChange={handleMonthChange}
                options={monthOptions}
                value={selectedMonth}
                name="month"
                headOption="Month"
              />

              <FormSelect
                selectLabel="Select Year"
                handleChange={handleYearChange}
                options={yearOptions}
                value={selectedYear}
                name="year"
                headOption="Year"
              />
            </div>
          </div>

          <div
            className="max-md:after:-z-20 pb-10 max-mob:pb-72 relative after:content-[''] after:absolute 
          after:left-0 
          after:bottom-0 after:w-full after:h-0.5 after:bg-red-500 after:transition-all after:duration-500 
          after:ease-in-out before:content-[''] before:absolute before:left-[-.3rem] before:top-[95%] max-mob:before:top-[100%]
          before:w-2 before:h-2 before:bg-red-500 before:rounded-full before:-translate-y-1/2"
          >
            <img
              src={lady}
              alt="lady"
              loading="lazy"
              className={`absolute w-[470px] -bottom-24 z-20 
                ${
                  selectedLanguage.code === "ar"
                    ? "left-0 max-md:left-[-8rem] tab2:left-[-10rem] "
                    : "right-0 max-md:right-[-12rem] tab2:right-[-10rem] "
                } 
                max-mob1:w-48
                max-md:-z-10 max-mob:right-[0rem]  max-mob3:right-[-1.5rem]
                max-mob:bottom-[-2rem] 
                `}
            />

            <div
              className={`absolute before:content[''] before:absolute before:border-l-[60px] 
                  before:border-l-transparent before:border-r-[3px] before:border-r-transparent
                  before:border-t-[40px] before:rounded-lg before:border-t-[#F5ADAB] 
                  before:-bottom-7 before:left-8 
                  p-4 max-w-56 flex justify-center items-center h-44 bg-[#F5ADAB] 
                  rounded-tl-[100px] rounded-bl-[60px] 
                  rounded-tr-[80px] rounded-br-[80px] 
                  bottom-[370px] shadow-md shadow-gray-600 
                  
                ${
                  selectedLanguage.code === "ar"
                    ? "  left-10 max-md:left-[6rem] max-mob:left-[6rem]  max-mob2:left-[3rem]  max-tab:left-[-2rem] tab2:left-[-8rem] tab2:bottom-[25rem] "
                    : "  right-40 max-md:right-[6rem] max-mob:right-[6rem] max-mob2:right-[4rem] max-tab:right-[-1rem] tab2:right-[0rem] tab2:z-50 tab2:bottom-[26rem]"
                }
                  max-mob1:h-36 max-mob1:w-44
                  max-tab:bottom-[26rem]
                  max-mob:bottom-[9rem]
                  max-mob2:bottom-[10.5rem]
                  max-md:-z-10 text-center`}
            >
              <p className="text-gray-700 text-lg">
                <Translate>
                  *We will be in touch to process the payment
                </Translate>
              </p>
            </div>
          </div>

          <div className="my-32 max-tab:my-20">
            <p className="text-xl w-1/3 font-extrabold max-mob:w-3/4  ml-3">
              <Translate>
                Pricing for NAA WORLD Annual membership , Please Choose from
                below options.
              </Translate>
            </p>
            <div className="flex justify-center items-center gap-32 mt-5 max-md:flex-wrap ">
              {donationArray.map((donate) => (
                <div
                  key={donate.amount}
                  className="w-64 dark:bg-[--black] dark:bg-opacity-4 h-[45vh]
                tab1:h-[27vh]
                tab2:h-[27vh]
                tab3:h-[27vh]
                 moblg:h-[21rem] mobl:h-[21rem]
                 larg:h-[38vh] shadow-md shadow-gray-700 p-4 rounded-t-full relative flex justify-center  items-center text-xl"
                >
                  <ul className="list-disc m-0">
                    <li className="m-0">
                      <Translate>{donate.text}</Translate>
                    </li>
                  </ul>
                  <button
                  type="button"
                    onClick={() => setDonation(donate.amount)}
                    className={`absolute w-40 -bottom-8 
                     ${
                       donation === donate.amount
                         ? "bg-[#FEA4A4]"
                         : "bg-[#FDE2E4]"
                     } text-black font-bold py-3 rounded-full`}
                  >
                    ${donate.amount}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* <PaymentDetails /> */}

          <div className="flex justify-center max-mob1:w-80 max-mob3:w-64 pb-14 mt-10">
            <button
            type="submit"
              className={`rounded-full w-48 h-12 ${
                isFormValid
                  ? "bg-[#F13B48] text-white"
                  : "bg-gray-200 text-gray-700 cursor-not-allowed"
              }`}
              disabled={!isFormValid || loading}
            >
              <Translate>{loading ? "Loading..." : "Submit"}</Translate>
            </button>{" "}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MemberShip;
