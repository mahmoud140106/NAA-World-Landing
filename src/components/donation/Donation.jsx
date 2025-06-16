import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Translate } from "translate-easy";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
gsap.registerPlugin(ScrollTrigger);

 const Donation = ({ donation, isLoading }) => {
  const navigate = useNavigate();
  const leftDivRef = useRef(null);
  const rightDivRef = useRef(null);
  const images = [donation.photo, donation.designPhoto];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    let observer;
    const currentLeftDiv = leftDivRef.current;
  
    if (currentLeftDiv) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            const intervalId = setInterval(() => {
              setCurrentIndex(1);
            }, 3000);
            return () => clearInterval(intervalId);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(currentLeftDiv);
    }
  
    return () => {
      if (observer && currentLeftDiv) observer.disconnect();
    };
  }, [hasStarted]);
  
  // useEffect(() => {
  //   Aos.init({ duration: 1000 });
  // }, []);
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentIndex(1);
  //   }, 10000);
  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    const leftAnim = gsap.fromTo(
      leftDivRef.current,
      {
        x: "-100%",
        opacity: 0,
      },
      {
        x: "0",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftDivRef.current,
          start: "top 80%",
          toggleActions: "play none none reset", // Triggers animation on scroll
        },
      }
    );

    const rightAnim = gsap.fromTo(
      rightDivRef.current,
      {
        x: "100%",
        opacity: 0,
      },
      {
        x: "0",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightDivRef.current,
          start: "top 80%",
          toggleActions: "play none none reset", // Replays animation on scroll
        },
      }
    );

    // Clean up individual ScrollTriggers on component unmount
    return () => {
      if (leftAnim.scrollTrigger) leftAnim.scrollTrigger.kill();
      if (rightAnim.scrollTrigger) rightAnim.scrollTrigger.kill();
    };
  }, []);

  const textParts = donation?.text ? donation.text.split("\n") : [];
  const firstPart = textParts[0] || "";
  const remainingPart = textParts[1] || "";
  const middlePart = remainingPart.split(" ")[0] || "";
  const remainingLastPart = remainingPart.replace(`${middlePart} `, "") || "";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="py-3 dark:bg-[--black] " dir="ltr">
      <h1 className="text-4xl font-bold pt-[3rem] max-mob:pt-0 tracking-[1rem] text-center text-[--text]">
        <Translate>{donation.title}</Translate>
      </h1>
      <div className="flex justify-between max-tab:flex-wrap max-tab:gap-6 relative z-30">
        <div
          ref={leftDivRef}
          data-aos="fade-right"
          className="w-50vh ml-56 mt-32  max-md:mx-16 max-mob:mx-20 max-mob2:mx-14 max-md:w-fit max-md:mt-10 text-[--text]"
        >
          <h2 className="text-[#F13B48] font-bold min-w-max">
            <Translate>{firstPart}</Translate>
          </h2>
          <h2 className=" flex gap-1">
            <span className="font-bold min-w-max ">
              <Translate>{middlePart}</Translate>
            </span>
            <span className="min-w-max ">
              <Translate>{` ${remainingLastPart}`}</Translate>
            </span>
          </h2>
          <p className="text-[--text] ">
            <Translate>{donation.description}</Translate>
          </p>
          <button
            className="bg-[#F13B48] text-white font-bold rounded-full px-4 py-1 shadow-md"
            onClick={() => {
              navigate("/Donate-Now");
            }}
          >
            <Translate>Donation</Translate>
          </button>
        </div>
        <div
          ref={rightDivRef}
          data-aos="fade-left"
          className="w-[80vh] max-mob3:w-[60vh] max-tab:w-fit"
        >
          <img
            src={images[currentIndex]}
            alt="box-img"
            className=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
export default Donation;
