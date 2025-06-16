import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
 
function Header() {
  const [show, setShow] = useState(true);

  const mode = () => {
    setShow(!show);
    if (window.localStorage.getItem("mode") === "light") {
      document.body.classList.add('light');
      window.localStorage.setItem("mode", "dark");
      // console.log(localStorage.getItem('mode'));
    } else if (window.localStorage.getItem("mode") === "dark") {
      document.body.classList.remove('light');
      window.localStorage.setItem("mode", "light");
      // console.log(localStorage.getItem('mode'));
    }
  };

  if (window.localStorage.getItem("mode")) {
    document.body.classList = localStorage.getItem("mode");
  } else {
    window.localStorage.setItem("mode", "light");
  }

  

  return (
    <>
      <div className="flex z-50 cursor-pointer ">
        <div id="icon" onClick={mode}>
          {window.localStorage.getItem("mode") === "light" ? (
            <FaMoon
              className="relative bg-transparent rounded-full p-1 text-gray-500 dark:hover:text-white focus:outline-none hover:text-slate-500 w-fit"
              size={36}
              title= 'Mode' 
            />
          ) : (
            <FaSun
              className="relative bg-transparent rounded-full p-1 text-gray-500 dark:hover:text-white focus:outline-none hover:text-slate-500 w-fit max-md:mx-0"
              size={36}
              title= 'Mode' 
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
