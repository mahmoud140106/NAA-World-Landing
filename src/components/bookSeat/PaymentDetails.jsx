import React, { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { LuCreditCard } from "react-icons/lu";
import { MdOutlineLock } from "react-icons/md";
import { Translate } from "translate-easy";
import AcceptTerms from "../AcceptTerms";

const PaymentDetails = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <h2 className="text-3xl font-bold mt-4 ml-3">
        <Translate>Payment Details</Translate>
      </h2>
      <div className=" flex justify-between items-center w-[24rem] max-mob1:w-80 max-mob3:w-64 flex-wrap ">
        <div className=" relative mb-2">
          <label className="block ml-3 mt-2 " htmlFor="Address">
            <Translate>Card number</Translate>
          </label>
          <input
            className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 py-4 pr-4 pl-14 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
            type="text"
            id="CardholderName"
            placeholder="0000 0000 0000 0000"
          />
          <LuCreditCard className="absolute top-[4.5rem] left-7" color="grey" />
        </div>
      </div>
      <div className="flex justify-between items-center w-[24rem] max-mob1:w-80 max-mob3:w-64 flex-wrap ">
        <div className="relative mb-2">
          <label className="block ml-3 mt-2 " htmlFor="Address">
            <Translate>Expires</Translate>
          </label>
          <input
            className="max-mob1:w-80 max-mob3:w-64 w-[11rem] h-14 py-4 pr-4 pl-14 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
            type="text"
            id="Expires"
            placeholder="MM / YY"
          />
          <CiCalendar className="absolute top-[4.3rem] left-7" color="grey" />
        </div>
        <div className="relative mb-2">
          <label className="block ml-3 mt-2 " htmlFor="Address">
            <Translate>Security code</Translate>
          </label>
          <input
            className="max-mob1:w-80 max-mob3:w-64 w-[11rem] h-14 py-4 pr-4 pl-14 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
            type="text"
            id="SecurityCode"
            placeholder="CVC"
          />
          <MdOutlineLock
            className="absolute top-[4.3rem] left-7"
            color="grey"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block ml-3 mt-2 " htmlFor="Address">
          <Translate>Cardholder name</Translate>
        </label>
        <input
          className="max-mob1:w-80 max-mob3:w-64 w-96 h-16 p-4 pl-3 mt-3 rounded-full border-gray-200 border-1 border-solid shadow-md focus:outline-none"
          type="text"
          id="CardholderName"
          placeholder="type here"
        />
      </div>

      <div className="flex">
            <label className="flex gap-4 cursor-pointer">
              <input type="checkbox" className="w-6 h-6 " />
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
    </>
  );
};

export default PaymentDetails;
