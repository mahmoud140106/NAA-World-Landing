import React, { useEffect, useState } from "react";
import { IoIosArrowDropup } from "react-icons/io";

const ScrollTop = () => {
  const [goTop, setGoTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setGoTop(true);
      } else {
        setGoTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
        <button
          aria-label="Scroll back to top"
        className={`z-40  fixed bottom-[50px] dark:bg-white dark:bg-opacity-4 rounded-full font-bold transition-right duration-500 ${goTop?"right-[50px]":"right-[-50px]"} `}
          type="button"
          onClick={scrollTop}
        >
          <IoIosArrowDropup size={40} />
        </button>

    </div>
  );
};

export default ScrollTop;
