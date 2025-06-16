import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Products from "./components/product-page/Products.jsx";
import Footer from "./components/footer/Footer.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollTop from "./components/sponsorships/ScrollTop.jsx";
import JoinSponsorship from "./components/sponsorships/JoinSponsorship.jsx";
import CategoryForm from "./components/category-form/CategoryForm.jsx";
import DonateYourWay from "./components/donation/DonateYourWay.jsx";
import NavBar1 from "./components/header/Header";
import backgroundImage from "./images/lines-bg.svg";
import MemberShip from "./components/donation/MemberShip.jsx";
import GiftAid from "./components/donation/GiftAid.jsx";
import BookSeat from "./components/bookSeat/BookSeat.jsx";
import LeaveGift from "./components/donation/LeaveGift.jsx";
import DonateNow from "./components/donation/DonateNow.jsx";
import DonateMonthly from "./components/donation/DonateMonthly.jsx";
import CompleteDonation from "./components/donation/CompleteDonation.jsx";
import DonateOneTime from "./components/donation/DonateOneTime.jsx";
import CompleteOneTime from "./components/donation/CompleteOneTime.jsx";
import Order from "./components/product-page/Order.jsx";
import Customize from "./components/product-page/Customize.jsx";
import LanguageSelector from "./components/LanguageSelector.jsx";
import { useLanguage } from "translate-easy";
import Header from "./components/Theme";
import ScrollToTop from "./ScrollToTop.jsx";
import CancelOrder from "./components/CancelOrder.jsx";
import CancelCustomized from "./components/CancelCustomizedOrder.jsx";
function App() {
  const { selectedLanguage } = useLanguage();
  const [footer, setFooter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(
          "https://naaworld.uk/api/v1/sections?sort=sorting",
          {
            withCredentials: true,
            headers: {
              "X-API-KEY": "naa246lan",
            },
          }
        );
        const sections = response.data.data;
        sections.forEach((section) => {
          switch (section.type) {
            case "footer":
              setFooter(section.footer[0]);
              setIsHidden(section.hidden);
              break;

            default:
              // console.warn(`Unknown section type: ${section.type}`);
              break;
          }
        });
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStory();
  }, []);
  return (
    <BrowserRouter>
      <div id="App" className="App">
        <ScrollToTop />
        <ScrollTop />
        <div
          className="absolute inset-0 bg-cover bg-center z-20 dark:opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.4 }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center z-20"
          style={{
            backgroundImage: "bg-[--black]",
          }}
        />
        <NavBar1 />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<CategoryForm />} />
            <Route
              path="/joinSponsorship/:id"
              element={<JoinSponsorship />}
            />
            <Route path="/Products/:id" element={<Products />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/customize/:id" element={<Customize />} />
            <Route path="/BookSeat" element={<BookSeat />} />
            <Route path="/Donate-Now" element={<DonateNow />} />
            <Route path="/Donate-monthly" element={<DonateMonthly />} />
            <Route path="/Donate-one-time" element={<DonateOneTime />} />
            <Route path="/Complete-Donation" element={<CompleteDonation />} />
            <Route path="/Complete-one-time" element={<CompleteOneTime />} />
            <Route path="/donate-your-way" element={<DonateYourWay />} />
            <Route path="/membership" element={<MemberShip />} />
            <Route path="/Gift-Aid" element={<GiftAid />} />
            <Route path="/Leave-a-gift" element={<LeaveGift />} />
            <Route path="/cancelOrder/:id" element={<CancelOrder />} />
            <Route
              path="/cancelCustomizedOrder/:id"
              element={<CancelCustomized />}
            />
          </Routes>
        </div>
        <div
            className={`bg-[#F9B8B4] pt-2 rounded-full absolute top-32 z-50 ${selectedLanguage.code==='ar'?"left-1":"right-1"}`}
          >
            <div className="flex flex-col w-16 justify-center items-center z-40">
              <Header />
              <div className="w-16 h-0.5 bg-red-600 my-2"></div>
              <LanguageSelector />
            </div>
          </div>
        {isHidden === false && <Footer footer={footer} isLoading={isLoading} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
