import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import Rating from "@mui/material/Rating";
import { FaRegStar } from "react-icons/fa";
import "./style.css";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { Translate, useLanguage } from "translate-easy";
import Cookies from "js-cookie"
const ProductDetails = ({ show, onHide, id }) => {
  const { selectedLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [mainPhoto, setMainPhoto] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://naaworld.uk/api/v1/products/${id}`, {
          headers: {
            "X-API-KEY": "naa246lan"
          }
        }
        );
        setProduct(response.data.data);
        setMainPhoto(response.data.data.photos[0]);
        setRating(response.data.data.totalRate);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, rating]);

  const addReview = async (rate) => {
    setIsLoading(true);
    try {
      await axios.post(`https://naaworld.uk/api/v1/products/${id}/reviews`, {
        rate: rate,
      }, {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': Cookies.get('_coo_123'),
          "X-API-KEY": "naa246lan"
        }
      },);
      setRating(rate);
    } catch (error) {
      console.error("Error making review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="dark:bg-[--black] dark:bg-opacity-4"
    >
      <Modal.Header
        className={`modal-header mt-2 mx-4 ${selectedLanguage.code === "ar"
          ? "position-relative"
          : "justify-content-end"
          }`}
      >
        <Modal.Title><Translate>{product?.name}</Translate></Modal.Title>
        <div
          className={`btn-close ${selectedLanguage.code === "ar" ? "position-absolute left-4" : ""
            }`}
          onClick={onHide}
        ></div>
      </Modal.Header>
      <Modal.Body className="">
        <div className="flex gap-3 max-tab:flex-wrap-reverse ">
          <div className="max-tab:flex max-tab:gap-5 max-mob1:flex-wrap ">
            {product.photos.map((photo, i) => (
              <img
                key={i}
                src={photo}
                alt="cloth"
                loading="lazy"
                className=" mb-2 w-32 h-16 cursor-pointer  object-contain
                max-tab:w-22 max-tab:h-20 max-mob1:w-12 max-mob1:h-14 "
                onClick={() => setMainPhoto(photo)}
              />
            ))}
          </div>

          <div className=" w-[860px] ">
            <img
              src={mainPhoto}
              alt="cloth"
              loading="lazy"
              className="w-[700px] mx-auto px-20 mb-2 h-[285px] max-tab:h-[240px] max-mob1:h-[140px] max-mob1:w-[360px] object-fill "
            />
          </div>
        </div>
        {product?.priceAfterDiscount ? (
          <div className=" flex gap-5  rounded-b-lg mt-3">
            <h2 className="text-lg font-medium ">
              ${product?.priceAfterDiscount}
            </h2>
            <h2 className="text-lg text-red-500">
              <span className="text-gray-700  mr-1 line-through">
                ${product.price}
              </span>
              %{product.discount}
            </h2>
          </div>
        ) : (
          <h2 className="text-lg font-bold text-gray-800 mt-3">
            ${product?.price}
          </h2>
        )}
        <div className="text-gray-200 items-center flex gap-2">
          <FiShoppingCart size={30} className="text-green-500" />
          +<Translate>30 sold recently</Translate>
        </div>
        <div className="">
          <div className="mb-3 mt-3">
            <h2 className="text-lg font-semibold mb-2"><Translate>Colors</Translate></h2>
            <div className="flex space-x-4">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={` w-12  ${selectedLanguage.code === "ar" ? "ml-3" : "mr-3"
                    } h-6 rounded-full shadow-md focus:outline-none 
                ${selectedColor === color
                      ? "ring-2 ring-offset-2 ring-gray-800"
                      : ""
                    }`}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2"><Translate>Size</Translate></h2>
            <div className="grid grid-cols-4 gap-4 w-56">
              {product.size.map((size) => (
                <button
                  key={size}
                  className={`w-12 h-6 rounded-full shadow-md focus:outline-none 
                ${selectedSize === size ? "bg-gray-300" : "bg-white"}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className=" mt-3">
          <h2 className="text-lg font-semibold mb-2"><Translate>Specifications</Translate></h2>
          <div className="">
            <div className="relative bg-gray-100 p-2 rounded-full mb-2 w-1/2 tab2:w-[80%] max-tab:w-[80%] max-mob1:w-[90%]">
              <div className="text-gray-600 pl-8 font-bold max-mob1:pl-2">
                <Translate>Material</Translate>
              </div>
              <div
                className={`absolute ${selectedLanguage.code === "ar" ? "left-0" : "right-0"
                  } top-0 bottom-0 w-1/2 text-center rounded-full shadow-md pt-2 font-medium bg-white`}
              >
                <Translate>{product?.material}</Translate>
              </div>
            </div>

            <div className="relative bg-gray-100 p-2 rounded-full mb-2 w-1/2 tab2:w-[80%] max-tab:w-[80%] max-mob1:w-[90%]">
              <div className="text-gray-600 pl-8 font-bold max-mob:pl-2">
                <Translate>Model number</Translate>
              </div>
              <div
                className={`absolute ${selectedLanguage.code === "ar" ? "left-0" : "right-0"
                  } top-0 bottom-0 w-1/2 text-center rounded-full shadow-md pt-2 font-medium bg-white`}
              >
                {product?.modelNumber}
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-between w-1/2 max-tab:w-[80%]">
            <div className="flex gap-2">
              <h3 className="text-lg font-semibold mb-2"><Translate>Reviews</Translate></h3>
              <div className="flex gap-0.5  shadow-md items-center justify-center min-w-12 w-fit h-6 rounded-full">
                <FaRegStar className=" text-green-600" />
                <span className="text-green-600 font-bold">
                  {" "}
                  {product?.totalRate}
                </span>
                <span className="text-gray-600">
                  ({product?.rate?.toFixed(2)})
                </span>
              </div>
            </div>
            <div>
              <Rating
                name="simple-controlled"
                value={product?.rate || rating}
                onChange={(event, newValue) => {
                  addReview(newValue);
                }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer  mx-auto -mb-9 ">
        <button
          onClick={() => navigate(`/order/${id}`)}
          className="mr-5 bg-red-500 rounded-full w-32 text-white tracking-wide font-bold h-12 hover:bg-red-600 hover:text-gray-100"
        >
          <Translate>Order</Translate>
        </button>
        <button
          onClick={() => navigate(`/customize/${id}`)}
          className="mr-5 bg-red-500 rounded-full w-32 text-white tracking-wide font-bold h-12 hover:bg-red-600 hover:text-gray-100"
        >
          <Translate>Customize</Translate>
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetails;
