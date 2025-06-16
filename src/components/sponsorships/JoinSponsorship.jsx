import SponsorshipForm from "./SponsorshipForm";
import { Translate } from "translate-easy";
import { useLocation } from "react-router-dom";
import Loading from "../Loading";
import { Helmet } from "react-helmet-async";

const JoinSponsorship = () => {
  const location = useLocation();
  const selectedSponsorship = location.state?.selectedSponsorship;
  const isLoading = location.state?.isLoading;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Helmet>
        <title>NAA World - Join Sponsorship</title>
        <link rel="canonical" href={`https://naaworld.uk/joinSponsorship/${selectedSponsorship?._id}`} />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div
        className={`relative inset-0 bg-cover dark:bg-[--black] dark:bg-opacity-4 bg-center  pb-32 `}
      >
        <div className="relative mx-auto w-[58%] dark:text-white max-tab:w-[70%] pb-10 pt-[10vh] max-mob1:pt-[5vh] z-30">
          <h2 className="font-bold">NNA World</h2>
          <h3 className="text-[#F13B48] ">
            <Translate>Sponsorship</Translate>
          </h3>
        </div>
        <div
          className={`rounded-[4.5rem] z-30 w-[51%] tab1:w-[65%] max-tab:w-[80%]  mx-auto relative
           after:content-[''] after:absolute after:-left-14 after:top-0 after:w-[117%] 
           max-tab:after:w-[100%] max-tab:after:-left-0  after:h-0.5 
       after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out
        before:content-[''] before:absolute before:-left-14 max-tab:before:-left-0
        before:w-2 before:h-2 before:bg-red-500 
       before:rounded-full before:-translate-y-1/2
       shadow-2xl
          `}
          style={{ backgroundColor: selectedSponsorship?.color }}
        >
          <div className="min-h-[55vh] tab1:min-h-[33vh] tab2:min-h-[35vh]  moblg:min-h-[26vh] mobl:min-h-[27vh] px-12 py-16 max-mob1:px-6 ">
            <h4
              style={{ wordSpacing: "0.5em", letterSpacing: "0.5em" }}
              className="text-xl font-light text-gray-800 px-3"
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
            <div className="relative px-3 modal-detail z-30">
              {selectedSponsorship?.description
                ?.split("\n")
                .map((line, index) => (
                  <li key={index}>
                    <Translate>{line}</Translate>
                  </li>
                ))}
            </div>
          </div>
          <div className="w-max m-auto absolute left-1/2 transform -translate-x-1/2 bottom-[-7.4rem] z-20">
            <img
              src={selectedSponsorship?.photo}
              alt={selectedSponsorship?.name}
              className="h-[13.3rem] w-52 object-contain z-20"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="relative z-30">
        <SponsorshipForm type={selectedSponsorship?.name} price={selectedSponsorship?.price} />
      </div>
    </div>
  );
};

export default JoinSponsorship;
