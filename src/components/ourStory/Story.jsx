import React, { useCallback, useEffect } from "react";
import { Translate, useLanguage } from "translate-easy";
import Loading from "../Loading";
import Aos from "aos";
import "aos/dist/aos.css";
const Story = ({ story, isLoading }) => {
  const { selectedLanguage } = useLanguage();

  const renderDesignText = useCallback((text) => {
    if (!text) return null;
    return text.split("\n").map((line, index) => (
      <h1
        key={index}
        className={`${
          index === 1
            ? "text-center text-4xl sm:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-[#F0515A] to-[#f2e4e3f2] text-transparent bg-clip-text max-mob1:my-2"
            : "text-lg sm:text-xl lg:text-2xl font-bold text-center"
        } ${
          index === 0 ? "ml-6 sm:ml-12 lg:ml-24 -mb-4 sm:-mb-6 lg:-mb-8" : ""
        }`}
      >
        <Translate>{line}</Translate>
      </h1>
    ));
  }, []);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const renderDescription = useCallback((description) => {
    if (!description) return null;
    return description.split("\n\n").map((paragraph, index) => (
      <p
        key={index}
        className="mb-4 sm:mb-8 lg:mb-8 text-sm sm:text-base lg:text-lg"
      >
        <Translate>{paragraph}</Translate>
      </p>
    ));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!story) return <div>No story available</div>;

  return (
    <div
      id="story"
      className="relative flex justify-center items-center pt-8 sm:pt-12 lg:pt-16 lg:pb-40 dark:bg-[--black] text-[--text] "
    >
      <div className="container flex flex-col items-center lg:flex-row tab2:flex-row tab2:gap-12 lg:gap-10">
        <div
          className="lg:mr-10 lg:mt-10 text-base sm:text-lg lg:text-xl lg:w-[40vw] tab3:w-[88%] z-30 max-mob1:mx-2"
          data-aos={selectedLanguage.code === "ar" ? "fade-left" : "fade-right"}
          data-aos-offset="300"
        >
          <h2 className="font-bold italic  ">
            <Translate>{story.title}</Translate>
          </h2>
          <div className="lg:mr-10 leading-20">
            {renderDescription(story.description)}
          </div>
        </div>
        <div
          data-aos={selectedLanguage.code === "ar" ? "fade-right" : "fade-left"}
          data-aos-offset="300"
          className="flex flex-col items-center border-t z-30 rounded-t-full h-full w-full xl:w-[25vw] desk-mob:w-[50vw] sm:w-[70vw] 
          tab3:w-[50vw] lg:w-[30vw] md:mt-8 max-mob:mt-12 md:mx-auto 
           max-mob1:w-[90%]"
          style={{
            background: `linear-gradient(to bottom, ${story.color} 5%, white 80%)`,
          }}
        >
          <div
            className="bg-white p-2 flex items-center justify-center -mt-10 rounded-full"
            style={{
              boxShadow:
                "0px 4px 6px rgba(0, 0, 0, 0.1), 0px -4px 6px rgba(0, 0, 0, 0.1), 4px 0px 6px rgba(0, 0, 0, 0.1), -4px 0px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={story.photo}
              alt="title-photo"
              className="rounded-full h-24 w-24 sm:h-32 sm:w-32 lg:h-36 lg:w-36  "
              loading="lazy"
            />
          </div>
          <div className="mt-2 mx-[1.5rem] tab2:mx-10  sm:mx-10 lg:mx-20 text-center">
            {renderDesignText(story.designText)}
          </div>
          <img
            src={story.designPhoto}
            alt="bg-story"
            loading="lazy"
            className="w-full h-48 tab2:h-[8rem] sm:h-48 lg:h-48 desk-mob:h-[15rem]"
          />
        </div>
      </div>
      {/* <div className="bg-[#F9B8B4] pt-2 rounded-full absolute top-12 right-1">
        <div className="  flex flex-col w-16 justify-center items-center z-40">
          <Header />
          <div className='w-16 h-0.5 bg-red-600 my-2'></div>
          <LanguageSelector />
        </div>
        </div> */}
    </div>
  );
};

export default React.memo(Story);
