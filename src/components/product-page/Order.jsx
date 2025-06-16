import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Translate, useLanguage } from "translate-easy";
import haga from "../../images/7aga.svg";
import nuts from "../../images/event.svg";
import AcceptTerms from "../AcceptTerms";
import { Helmet } from "react-helmet-async";

const Order = () => {
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

  const handleCheckboxChange = (e) => {
    setIsAddressDifferent(e.target.checked);
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
  }, [id]);

  const Donate = async (e) => {
    e.preventDefault();

    try {
      const EXRate = await axios.get(
        `https://v6.exchangerate-api.com/v6/773e0e7e5870b9f10ddab3aa/latest/USD`
      );
      const rate = EXRate.data.conversion_rates["EGP"];

      setLoading(true);
      console.log(product?.priceAfterDiscount * 20 * rate);
      console.log(product?.price * 20 * rate);
      const requestData = {
        amount: parseInt(
          (product?.priceAfterDiscount
            ? product?.priceAfterDiscount * 20
            : product?.price * 20) *
            quantity *
            rate
        ),
        currency: "EGP",
        payment_methods: [2992320, 2992321],
        items: [
          {
            name: product?.name,
            amount: parseInt(
              product?.priceAfterDiscount
                ? product?.priceAfterDiscount * 20 * rate
                : product?.price * 20 * rate
            ),
            description: product?.name,
            quantity: quantity,
          },
        ],
        billing_data: {
          first_name: firstname,
          last_name: lastname,
          phone_number: phonenumber,
        },
        extras: {
          product: product?._id,
          FirstName: firstname,
          LastName: lastname,
          Email: email,
          PhoneNumber: phonenumber,
          Address: address,
          Town: city,
          Country: country,
          PostCode: postcode,
          routeName: "orders",
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

      console.log("Paymob response:", response.data);

      window.location.href = `https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_live_VtdlVZz5UZXFmIVG1B3xJLgk0qmHrv2c&clientSecret=${response.data.client_secret}`;
    } catch (error) {
      console.error("Error during donation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark:bg-[--black] dark:bg-opacity-4 dark:text-white">
      <Helmet>
        <title>NAA World - Order</title>
        <link rel="canonical" href={`https://naaworld.uk/order/${id}`} />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div className="relative z-20 pt-10 w-3/4 mx-auto ">
        <div className="bg-[--black] shadow-sm shadow-gray-800 rounded-[40px] p-10  flex max-mob1:flex-wrap gap-5">
          <img
            src={product?.cover}
            alt="main"
            loading="lazy"
            className="-mt-20 w-[16rem] h-[20rem] object-contain "
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
            <div
              className="mb-10  relative z-20 py-16 after:content-[''] after:absolute after:-left-0 after:bottom-0 after:w-[100%] after:h-0.5 
       after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out after:-z-20
        before:content-[''] before:absolute before:-left-0 before:bottom-0
        before:w-2 before:h-2 before:bg-red-500 
       before:rounded-full before:translate-y-1/2"
            >
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
                src={haga}
                alt="haga"
                className={`absolute -bottom-28  max-tab:w-20 max-tab:-bottom-8 ${
                  selectedLanguage.code === "ar" ? "left-0" : "right-0 "
                } -z-10`}
              />
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
                $
                {(product?.priceAfterDiscount
                  ? (product?.priceAfterDiscount * 20) / 100
                  : (product?.price * 20) / 100) * quantity || "0"}
              </p>
            </div>
          </div>
          <div className="flex justify-center w-[23rem] max-mob1:w-80 max-mob3:w-64 pb-14 mt-10">
            <button
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
        </form>
      </div>
    </div>
  );
};

export default Order;
