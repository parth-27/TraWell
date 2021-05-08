import React from "react";

const CarCard = ({ item }) => {
    return (
      <div className="card-design">
        <div className="card-image-div">
          <img src={item.car_details ? item.car_details.picture : ""} alt={item.car_details ? item.car_details.modl : ""} className="card-image"/>
        </div>
        <div className="lender-image-div">
          <img src={item.car_details ? item.car_details.picture : ""} alt={item.car_details ? item.car_details.modl : ""}  className="lender-image"/>
        </div>
        <h4 className="card-title">{item.car_details ? item.car_details.company : ""}  {item.car_details ? item.car_details.modl:""}</h4>
        <p className="card-channel">
          <i>{item.rent}</i>
        </p>
        <div className="card-metrics">
          {/* {item.views} &bull; {item.published} */}
        </div>
      </div>
    );
  };

  export default React.memo(CarCard);