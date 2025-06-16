import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import { Translate } from "translate-easy";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SponsorshipsModal({ show, onHide, selectedSponsorshipId }) {
  const [selectedSponsorship, setSelectedSponsorship] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSponsorship = useCallback(async () => {
    if (!selectedSponsorshipId) return;
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://naaworld.uk/api/v1/sponsorshipSections/${selectedSponsorshipId}`,
        {
          headers: {
            "X-API-KEY": "naa246lan",
          },
        }
      );
      setSelectedSponsorship(response.data.data);
    } catch (error) {
      console.error("Error fetching Sponsorship:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedSponsorshipId]);

  useEffect(() => {
    fetchSponsorship();
  }, [fetchSponsorship]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="con"
    >
      <div
        className={`rounded-[4.5rem] z-10`}
        style={{ backgroundColor: selectedSponsorship?.color }}
      >
        <Modal.Body className="min-h-[55vh] tab1:min-h-[30vh] tab2:min-h-[30vh] tab3:min-h-[33vh] moblg:min-h-[24vh] mobl:min-h-[24vh] ">
          <h2 className="px-3 flex items-center ">
            ${selectedSponsorship?.price}
          </h2>
          <h4
            style={{ wordSpacing: "0.5em", letterSpacing: "0.5em" }}
            className="text-xl font-light text-gray-800 px-3 "
          >
            <Translate>{selectedSponsorship?.name}</Translate>
          </h4>
          <div className="modal-list modal-detail ">
            {selectedSponsorship?.title?.split("\n").map((line, index) => (
              <li key={index}>
                <Translate>{line}</Translate>
              </li>
            ))}
          </div>
          <h5 className="font-semibold">
            <Translate>The sponsor will receive:</Translate>
          </h5>
          <div className="px-3 modal-detail">
            {selectedSponsorship?.description
              ?.split("\n")
              .map((line, index) => (
                <li key={index}>
                  <Translate>{line}</Translate>
                </li>
              ))}
          </div>
        </Modal.Body>

        <div className="w-max m-auto mb-5 relative z-50">
          <Button
            variant="light"
            className="relative z-50"
            style={{
              boxShadow:
                "0px 4px 6px rgba(0, 0, 0, 0.1), 0px -4px 6px rgba(0, 0, 0, 0.0), 4px 0px 6px rgba(0, 0, 0, 0.0), -4px 0px 6px rgba(0, 0, 0, 0.0)",
            }}
            onClick={() =>
              navigate(`/joinSponsorship/${selectedSponsorship?._id}`, {
                state: { selectedSponsorship, isLoading },
              })
            }
          >
            <Translate>join now</Translate>
          </Button>
        </div>
        <div className="w-max m-auto absolute bottom-[-7.6rem] left-1/2 transform -translate-x-1/2 z-20">
          <img
            src={selectedSponsorship?.photo}
            alt={selectedSponsorship?.name}
            className="h-[13.3rem] w-52 object-contain z-20"
            loading="lazy"
          />
        </div>
      </div>
    </Modal>
  );
}
export default SponsorshipsModal;
