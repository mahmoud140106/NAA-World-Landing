import React from "react";
import gsap from "gsap";

import { Translate } from "translate-easy";
import Loading from "../Loading";
import { ScrollTrigger } from "gsap/all";
import "aos/dist/aos.css";
gsap.registerPlugin(ScrollTrigger);

const StayTuned = ({ app, isLoading }) => {
  const [firstPart, secondPart] = app?.text ? app.text.split("\n") : ["", ""];
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div
      className="dark:bg-[--black] text-[--text]  p-4 md:p-8 lg:py-16 xl:py-20"
      dir="ltr"
    >
      <div
        className="flex justify-between items-center relative z-30 
        gap-0
        md-lap:gap-[13rem] des24:gap-[1rem] larg:gap-[16rem]  tab3:flex-wrap
       max-mob:flex-wrap max-tab:justify-center mx-16 max-md:mx-8 tab2:justify-center"
      >
        <div data-aos="fade-right" className="mt-14 pl-44 max-md:pl-3">
          <h2 className="font-bold italic min-w-max  max-tab:min-w-fit ">
            <Translate>{firstPart}</Translate>
          </h2>
          <h2 className="text-[#F13B48] font-bold  min-w-max max-tab:min-w-fit   tracking-widest">
            <Translate>{secondPart}</Translate>
          </h2>
          <p className="font-bold italic  min-w-max max-tab:min-w-fit  ">
            <Translate>{app?.description}</Translate>
          </p>

          <div className="flex gap-4  min-w-max max-tab:min-w-fit  ">
            {app?.googlePhoto && (
              <a
                href={app?.googleLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={app.googlePhoto}
                  alt="googlePhoto"
                  loading="lazy"
                  className="rounded-xl w-40"
                />
              </a>
            )}

            {app?.appPhoto && (
              <a
                href={app?.appLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={app.appPhoto}
                  alt="appPhoto"
                  loading="lazy"
                  className="rounded-xl w-40"
                />
              </a>
            )}
          </div>
        </div>
        <div className="" data-aos="fade-left">
          <div className="relative ">
            {/* tab3:h-[44vh] tab3:w-[100%] */}
            <div
              className="relative bg-no-repeat bg-cover 
                w-[30rem] h-[30rem]
              "
              style={{
                backgroundImage: `url(${app?.photo})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            >
              <div
                className="absolute inset-0 top-32 left-[30%] max-md:left-[30%] lb80:left-[40%] larg:left-[25%]
             bg-pink-200 max-mob:w-full max-mob:left-0 w-1/2 h-1/2 opacity-50 blur-xl rounded-full -z-20"
              >
                <div className="hidden">0</div>
              </div>
              {/* <img
                src={app?.designPhoto}
                alt="logo-img"
                className="absolute top-[14.8rem] right-[3rem] w-[16.8%] rotate-12
                 h-1/6 rounded-full 
                 larg:top-[18rem] larg:right-[2.5rem]
                 max-lg:top-[14.5rem] 
                md-lap:top-[14.8rem] md-lap:right-[3rem] 
                 max-md:w-[16.5%]
                 max-tab:top-[13.8rem] max-tab:right-[1rem] 
                  max-mob:w-[20.5%]
                 max-mob:right-[-2rem] 
                 max-mob3:top-[12.5rem] max-mob3:right-[-1.5rem] 
                object-contain  "
                loading="lazy"
              />

              <div
                className="absolute 
                top-[.3rem] right-[4rem] 
                md-lap:top-[.3rem] md-lap:right-[4rem] 
                larg:top-[4rem]  max-lg:top-[0rem]
              max-tab:top-[.3rem] max-tab:right-[1.5rem] -z-10
              max-mob:right-[-1.5rem] max-mob3:top-[-1.5rem]
              "
              >
                <CurvedText title={app?.designText} front={false} />
              </div>
              <div
                className="absolute z-20 
                bottom-[8rem] right-[3.5rem]
                md-lap:bottom-[8rem] md-lapright-[3.5rem]
                    larg:bottom-[10rem]  larg:right-[4rem]
                    max-lg:bottom-[4.5rem] max-lg:right-[3.5rem]
                    max-md:bottom-[4rem]
               max-tab:top-[5.3rem] max-tab:right-[.5rem]
               max-mob:right-[-2.6rem] max-mob3:top-[2.3rem]
              "
              >
                <CurvedText title={app?.designText} front={true} />
              </div>

              <img
                src={app?.designPhoto}
                alt="logo-img"
                className="absolute  rotate-6
                bottom-[18rem] right-[19.5rem] 
                md-lap:bottom-[18rem] md-lap:right-[19.5rem] 
                w-[16.5%] h-1/6 rounded-full
                 larg:bottom-[20rem] larg:right-[20rem]
                 max-lg:bottom-[14.5rem]
                 max-md:bottom-[14.1rem] max-md:right-[19rem]
                max-tab:bottom-[14.5rem] max-tab:right-[17rem] 
                 max-mob:w-[19.5%]
                max-mob:right-[14.5rem] max-mob3:bottom-[12.9rem] 
                tab3:right-[17rem]
                tab1:right-[20rem]
                tab2:right-[19rem]
                
               object-contain "
                loading="lazy"
              /> */}
            </div>
            {/* <img
              src={app?.photo}
              alt="phone-img"
              className="relative z-10 ml-32 max-md:ml-0 object-contain max-md:w-[50vw] max-md:mt-6"
              loading="lazy"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(StayTuned);
