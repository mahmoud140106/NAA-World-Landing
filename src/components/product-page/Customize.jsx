import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import nuts from "../../images/event.svg";
import pinky from "../../images/pinky.svg";
import FormPic from "../sponsorships/FormPic";
import { Translate, useLanguage } from "translate-easy";
import Loading from "../Loading";
import AcceptTerms from "../AcceptTerms";
import tree from "../../images/Group 115 (1).svg";
import { Helmet } from "react-helmet-async";
import { IoCloseCircle } from "react-icons/io5";

const Customize = () => {
  const { id } = useParams();
  const { selectedLanguage } = useLanguage();
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [customAddress, setCustomAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");
  const [aboutProduct, setAboutProduct] = useState("");
  const [additionalPreferences, setAdditionalPreferences] = useState("");
  const [logo, setLogo] = useState(null);
  const [options, setOptions] = useState([]);
  const [isAddressDifferent, setIsAddressDifferent] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const isFormValid =
    firstname &&
    lastname &&
    email &&
    phonenumber &&
    address &&
    quantity &&
    city &&
    postcode &&
    country &&
    isChecked;

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
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, []);
  const handleLogoChange = (e) => {
    if (e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://naaworld.uk/api/v1/products/${id}`,
          {
            headers: {
              "X-API-KEY": "naa246lan",
            },
          }
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  const Donate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
    
      formData.append("product", product?._id);
      formData.append("FirstName", firstname);
      formData.append("LastName", lastname);
      formData.append("Email", email);
      formData.append("PhoneNumber", phonenumber);
      formData.append("Address", address);
      formData.append("Town", city);
      formData.append("Country", country);
      formData.append("PostCode", postcode);
      formData.append("StoryAbout", aboutProduct);
      
      if (logo) {
        formData.append("UploadImage", logo);
      }
      
      formData.append("AdditionalPreferences", additionalPreferences);
      formData.append("quantity", quantity);
      // const requestData = {
      //   product: product?._id,
      //   FirstName: firstname,
      //   LastName: lastname,
      //   Email: email,
      //   PhoneNumber: phonenumber,
      //   Address: address,
      //   Town: city,
      //   Country: country,
      //   PostCode: postcode,
      //   StoryAbout: aboutProduct,
      //   UploadImage: logo,
      //   AdditionalPreferences: additionalPreferences,
      //   quantity,
      // };

      const response = await axios.post(
        "https://naaworld.uk/api/v1/customizeOrders",
        formData,
        {
          headers: {
            "X-API-KEY": "naa246lan",
          },
        }
      );
      window.location.href = response.data.data;
    } catch (error) {
      console.error("Error during customizeOrders:", error);
    }
  };
  return (
    <div className="dark:bg-[--black] dark:bg-opacity-4 dark:text-white overflow-x-hidden">
      <Helmet>
        <title>NAA World - Customize</title>
        <link rel="canonical" href={`https://naaworld.uk/customize/${id}`} />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div className="relative z-20 w-3/4 pt-10 mx-auto">
        <div className="bg-[--black] shadow-sm shadow-gray-800 rounded-[40px] p-10  flex max-mob1:flex-wrap gap-5">
          <img
            src={product?.cover}
            alt="main"
            loading="lazy"
            className="-mt-20  w-[16rem] h-[20rem] object-contain "
          />
          <div>
            <p className="text-xl font-bold">
              <Translate>{product?.name}</Translate>
            </p>
            {product?.priceAfterDiscount ? (
              <div className="flex gap-5 rounded-b-lg mt-3">
                <h2 className="text-lg font-medium">
                  ${product?.priceAfterDiscount}
                </h2>
                <h2 className="text-lg text-red-500">
                  <span className="text-gray-700 mr-1 line-through">
                    ${product?.price}
                  </span>
                  %{product?.discount}
                </h2>
              </div>
            ) : (
              <h2 className="text-lg font-bold text-gray-800 mt-3">
                ${product?.price}
              </h2>
            )}
            {/* <p className="font-bold">
              <Translate>Get It By</Translate>{" "}
              <span className="text-green-500">Thu, 25 Aug</span>
            </p> */}
            <p>
              <Translate>Delivery fees range</Translate> $50 : $70
            </p>
            <p>
              <Translate>*you will only pay</Translate>{" "}
              <span className="text-lg text-red-500">20% Deposit</span>{" "}
              <Translate>until you get your confirmation message.</Translate>
            </p>
          </div>
        </div>
        <form className="relative z-30" onSubmit={Donate}>
          <div>
            <div className="mb-10 relative py-16 z-10 after:content-[''] after:absolute after:-left-0 after:-z-20 after:bottom-0 after:w-[100%] after:h-0.5 after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out before:content-[''] before:absolute before:-left-0 before:bottom-0 before:w-2 before:h-2 before:bg-red-500 before:rounded-full before:translate-y-1/2">
              <h3 className="font-bold mb-3">
                <Translate>Personal Details</Translate>
              </h3>

              <div className="mb-4">
                <label className="block mt-2 text-xl" htmlFor="firstName">
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
                <label className="block mt-2 text-xl" htmlFor="lastName">
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
                <label className="block mt-2 text-xl" htmlFor="email">
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
                <label className="block mt-2 text-xl" htmlFor="Phone">
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
                <label className="block  mt-2 text-xl " htmlFor="quantity">
                  <Translate>Product Quantity</Translate>
                </label>
                <input
                  className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                  type="text"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="type here"
                />
              </div>
              <div className="mb-4">
                <label className="block mt-2 text-xl" htmlFor="Address">
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
                <label className="block mt-2 text-xl" htmlFor="City">
                  <Translate>Town / City</Translate>
                </label>
                <input
                  className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                  type="text"
                  id="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="type here"
                />
              </div>
              <div className="relative mb-4 w-[23rem] max-mob1:w-80 max-mob3:w-64">
                <label className="block mt-2 text-xl" htmlFor="Country">
                  <Translate>Country</Translate>
                </label>
                <select
                  className="max-mob1:w-80 max-mob3:w-64 w-96 py-2 pr-3 pl-6 mt-3 rounded-full border-gray-200 h-16
                border-1 border-solid shadow-md focus:outline-none text-gray-400  text-xl
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
                    className={`absolute top-[3.5rem]  ${
                      selectedLanguage.code === "ar" ? "left-1" : "right-1"
                    }`}
                    size={32}
                  />
                </div>
              </div>
              <div className="mb-4 pb-4">
                <label className="block mt-2 text-xl" htmlFor="PostCode">
                  <Translate>Post Code</Translate>
                </label>
                <input
                  className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                  type="text"
                  id="PostCode"
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
                    onChange={(e) => setIsAddressDifferent(e.target.checked)}
                  />
                  <p className="text-2xl">
                    <Translate>I have different billing address</Translate>
                  </p>
                </label>
              </div>
              {isAddressDifferent && (
                <div className="mb-4 pb-4">
                  <label className="block mt-2 text-xl" htmlFor="customAddress">
                    <Translate>Address</Translate>
                  </label>
                  <input
                    className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                    type="text"
                    id="customAddress"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    placeholder="type here"
                  />
                </div>
              )}
              <div
                className={`absolute top-1/3 bg-cover w-48 h-48 ${
                  selectedLanguage.code === "ar"
                    ? "md:left-28 left-0"
                    : "md:right-28 right-0"
                } bg-center -z-10`}
                style={{ backgroundImage: `url(${nuts})` }}
              />
            </div>
          </div>

          <div>
            <div
              className="mb-10 relative py-4 z-10 after:-z-20 after:content-[''] after:absolute after:-left-0 after:bottom-0 after:w-[100%] after:h-0.5 
       after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out
        before:content-[''] before:absolute before:-left-0 before:bottom-0
        before:w-2 before:h-2 before:bg-red-500 
       before:rounded-full before:translate-y-1/2"
            >
              <div
                className={`absolute ${
                  selectedLanguage.code === "ar"
                    ? "-left-48 max-md:-left-44 max-tab:-left-24"
                    : "-right-48 max-md:-right-44 max-tab:-right-24"
                } top-0 -z-10`}
              >
                <img
                  src={tree}
                  alt="tree"
                  className={` ${
                    selectedLanguage.isRtl ? "rotate-180" : ""
                  } w-96 `}
                />
              </div>
              <h3 className="font-bold mb-3">
                <Translate>Customize your order</Translate>
              </h3>
              <div className="mb-4">
                <p className="ml-3 mt-2 w-72 max-mob1:w-80 max-mob3:w-64">
                  <Translate>
                    Can you please, tell us the story about the design you want?
                  </Translate>
                </p>
                <textarea
                  className=" max-mob1:w-80 max-mob3:w-64 w-96 h-36 p-4 pl-3 mt-3 rounded-2xl border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                  placeholder="type here"
                  value={aboutProduct}
                  onChange={(e) => setAboutProduct(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-4">
                <p className="ml-3 mt-2 w-72 max-mob1:w-80 max-mob3:w-64">
                  <Translate>DO you have any additional preferences?</Translate>
                </p>
                <textarea
                  className=" max-mob1:w-80 max-mob3:w-64 w-96 h-36 p-4 pl-3 mt-3 rounded-2xl border-gray-200 border-1 border-solid shadow-md focus:outline-none"
                  placeholder="type here"
                  value={additionalPreferences}
                  onChange={(e) => setAdditionalPreferences(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-start gap-4 w-[14rem] flex-wrap mt-3">
                <FormPic label="Upload image" onChange={handleLogoChange} />
                {logo && (
                  <div className="relative">
                    <Translate>Image selected:</Translate>
                    {logo.name}{" "}
                    <IoCloseCircle
                      className="absolute -top-2 -right-3 cursor-pointer"
                      onClick={() => setLogo(null)}
                    />
                  </div>
                )}
              </div>

              <img
                src={pinky}
                alt="pinky"
                className={`absolute -bottom-60 -z-10 max-tab:w-20 max-tab:-bottom-20   ${
                  selectedLanguage.code === "ar"
                    ? "left-6 max-mob3:left-0"
                    : "right-6 max-mob3:right-0"
                }`}
              />
            </div>
          </div>
          <div className="relative z-10">
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
            <div className="w-1/3 max-mob:w-2/3">
              <div className="flex w-full justify-between text-xl mt-4">
                <p className="font-bold">
                  <Translate>Total</Translate>
                </p>
                <p>
                  {" "}
                  $
                  {(product?.priceAfterDiscount
                    ? product?.priceAfterDiscount
                    : product?.price) * quantity || "0"}
                </p>
              </div>
              <div className="flex w-full justify-between text-xl">
                <p className="font-bold">
                  <Translate>Deposit</Translate>
                </p>
                <p>
                  {" "}
                  $
                  {(product?.priceAfterDiscount
                    ? (product?.priceAfterDiscount * 20) / 100
                    : (product?.price * 20) / 100) * quantity || "0"}
                </p>
              </div>
            </div>
            <div className="flex justify-center w-[23rem] max-mob1:w-80 max-mob3:w-64 pb-14 mt-10">
              <button
                // onClick={Donate}
                className={` rounded-full w-48 h-12 ${
                  isFormValid
                    ? "bg-[#F13B48] text-white"
                    : "bg-gray-200 text-gray-700 cursor-not-allowed"
                }`}
                disabled={!isFormValid || loading}
              >
                <Translate>{loading ? "Loading..." : "Pay Now"}</Translate>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Customize;
