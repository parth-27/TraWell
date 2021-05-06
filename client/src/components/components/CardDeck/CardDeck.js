import React, { useState, useEffect } from "react";
import "./CardDeck.css";
import dummyData from "../../../data";

import CardList from "../../assets/CarCard/CardList";
import SkeletonCard from "../../assets/CarCard/SkeletonCarCard";

const Main = (city, startDate, toDate) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load this effect on mount
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setCars(dummyData);
      setLoading(false);
    }, 2000);
    // Cancel the timer while unmounting
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="Main">
      {loading && <SkeletonCard />}
      {!loading &&
          (<section key="0">
            <hr className="hr-text2" data-content={"Cars in "+city+" for Rent"}/>
            <CardList list={cars} />
            <hr />
          </section>
        )}
    </div>
  );
};

export default Main;