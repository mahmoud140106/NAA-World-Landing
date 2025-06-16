import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Translate, useLanguage } from "translate-easy";

const Footer = ({ footer, isLoading }) => {
  const { selectedLanguage } = useLanguage();

  return (
    <footer
      dir="ltr"
      className="relative z-20 dark:bg-[--black] dark:bg-opacity-4 text-[--text]"
      style={{ backgroundColor: footer?.color }}
    >
      <div className="container pt-5 max-mob1:px-5 max-lg:px-5 max-md:p-0 tab3:max-w-[764px] 
      flex flex-wrap tab3:flex-nowrap tab3:gap-[4rem] justify-center  gap-x-32 max-md:gap-x-4 max-md:justify-between 
      max-tab:justify-start max-mob1:justify-center 
      max-tab:gap-20 max-mob1:gap-x-52 max-mob1:gap-y-10">
        <div className="col-3 max-mob1:min-w-[23rem] max-mob2:min-w-[18rem] ">
          <h4 className="z-10 relative border-b  fw-bold py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out before:content-[''] before:absolute before:left-[-.3rem] before:top-[95%] before:w-2 before:h-2 before:bg-red-500 before:rounded-full before:-translate-y-1/2">
            <Translate>About Us</Translate>
          </h4>
          <ul className="list-disc pl-5">
            <li className="text-lg">
              <Translate>{footer?.aboutInfo}</Translate>
            </li>
          </ul>
          <div className="flex gap-2 justify-center">
            <a
              href={footer?.facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black rounded-full border-2 border-solid p-2 flex items-center justify-center hover:text-gray-800"
              style={{ width: "37px", height: "37px" }}
            >
              <FaFacebookF size={30} />
            </a>
            <a
              href={footer?.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black rounded-full border-2 border-solid p-1.5 flex items-center justify-center"
              style={{ width: "37px", height: "37px" }}
            >
              <FaInstagram size={30} />
            </a>
            <a
              href={footer?.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black rounded-full border-2 border-solid p-1.5 flex items-center justify-center"
              style={{ width: "37px", height: "37px" }}
            >
              <FaWhatsapp size={30} />
            </a>
          </div>
        </div>
        <div className="col-3 max-mob1:min-w-[23rem] max-mob2:min-w-[18rem]">
          <h4 className=" relative border-b  fw-bold py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out before:content-[''] before:absolute before:left-[-.3rem] before:top-[95%] before:w-2 before:h-2 before:bg-red-500 before:rounded-full before:-translate-y-1/2">
            <Translate>Contact Us</Translate>
          </h4>
          <ul className="list-disc pl-5">
            <li className="text-lg">
              <Translate>{footer?.contactInfo}</Translate>
            </li>
          </ul>
          <div className="relative flex items-center tab1:min-w-[19rem] tab2:min-w-[19rem] mt-3 min-w-[17.2rem] mob-x:min-w-[19rem] w-full max-w-md">
            <div
              className={`w-full py-2 
              ${selectedLanguage.code === "ar"
                  ? "pl-3 pr-20 text-left"
                  : "pl-[2rem] pr-4 mob-x:pl-4"
                } 
              rounded-full bg-white text-gray-500 
              focus:outline-none shadow-md`}
            >
              {footer?.contactEmail || "Enter your email"}
            </div>
            <button className="absolute right-0 top-0 h-full px-6 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors duration-300">
              <Translate>Contact Us</Translate>
            </button>
          </div>
        </div>
        <div className="col-2  min-w-[13rem] max-tab:flex-1 max-mob1:min-w-[13rem]">
          <div
            className="bg-white flex items-center justify-center max-md:ml-10 tab1:ml-[-1rem] 
            tab2:ml-[-0rem] ml-[4.5rem] larg:absolute tab3:ml-[-.5rem] lb80:ml-[1rem]  
            moblg:ml-[5rem] mobl:ml-[5rem] mobl:absolute moblg:absolute
            md-lap:ml-[4.5rem] des24:ml-[-1.5rem] larg:ml-[10rem] max-mob1:ml-3 rounded-[10rem] w-fit p-2"
            style={{
              boxShadow:
                "0px 4px 6px rgba(0, 0, 0, 0.1), 0px -4px 6px rgba(0, 0, 0, 0.1), 4px 0px 6px rgba(0, 0, 0, 0.1), -4px 0px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={footer?.photo}
              alt="footer-photo"
              className="mx-auto rounded-[10rem] h-32 w-40 larg:w-32 max-md:h-36 max-md:w-36 lb80:w-32"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-28 max-mob1:flex-col max-mob1:gap-4 max-mob1:mt-4">
        <div
          className="relative after:content-[''] after:absolute after:left-16 max-md:left-0 max-mob1:left-[0%] after:bottom-1/2 
        after:w-full after:h-0.5 after:bg-red-500 w-1/3 max-mob1:w-2/3"
        ></div>
        <div
          className={`flex gap-3 mr-24 mt-2 max-mob:mr-0 tab1:mr-5 tab2:mr-5 tab3:mr-[1rem]
        max-mob1:justify-center max-mob1:my-3  des24:mr-[2rem] md-lap:mr-20
        max-mob1:ml-0
        max-mob3:mx-4`}
        >
          <a
            href={footer?.googleLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={footer?.googlePhoto}
              alt="googlePhoto"
              loading="lazy"
              className="rounded-xl w-40 "
            />
          </a>
          <a href={footer?.appLink} target="_blank" rel="noopener noreferrer">
            <img
              src={footer?.appPhoto}
              alt="googlePhoto"
              loading="lazy"
              className="rounded-xl w-40"
            />
          </a>
        </div>
      </div>
      <div className="text-center font-bold pb-3">
        <Translate>
          Copyright &#169; 2025 NAA World All Rights Reserved
        </Translate>
      </div>
      <div className="text-center pb-3">
        Made By <a href="https://dramcode.top" target="_blank" className="text-black font-bold">DRAM Code</a> Team
      </div>
    </footer>
  );
};

export default Footer;
