import backgroundImage from "../images/lines-bg.svg";
import Story from "./ourStory/Story";
import CategoriesCard from "./category/Category";
import Donation from "./donation/Donation";
import Product from "./products/Product";
import StayTuned from "./stayTuned/StayTuned";
import WorksShops from "./workShops/WorksShops";
import Events from "./events/Events";
import Sponsorships from "./sponsorships/Sponsorships";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Counters from "./Counters";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";
import Logos from "./logos/Logos";
function Home() {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let hasUpdated = false;

  useEffect(() => {
    const fetchSections = async () => {
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
        const fetchedSections = response.data.data;
        setSections(fetchedSections);
        setIsLoading(false);
        if (!hasUpdated) {
          updateSections();
          hasUpdated = true;
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
        setIsLoading(false);
      }
    };
    fetchSections();
  }, []);

  const updateSections = async () => {
    try {
      await axios.put(
        "https://naaworld.uk/api/v1/counters",
        {},
        {
          withCredentials: true,
          headers: {
            "X-API-KEY": "naa246lan",
            "X-CSRF-Token": Cookies.get("_coo_123"),
          },
        }
      );
    } catch (error) {
      console.error("Error updating sections:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>NAA World</title>
        <link rel="canonical" href="https://naaworld.uk/" />
        <meta
          name="description"
          content="The first Arabic platform from the UK aims to connect the world through a new digital universe."
        />
      </Helmet>
      <div className="overflow-x-hidden">
        {sections.map((section) => {
          switch (section.type) {
            case "story":
              if (section.hidden === false) {
                return (
                  <Story
                    key={section.id}
                    story={section.story[0]}
                    isLoading={isLoading}
                  />
                );
              }
              return null;

            case "products":
              if (section?.hidden === false) {
                return (
                  <Product
                    key={section.id}
                    productsData={section.products[0]}
                    isLoading={isLoading}
                  />
                );
              }
              return null;

            case "categories":
              if (section.hidden === false) {
                return (
                  <CategoriesCard
                    key={section.id}
                    categoriesData={section.categories[0]}
                    isLoading={isLoading}
                  />
                );
              }
              return null;

            case "workshops":
              if (section.hidden === false) {
                return (
                  <WorksShops
                    key={section.id}
                    workshopsData={section.workshops[0]}
                    isLoading={isLoading}
                  />
                );
              }
              return null;

            case "events":
              if (section.hidden === false) {
                return (
                  <Events
                    key={section.id}
                    eventsData={section.events[0]}
                    isLoading={isLoading}
                  />
                );
              }
              return null;

            // case "donation":
            //   if (section.hidden === false) {
            //     return (
            //       <Donation
            //         key={section.id}
            //         donation={section.donation[0]}
            //         isLoading={isLoading}
            //       />
            //     );
            //   }
            //   return null;

            // case "app":
            //   if (section.hidden === false) {
            //     return (
            //       <StayTuned
            //         key={section.id}
            //         app={section.app[0]}
            //         isLoading={isLoading}
            //       />
            //     );
            //   }
            //   return null;

            // case "sponsorship":
            //   if (section.hidden === false) {
            //     return (
            //       <Sponsorships
            //         key={section.id}
            //         sponsorshipsData={section.sponsorship[0]}
            //         isLoading={isLoading}
            //       />
            //     );
            //   }
            //   return null;

            default:
              return null;
          }
        })}

        {sections.some((s) => s.type === "donation" && s.hidden === false) ||
        sections.some((s) => s.type === "app" && s.hidden === false) ? (
          <div className="relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center z-20 dark:opacity-10"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                opacity: 0.4,
              }}
            />
            <div
              className="absolute inset-0 bg-cover bg-center z-20"
              style={{
                backgroundImage: "bg-[--black]",
              }}
            />
            <div className="">
              {sections
                .filter(
                  (section) => section.type === "donation" && !section.hidden
                )
                .map((donationSection, index) => (
                  <Donation
                    key={`donation-${index}`}
                    donation={donationSection.donation[0]}
                    isLoading={isLoading}
                  />
                ))}

              {sections
                .filter((section) => section.type === "app" && !section.hidden)
                .map((appSection, index) => (
                  <StayTuned
                    key={`app-${index}`}
                    app={appSection.app[0]}
                    isLoading={isLoading}
                  />
                ))}
            </div>
          </div>
        ) : null}

        {sections.map((section) => {
          if (section.type === "sponsorship" && section.hidden === false) {
            return (
              <Sponsorships
                key={section.id}
                sponsorshipsData={section.sponsorship[0]}
                isLoading={isLoading}
              />
            );
          }
          return null;
        })}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center z-10"
            style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.4 }}
          />
        </div>
        <Logos isLoading={isLoading}/>
        <Counters />
      </div>
    </>
  );
}

export default Home;
