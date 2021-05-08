import React, { useState, useEffect } from "react";
import "./CardDeck.css";
import dummyData from "../../../data";

import CardList from "../../assets/CarCard/CardList";
import SkeletonCard from "../../assets/CarCard/SkeletonCarCard";

const Main = (props) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load this effect on mount
  useEffect(() => {
    setLoading(true);
    console.log(props)
    const timer = setTimeout(() => {
      if (props.data)
      {
        console.log(props.data);
        setCars(props.data);
      }
      setLoading(false);
    }, 2000);
    // Cancel the timer while unmounting
    return () => clearTimeout(timer);
  }, [props]);

  return (
    <div className="Main">
      {loading && <SkeletonCard />}
      {!loading &&
          (<section key="0">
            <hr className="hr-text2" data-content={"Cars in "+props.city+" for Rent"}/>
        <CardList
          list={cars}
          toDate={props.toDate}
          fromDate={props.fromDate}
            />
            <hr />
          </section>
        )}
    </div>
  );
};

export default Main;