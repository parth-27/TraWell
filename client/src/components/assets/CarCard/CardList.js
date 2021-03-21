import React from "react";
import CarCard from "./CarCard";

const CardList = ({ list }) => {
    return (
      <ul className="list">
        {list.items.map((item, index) => {
          return <CarCard key={index} item={item} channel={list.channel} />;
        })}
      </ul>
    );
  };

  export default CardList;