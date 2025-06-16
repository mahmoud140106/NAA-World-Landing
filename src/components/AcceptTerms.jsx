import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Translate } from "translate-easy";
import Loading from "./Loading";

function AcceptTerms({ show, onHide }) {
  const [terms, setTerms] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get("https://naaworld.uk/api/v1/terms",
          {
            headers: {
              "X-API-KEY": "naa246lan"
            }
          }
        );
        const termsDetails = response.data.data[0]?.details || "";
        setTerms(termsDetails);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching terms:", error);
        setIsLoading(false);
      }
    };

    fetchTerms();
  }, []);
  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="con"
      >
        <div className={`rounded-[4.5rem] z-10`}>
          <Modal.Body className="min-h-[50vh] p-10">
            <h5 className=" flex items-center font-bold pt-3">
              <Translate>Our Terms & conditions</Translate>
            </h5>
            {isLoading ? (
              <Loading />
            ) : (
              <p className="px-4 mt-4 max-w-[80%] max-tab:max-w-[100%] text-lg">
                <Translate>{terms}</Translate>
              </p>
            )}
          </Modal.Body>

          <div className="w-max m-auto relative z-50 bottom-[-1.5rem]">
            <button
              variant=""
              className="relative z-50 py-2 px-4 font-bold rounded-full bg-[#F13B48] "
              style={{
                color: "white",
                boxShadow:
                  "0px 4px 6px rgba(0, 0, 0, 0.1), 0px -4px 6px rgba(0, 0, 0, 0.0), 4px 0px 6px rgba(0, 0, 0, 0.0), -4px 0px 6px rgba(0, 0, 0, 0.0)",
              }}
              onClick={onHide}
            >
              <Translate>Accept</Translate>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AcceptTerms;
