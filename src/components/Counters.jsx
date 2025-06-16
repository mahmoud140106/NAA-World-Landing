import axios from "axios";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Translate } from "translate-easy";

const Counters = () => {
  const [sections, setSections] = useState([]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(
          "https://naaworld.uk/api/v1/counters", {
          withCredentials: true,
          headers: {
            "X-API-KEY": "naa246lan"
          }
        }
        );
        const fetchedSections = response.data.data;
        setSections(fetchedSections);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    fetchSections();
  }, []);

  return (
    <div
      ref={ref}
      className="dark:bg-[--black] dark:bg-opacity-4 dark:text-white p-3 py-5 "
    >
      {/* {sections.length > 0 && inView && (
        <div className="flex justify-evenly  flex-wrap">
          <div>
            <div className="text-3xl font-bold border-solid border-4 border-red-500 rounded-full w-20 h-20 p-2 mb-3 text-center mx-auto flex items-center justify-center">
              <CountUp end={sections[0].count} duration={5} />
            </div>
            <p className="m-0 text-lg text-center font-bold">
              <Translate>Orders</Translate>
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold border-solid border-4 border-red-500 rounded-full w-20 h-20 p-2 mb-3 text-center mx-auto flex items-center justify-center">
              <CountUp
                end={sections[1].count}
                duration={5}
                className="text-3xl font-bold"
              />
            </div>
            <p className="m-0 text-lg text-center font-bold">
              <Translate>Aid Recipients</Translate>
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold border-solid border-4 border-red-500 rounded-full w-20 h-20 p-2 mb-3 text-center mx-auto flex items-center justify-center">
              <CountUp
                end={sections[2].count}
                duration={5}
                className="text-3xl font-bold"
              />
            </div>
            <p className="m-0 text-lg text-center font-bold">
              <Translate>Visits</Translate>
            </p>
          </div>
        </div>
      )} */}
      {sections.length > 0 && inView && (
        <div className="flex justify-evenly flex-wrap ">
          {sections.map((section, index) => (
            <div key={index}>
              <div className="text-3xl font-bold border-solid border-4 border-red-500 rounded-full w-[7rem] h-[7rem] p-2 mb-3 text-center mx-auto flex items-center justify-center">
                <CountUp end={section.count} duration={5} />
              </div>
              <p className="m-0 text-lg text-center font-bold">
                <Translate>
                  {section.type === "orders"
                    ? "Orders"
                    : section.type === "helps"
                      ? "Aid Recipients"
                      : section.type === "visits"
                        ? "Visits"
                        : null}
                </Translate>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Counters;
