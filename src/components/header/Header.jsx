import React, { useState, useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logoImage from "../../images/logoImage.svg";
import { Translate, useLanguage } from "translate-easy";

import { Link, useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";


const NavBar1 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const navLinksRef = useRef(null);
  const logoRef = useRef(null);
  const donationButtonRef = useRef(null);
  const navbarToggleRef = useRef(null);
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    gsap.to(donationButtonRef.current, {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    if (dropdownRef.current) {
      const dropdownChildren = dropdownRef.current.children;
      if (isDropdownOpen) {
        gsap.set(dropdownRef.current, { display: "block" });
        gsap.fromTo(
          dropdownChildren,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: "power2.out" }
        );
      } else {
        gsap.to(dropdownChildren, {
          opacity: 0,
          y: -20,
          stagger: 0.2,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => gsap.set(dropdownRef.current, { display: "none" }),
        });
      }
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen) {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          !donationButtonRef.current.contains(event.target)
        ) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    if (navLinksRef.current) {
      gsap.fromTo(
        navLinksRef.current.children,
        { opacity: 0, y: -100 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 0.5,
          ease: "power2.in",
          delay: 0.5,
        }
      );
    }
  }, []);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1.2, duration: 1, ease: "bounce.in" }
      );
    }
  }, []);

  useEffect(() => {
    if (isNavbarExpanded && navLinksRef.current) {
      gsap.fromTo(
        navLinksRef.current.children,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isNavbarExpanded]);

  // const animateToggleIcon = () => {
  //   gsap.fromTo(
  //     navbarToggleRef.current,
  //     { rotation: 0 },
  //     { rotation: 90, duration: 0.3 }
  //   );
  //   setIsNavbarExpanded((prev) => !prev);
  // };
  const toggleNavbar = () => {
    setIsNavbarExpanded((prev) => !prev);
  };

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Navbar expand="sm" className="relative  dark:bg-[--black]  text-[--text] ">
      <Container className="headerMob">
        <Navbar.Brand as={Link} to="/#home" className="z-50">
          <img
            ref={logoRef}
            src={logoImage}
            alt="logoImage"
            className="transition-transform duration-200 tab2:max-w-[200%] "
          />
        </Navbar.Brand>
        {width < 500 && (
          <div className="relative mt-2 lg:mt-0 flex items-center space-x-2 z-50">
            <button
              ref={donationButtonRef}
              className="bg-[#F13B48] text-white rounded-full z-50 px-4 py-1 flex items-center shadow-md"
              onClick={toggleDropdown}
            >
              <Translate>Donation</Translate>
              <svg
                className={`w-4 h-4 ${
                  selectedLanguage.code === "ar" ? "mr-2" : "ml-2"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className={`absolute z-50 min-w-max ${
                  selectedLanguage.code === "ar" ? "left-0" : "right-0"
                } bottom-[-13.75rem] z-50 bg-[#F9B8B4] text-gray-900 rounded-2xl px-4 py-2 max-mob:w-full  w-96`}
              >
                {[
                  { name: "Donate Now", path: "Donate-Now" },
                  { name: "Donate your way", path: "donate-your-way" },
                  { name: "Leave a gift in your Will", path: "Leave-a-gift" },
                  { name: "Gift Aid", path: "Gift-Aid" },
                  { name: "Membership", path: "membership" },
                ].map((text, index) => (
                  <button
                    key={index}
                    className={`block relative border-b border-pink-300 hover:text-gray-700 w-full  font-bold py-2
                      ${
                        selectedLanguage.code === "ar"
                          ? "pr-4 text-right"
                          : "pl-4 text-left"
                      }
                      after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 
                      after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out 
                      before:content-[''] before:absolute before:left-[-0.3rem] before:top-[95%] 
                      before:w-2 before:h-2 before:bg-red-500 before:rounded-full before:-translate-y-1/2`}
                    onClick={() => {
                      navigate(text.path);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Translate>{text.name}</Translate>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          ref={navbarToggleRef}
          onClick={animateToggleIcon}
          className="z-50" 
        /> */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          ref={navbarToggleRef}
          onClick={toggleNavbar}
          className="z-50 p-0"
        >
          <Hamburger
            aria-label="Toggle menu"
            isOpen={isNavbarExpanded}
            menuClicked={toggleNavbar}
            size={26}
            color="#F13B48"
            duration={0.5}
          />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="z-40">
          <Nav
            ref={navLinksRef}
            className="flex sm:flex-row mx-auto lg:mx-52 z-50 tab2:mx-44"
          >
            {[
              { name: "Story", path: "/#story" },
              { name: "Categories", path: "/#categories" },
              { name: "WorkShops", path: "/#workshops" },
              { name: "Events", path: "/#events" },
              { name: "Products", path: "/#products" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.path}
                className={`relative pt-4 flex items-center border-b no-underline text-[--text] 
                  border-pink-300 cursor-pointer pb-1 after:content-[''] 
                  after:absolute after:${
                    selectedLanguage.code === "ar" ? "right-2" : "left-2"
                  } 
                  after:bottom-0 after:w-0 after:h-0.5 
                  after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out 
                  max-md:hover:after:w-[9rem] max-tab:hover:after:w-[5rem] max-mob1:hover:after:w-[9rem] hover:after:w-[85%]
                  hover:before:content-[''] hover:before:absolute 
                  hover:before:${
                    selectedLanguage.code === "ar" ? "right-1" : "left-1"
                  } 
                  hover:before:top-[95%] hover:before:w-2 
                  hover:before:h-2 hover:before:bg-red-500 
                  hover:before:rounded-full hover:before:-translate-y-1/2 
                  px-3 max-tab:text-sm text-xl max-mob1:text-xl`}
              >
                <Translate>{item.name}</Translate>
              </a>
            ))}
          </Nav>
          {width > 500 && (
            <div className="relative mt-2 lg:mt-0 flex items-center space-x-2 ">
              <button
                ref={donationButtonRef}
                className="bg-[#F13B48] text-white rounded-full z-50 px-4 py-1 flex items-center shadow-md"
                onClick={toggleDropdown}
              >
                <Translate>Donation</Translate>
                <svg
                  className={`w-4 h-4 ${
                    selectedLanguage.code === "ar" ? "mr-2" : "ml-2"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className={`absolute z-50 ${
                    selectedLanguage.code === "ar" ? "left-0" : "right-0"
                  } bottom-[-13.75rem] bg-[#F9B8B4] text-gray-900 rounded-2xl px-4 py-2 max-mob:w-full  w-96`}
                >
                  {[
                    { name: "Donate Now", path: "Donate-Now" },
                    { name: "Donate your way", path: "donate-your-way" },
                    { name: "Leave a gift in your Will", path: "Leave-a-gift" },
                    { name: "Gift Aid", path: "Gift-Aid" },
                    { name: "Membership", path: "membership" },
                  ].map((text, index) => (
                    <button
                      key={index}
                      className={`block relative border-b border-pink-300 hover:text-gray-700 w-full  font-bold py-2
                      ${
                        selectedLanguage.code === "ar"
                          ? "pr-4 text-right"
                          : "pl-4 text-left"
                      }
                      after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 
                      after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out 
                      before:content-[''] before:absolute before:left-[-0.3rem] before:top-[95%] 
                      before:w-2 before:h-2 before:bg-red-500 before:rounded-full before:-translate-y-1/2`}
                      onClick={() => {
                        navigate(text.path);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Translate>{text.name}</Translate>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default memo(NavBar1);
