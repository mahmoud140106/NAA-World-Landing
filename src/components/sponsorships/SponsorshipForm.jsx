import React, { useCallback, useEffect, useState } from "react";
import FormPic from "./FormPic";
import FormSelect from "./FormSelect";
import tree from "../../images/Group 115 (1).svg";
import axios from "axios";
import { Translate, useLanguage } from "translate-easy";
import FormFile from "./FormFile";
import { IoCloseCircle } from "react-icons/io5";
import AcceptTerms from "../AcceptTerms";
import { ErrorAlert, SuccessAlert } from "../Alert";

const SponsorshipForm = ({ type, price }) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

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

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1),
  }));

  const [businessName, setBusinessName] = useState("");
  const [businessContactName, setBusinessContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [signature, setSignature] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const isFormValid =
    businessName &&
    businessContactName &&
    email &&
    phonenumber &&
    address &&
    website &&
    signature &&
    date &&
    details &&
    logo &&
    isChecked &&
    file;
  const handleLogoChange = (e) => {
    if (e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
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
        const formData = new FormData();
        formData.append("businessName", businessName);
        formData.append("businessContactName", businessContactName);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("phonenumber", phonenumber);
        formData.append("website", website);
        formData.append("signature", signature);
        formData.append("date", date);
        formData.append("details", details);
        formData.append("logo", logo);
        formData.append("file", file);
        formData.append("type", type);
        formData.append("price", price);
        const response = await axios.post(
          "https://naaworld.uk/api/v1/sponsorShipForm",
          formData,
          {
            headers: {
              "X-API-KEY": "naa246lan",
            },
          }
        );

        SuccessAlert({
          title: "Success",
          text: "Your request done successfully",
        });

        window.location.href = response.data.data;

      } catch (error) {
        console.error("Error creating sponsorship:", error);
        ErrorAlert({
          text:
            error?.response?.data?.message ||
            "An error occured! pleae try again",
        });
      } finally {
        setLoading(false);
      }
    },
    [
      businessName,
      businessContactName,
      email,
      address,
      phonenumber,
      website,
      signature,
      date,
      details,
      logo,
      file,
      type,
      price,
    ]
  );
  const { selectedLanguage } = useLanguage();
  return (
    <div>
      <form
        className="relative dark:bg-[--black] dark:bg-opacity-4 dark:text-white"
        onSubmit={donate}
      >
        <div className="pt-4 mx-48 max-md:mx-36 max-tab:mx-16 max-mob1:mx-8 pb-3 z-10">
          <p className="text-xl font-extrabold ml-3 mb-3">
            <Translate>Personal Details</Translate>
          </p>
          <div className="mb-4">
            <label className="block ml-3 mt-2 " htmlFor="firstName">
              <Translate>Business Name</Translate>
            </label>
            <input
              className=" max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="type here"
            />
          </div>
          <div className="mb-4">
            <label className="block ml-3 mt-2 " htmlFor="lastName">
              <Translate>Business Contact Name</Translate>
            </label>
            <input
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="contactName"
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
              className=" max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
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
              className=" max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
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
              className=" max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              id="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="type here"
            />
          </div>
          <div className="mb-4">
            <p className="block ml-3 mt-2 w-72">
              <Translate>what's the main reason for you joining</Translate>{" "}
              <br />
              <span className="font-bold text-lg">NAA WORLD</span>{" "}
              <Translate>sponsorship?</Translate>
            </p>
            <textarea
              className="max-mob1:w-80 max-mob3:w-64 w-96 h-36 p-4 pl-3 mt-3 rounded-2xl border-gray-200 border-1 border-solid shadow-md focus:outline-none"
              type="text"
              placeholder="type here"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
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
            <label className="block ml-3 mt-2 " htmlFor="Date">
              <Translate>Date</Translate>
            </label>
            <div className="flex justify-start gap-3 w-[24rem] max-mob1:w-80 max-mob3:w-64 flex-wrap  ">
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
          <div className="mb-4">
            <label className="block ml-3 mt-2 " htmlFor="logo">
              <Translate>Upload your logo</Translate>
            </label>
            <div className="flex justify-start gap-4 w-[14rem] flex-wrap mt-3">
              <FormPic label="Upload image" onChange={handleLogoChange} />
              {logo && (
                <div className="relative">
                  Logo selected:{logo.name}{" "}
                  <IoCloseCircle
                    className="absolute -top-2 -right-3 cursor-pointer"
                    onClick={() => setLogo(null)}
                  />
                </div>
              )}
              <FormFile label="Upload file" onChange={handleFileChange} />
              {file && (
                <div className="relative">
                  File selected:{file.name}{" "}
                  <IoCloseCircle
                    className="absolute -top-2 -right-3 cursor-pointer"
                    onClick={() => setFile(null)}
                  />
                </div>
              )}
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

          {/* <PaymentDetails /> */}
          <div className="flex justify-center w-[23rem] max-mob1:w-80 max-mob3:w-64 pb-14 mt-10">
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
        <div
          className={`absolute top-80 ${
            selectedLanguage.code === "ar" ? "-left-4" : "-right-4 "
          } -z-10`}
        >
          <img
            src={tree}
            alt="tree"
            className={`${
              selectedLanguage.isRtl ? "rotate-180" : ""
            } w-96 h-96`}
          />
        </div>
      </form>
      <AcceptTerms show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default SponsorshipForm;
