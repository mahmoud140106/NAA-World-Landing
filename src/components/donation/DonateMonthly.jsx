import React, { useCallback, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import FormSelect from "../sponsorships/FormSelect";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import nuts from "../../images/event.svg";
import box from "../../images/Group 83.svg";
import cat from "../../images/شرشر الفضائى 1 1.svg";
import man from "../../images/ويزى 1.svg";
import axios from "axios";
import { Translate, useLanguage } from "translate-easy";
import { Helmet } from "react-helmet-async";
const DonateMonthly = () => {
  const { selectedLanguage } = useLanguage();

  const navigate = useNavigate();

  const donationData = [
    {
      amount: "5",
      text:
        "Over the next year, your $5 monthly donation could give a young person an online session with a support worker to develop their confidence, resilience, and motivation to build a brighter future.",
    },
    {
      amount: "25",
      text:
        "Over the next year, your $5 monthly donation could give a young person an online session with a support worker to develop their confidence, resilience, and motivation to build a brighter future.",
    },
    {
      amount: "10",
      text:
        "Over the next year, your $5 monthly donation could give a young person an online session with a support worker to develop their confidence, resilience, and motivation to build a brighter future.",
    },
    {
      amount: "50",
      text:
        "Over the next year, your $5 monthly donation could give a young person an online session with a support worker to develop their confidence, resilience, and motivation to build a brighter future.",
    },
  ];
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleDayChange = (e) => setSelectedDay(e.target.value);

  const yearOptions = Array.from({ length: 100 }, (_, i) => {
    const year = new Date().getFullYear() - i;
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

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1),
  }));

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [customAddress, setCustomAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [isAddressDifferent, setIsAddressDifferent] = useState(false);
  const [date, setDate] = useState("");

  const location = useLocation();
  const amount = location.state?.amount;
  const [otherAmount, setOtherAmount] = useState("");

  const handleCheckboxChange = (e) => {
    setIsAddressDifferent(e.target.checked);
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
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchCountry();
  }, []);
  const isFormValid =
    firstname &&
    lastname &&
    email &&
    phonenumber &&
    address &&
    city &&
    country &&
    postcode;

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
        
        const finalAmount = otherAmount ? otherAmount : amount;
        await axios.post(
          "https://naaworld.uk/api/v1/donateMonthlyForm",
          {
            firstname,
            lastname,
            email,
            donate: finalAmount,
            address,
            customAddress,
            phonenumber,
            city,
            postcode,
            country,
            date,
          },
          {
            headers: {
              "X-API-KEY": "naa246lan",
            },
          }
        );

        if (isFormValid) {
          navigate("/Complete-Donation", { state: { finalAmount } });
        }
      } catch (error) {
        console.error("Error creating donate:", error);
      } finally {
        setLoading(false);
      }
    },
    [
      firstname,
      lastname,
      email,
      phonenumber,
      address,
      city,
      country,
      postcode,
      isFormValid,
      navigate,
      customAddress,
      amount,
      otherAmount,
      selectedDay,
      selectedMonth,
      selectedYear,
    ]
  );

  return (
    <div className="relative   dark:bg-[--black] dark:bg-opacity-4 text-[--text]">
      <Helmet>
        <title>NAA World - Donate Monthly</title>
        <link rel="canonical" href={`https://naaworld.uk/Donate-monthly`} />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div
        className={`mx-auto w-[65%]  pt-20 max-tab:w-[80%] max-mob1:w-[85%] max-mob1:pt-3 
       ${selectedLanguage.code === "ar" ? "max-mob:overflow-x-hidden" : ""} 
         `}
      >
        <div className="flex justify-end p-2 z-30">
          <button className="rounded-full z-30 text-green-500 border-[3px] border-solid w-8 h-8 font-bold border-[--text] dark:border-white flex justify-center items-center">
            <FaCheck />
          </button>
          <IoIosArrowForward className="w-6 h-8 z-30" />
          <button className="rounded-full border-[3px] z-30 border-solid w-8 h-8 font-bold text-red-500 border-red-500">
            2
          </button>
          <IoIosArrowForward className="w-6 h-8 z-30" />
          <button className="rounded-full border-[3px] z-30 border-solid w-8 h-8 font-bold">
            3
          </button>
        </div>
        <h1 className="text-[#D93541] text-center font-bold mr-10 z-30">
          <Translate>Thank you for your support</Translate>
        </h1>
        <div
          className="bg-white rounded-full p-2 relative mx-auto w-[90%] 
          max-mob1:w-[100%] mt-4 z-20 text-black"
          style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)" }}
        >
          <p className=" my-5 mx-8 text-center">
            <Translate>
              Your regular donation will help young people transform their lives
              by developing the confidence and skills to live,learn and earn.
            </Translate>{" "}
            <Translate>
              Please provide your contact and payment information below.
            </Translate>
            {"  "}
            <Translate>
              Please note: to set up an online Direct Debit, you must be the
              account holder of a personal bank or building society account and
              the sole required signatory on the account
            </Translate>
          </p>
        </div>
        <form className="relative z-20" onSubmit={donate}>
          <div className="">
            <h2 className="my-20 font-bold">
              <Translate>Your Donation</Translate>
            </h2>
            <div className="grid grid-rows-2 max-mob1:grid-rows-4 max-mob1:grid-cols-1 grid-cols-4 gap-6 mt-8 max-mob1:place-items-center ">
              {donationData.map((donation, index) => (
                <div
                  key={index}
                  // className="bg-white p-2 relative w-[90%] z-20 text-black"
                  className={`bg-white max-tab:mt-3 p-2 relative z-20 text-black  flex flex-col items-center justify-center ${
                    index === 0 ? "row-start-1 col-start-1" : ""
                  } ${
                    index === 1
                      ? "row-start-1 col-start-3 max-tab:col-start-3 max-mob1:row-start-2 max-mob1:col-start-1"
                      : ""
                  } ${
                    index === 2
                      ? "row-start-2 col-start-2 max-tab:col-start-1 max-mob1:row-start-3 max-mob1:col-start-1"
                      : ""
                  } ${
                    index === 3
                      ? "row-start-2 col-start-4 max-tab:col-start-3 max-mob1:row-start-4 max-mob1:col-start-1"
                      : ""
                  }`}
                  style={{
                    width: "260px",
                    height: "260px",
                    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                  }}
                >
                  <p className="my-8 mx-auto w-[80%] text-center">
                    <Translate>{donation.text}</Translate>
                  </p>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h1
                      className={`text-center font-bold text-4xl flex justify-center items-center ${
                        donation.amount === amount
                          ? "text-[#D93541]"
                          : " dark:text-gray-600"
                      }`}
                    >
                      ${donation.amount}
                    </h1>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-16">
              <label className="block mt-20  " htmlFor="otherAmount">
                <h2 className="font-bold flex items-center ">
                  <Translate>Other amount</Translate> ( $ )
                </h2>
              </label>
              <input
                className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                type="text"
                id="otherAmount"
                placeholder="type here"
                value={otherAmount}
                onChange={(e) => setOtherAmount(e.target.value)}
              />
            </div>
            <div
              className="mb-16 
        pt-16 relative after:content-[''] after:absolute after:-left-0 after:top-0 after:w-[100%] after:h-0.5 
       after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out
        before:content-[''] before:absolute before:-left-0 before:top-0
        before:w-2 before:h-2 before:bg-red-500 
       before:rounded-full before:-translate-y-1/2 
          "
            >
              <div
                className={`absolute -top-0 -z-10 
        ${
          selectedLanguage.code === "ar"
            ? "-left-20 max-tab:left-[-40px] max-mob1:left-[-0px] moblg:left-[-7rem] mobl:left-[-7rem]"
            : "-right-20 max-tab:right-[-40px] max-mob1:right-[-30px] moblg:right-[-7rem] mobl:right-[-7rem]"
        } 
         `}
              >
                <img src={nuts} alt="nuts" />
              </div>

              <h2 className="font-bold">
                <Translate>Your Donation Date</Translate>
              </h2>
              <p className="text-xl w-[80%]">
                <Translate>
                  Please specify your preferred collection date.if the
                  collection date selected falls within the next 6 days, the
                  first payment may be collected the following month.
                </Translate>
              </p>
              <label className="block mt-4 " htmlFor="date">
                <h2 className="font-bold">
                  <Translate>First Donation Collection Date</Translate>
                </h2>
              </label>
              <div className="flex justify-start gap-3 text-black w-[24rem] max-mob1:w-80 max-mob3:w-64 flex-wrap  ">
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
          </div>
          <div
            className="mb-16 relative pt-16 after:content-[''] after:absolute after:-left-0 after:top-0 after:w-[100%] after:h-0.5 
  after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out
  before:content-[''] before:absolute before:-left-0 before:top-0
  before:w-2 before:h-2 before:bg-red-500 
  before:rounded-full before:-translate-y-1/2"
          >
            <div
              className={`absolute top-16 -z-10 
    ${
      selectedLanguage.code === "ar"
        ? "-left-0 max-tab:left-[-40px] max-mob1:left-[-0px] moblg:left-[-8rem] mobl:left-[-8rem]"
        : "-right-0 max-tab:right-[-40px] max-mob1:right-[-10px] moblg:right-[-8rem] mobl:right-[-8rem]"
    } 
    max-tab:top-1 `}
            >
              <img src={box} alt="box" />
            </div>

            <h2 className="font-bold mb-6">
              <Translate>Gift Aid</Translate>
            </h2>

            <p className="text-xl w-[70%]">
              <Translate>
                If you are a UK tax payer, you can boost the value of your
                donations by 25 percent, By ticking yes below, the value of your
                donation will be 6.25 at no extra cost to you.
              </Translate>
            </p>

            <div className="my-4">
              <label className="flex gap-4 cursor-pointer">
                <input type="checkbox" className="w-6 h-6" />
                <p className="text-xl">
                  <Translate>
                    Yes, I am a UK tax payer and wish to join the Gift Aid
                    Scheme
                  </Translate>
                </p>
              </label>
            </div>

            <p className="text-xl w-[75%]">
              <Translate>
                I would like NAA world to claim Gift Aid on any donations I make
                in the future, or have made in the past 4 years. I am a UK
                taxpayer and understand that if I pay less Income Tax and/or
                Capital Gains Tax than the amount of Gift Aid claimed on all of
                my donations in that tax year it is my responsibility to pay any
                difference. NAA world will claim 25p on every $1 donated.
              </Translate>
              <br />
              <Translate>
                If your personal details or tax status change, or if you would
                like to cancel this declaration in the future, please let us
                know by contacting our Supporter Care team on 0000000000 or
                hello@NAAworld.org.uk.
              </Translate>
            </p>
          </div>

          <div
            className="mb-16 relative pt-16 after:content-[''] after:absolute after:-left-0 after:top-0 after:w-[100%] after:h-0.5 
       after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out
        before:content-[''] before:absolute before:-left-0 before:top-0
        before:w-2 before:h-2 before:bg-red-500 max-mob:pb-40
       before:rounded-full before:-translate-y-1/2"
          >
            <div
              className={`absolute 
        ${
          selectedLanguage.code === "ar"
            ? "left-4 max-tab:left-[-75px] tab2:left-[-5rem]"
            : "right-4 max-tab:right-[-75px] tab2:right-[-5rem]"
        } 
        -bottom-24 -z-10 
         max-mob1:right-[-0px]`}
            >
              <img src={cat} alt="cat" />
            </div>
            <h2 className=" font-bold mb-3">
              <Translate>Personal Details</Translate>
            </h2>
            <div className="mb-4">
              <label className="block mt-2 text-xl  " htmlFor="firstName">
                <Translate> First Name</Translate>
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
                id="city"
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
                max-mob1:w-80 max-mob3:w-64 w-96 py-2 pr-3 pl-6 mt-3 rounded-full border-gray-200 h-16
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
                onChange={(e) => setPostCode(e.target.value)}
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
          </div>
          <div
            className="mb-16 relative pt-16 after:content-[''] after:absolute after:-left-0 after:top-0 after:w-[100%] after:h-0.5 
       after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out
        before:content-[''] before:absolute before:-left-0 before:top-0
        before:w-2 before:h-2 before:bg-red-500 
       before:rounded-full before:-translate-y-1/2"
          >
            <h2 className=" font-bold">
              <Translate>Let's Stay In Touch</Translate>
            </h2>
            <p className="text-xl ">
              <Translate>
                We’d love to share inspiring stories of the young lives you’ve
                helped change and let you know more ways you can get involved.
                Please use the boxes below to let us know how you’d like to hear
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
                get in touch with our Supporter Care team
                at hello@Naaworld.org.uk or on 0000000000. We’d love to hear
                from you!
              </Translate>
              <br />
              <Translate>
                {" "}
                To understand how we will store and use your details, please see
                our
              </Translate>
              <span className="text-red-500">
                <Translate>Privacy Policy</Translate>
              </span>
            </p>
          </div>
          {/* <div
            className="mb-16 relative pt-16 after:content-[''] after:absolute after:-left-0 after:top-0 after:w-[100%] after:h-0.5 
       after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out
        before:content-[''] before:absolute before:-left-0 before:top-0
        before:w-2 before:h-2 before:bg-red-500 max-mob:pb-64
       before:rounded-full before:-translate-y-1/2"
          >
            <div
              className={`absolute 
        ${
          selectedLanguage.code === "ar"
            ? "left-4 max-tab:left-[-75px]  max-mob1:left-[-0px] tab2:left-[-5rem] "
            : "right-4 max-tab:right-[-75px]  max-mob1:right-[-0px] tab2:right-[-5rem] "
        } 
        -bottom-24 
       
        max-mob3:bottom-[-5.6rem]`}
            >
              <img
                src={man}
                alt="man"
                className="relative -z-10 drop-shadow-xl "
              />
            </div>
            <h2 className=" font-bold mb-3">
              <Translate>Bank Details</Translate>
            </h2>
            <div className="mb-4">
              <label className="block mt-2 text-xl  " htmlFor="firstName">
                <Translate>Account Holder Name*</Translate>
              </label>
              <input
                className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                type="text"
                id="Name"
                placeholder="type here"
              />
            </div>
            <div className="mb-4">
              <label className="block mt-2 text-xl " htmlFor="lastName">
                <Translate>Sort Code*</Translate>
              </label>
              <input
                className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                type="text"
                id="code"
                placeholder="type here"
              />
            </div>
            <div className="mb-4">
              <label className="block  mt-2 text-xl " htmlFor="email">
                <Translate>Account Number*</Translate>
              </label>
              <input
                className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                type="number"
                id="number"
                placeholder="type here"
              />
            </div>
          </div> */}
          <div
            className=" relative pt-16 after:content-[''] after:absolute after:-left-0 after:top-0 after:w-[100%] after:h-0.5 
       after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out
        before:content-[''] before:absolute before:-left-0 before:top-0
        before:w-2 before:h-2 before:bg-red-500 
       before:rounded-full before:-translate-y-1/2"
          >
            <h2 className="font-bold">
              <Translate>Feedback</Translate>
            </h2>
            <p className="text-xl mt-2">
              <Translate>
                We love to hear stories from our generous supporters like you.
                If you wish, please let us know what prompted you to make your
                donation today. If you would like to find out more about NAA
                World, or if you have any questions or feedback about our work,
                donations, or fundraising, please visit www.NAAworld.uk or get
                in touch with our Supporter Care team on 0000000000 or
                hello@NAAWorld.org.uk.
              </Translate>
            </p>
          </div>
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
              <Translate>{loading ? "Loading..." : "Continue"}</Translate>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonateMonthly;
