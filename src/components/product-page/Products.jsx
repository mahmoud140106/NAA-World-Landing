import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductDetails from "./ProductDetails";
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import { Translate } from "translate-easy";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://naaworld.uk/api/v1/productsCategories/${id}/products?&page=${currentPage}`,
          {
            withCredentials: true,
            headers: {
              "X-API-KEY": "naa246lan",
            },
          }
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, id]);
  const handleDetailsClick = (id) => {
    setSelectedProductId(id);
    setShowDetails(true);
  };

  const handleClose = () => setShowDetails(false);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Helmet>
        <title>NAA World - Products</title>
        <link
          rel="canonical"
          href={`https://naaworld.uk/products/${products[0]?.category?._id}`}
        />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div className="pt-24 max-mob:pt-10 relative  dark:bg-[--black] dark:bg-opacity-4 min-h-[80vh]">
        <div>
          <h1 className="text-[#EA555D] text-center w-96 max-mob:w-80 font-bold mx-auto">
            <Translate>{products[0]?.category?.name}</Translate>
          </h1>
        </div>

        {products.length === 0 ? (
          <p className="text-xl text-center">
            <Translate>Coming Soon.</Translate>
          </p>
        ) : (
          <div className="m-12 w-3/4 mx-auto flex gap-24 max-tab:justify-center max-tab:gap-16 flex-wrap relative z-30 mt-24">
            {products.map((product) => (
              <div
                key={product._id}
                className="relative mt-16 w-72 bg-[#ffff] dark:bg-[--black]  dark:bg-opacity-4 h-[50vh] 
                moblg:h-[23rem] mobl:h-[23rem] moblg:w-[30vw] mobl:w-[30vw] 
                larg:h-[45vh] desk-mob:h-[18rem] tab1:h-[26vh] tab2:h-[26vh] tab3:h-[30vh] shadow-md shadow-gray-700 rounded-tl-full rounded-tr-full"
              >
                <img
                  src={product.cover}
                  alt="Product"
                  className="w-[20rem] h-[20rem] md:h-[20rem] top-[3.5rem]  object-contain relative drop-shadow-md 
                  inset-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
                <div className="absolute bottom-4 left-0 right-0 text-center py-5 px-6 rounded-b-lg ">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white ">
                    <Translate>{product.name}</Translate>
                  </h2>
                </div>
                {product?.priceAfterDiscount ? (
                  <div className="absolute flex justify-around -bottom-4 left-0 right-0 text-center py-5 px-8 rounded-b-lg ">
                    <p className="text-lg font-medium ml-2">
                      ${product?.priceAfterDiscount}
                    </p>
                    <p className="text-lg text-red-500">
                      <span className="text-gray-700 -ml-3 mr-1 line-through dark:text-white ">
                        ${product.price}
                      </span>
                      %{product.discount}
                    </p>
                  </div>
                ) : (
                  <div className="absolute -bottom-4 left-0 right-0 text-center py-5 px-6 rounded-b-lg ">
                    <p className="text-lg font-medium text-gray-800 dark:text-white ">
                      ${product?.price}
                    </p>
                  </div>
                )}
                <button
                  className="absolute -bottom-6 left-[24%] max-mob3:left-[19%] w-40 bg-[#FDE2E4] font-bold py-3 rounded-full"
                  onClick={() => handleDetailsClick(product._id)}
                >
                  <Translate>Details</Translate>
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mx-auto relative z-30 w-fit py-6">
          <button
            className="bg-[#F13B48] text-white rounded-full w-48 h-12 "
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <Translate>More</Translate>
          </button>
        </div>

        {selectedProductId && (
          <ProductDetails
            show={showDetails}
            onHide={handleClose}
            id={selectedProductId}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
