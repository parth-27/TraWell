import React from "react";

const CarCard = ({ item }) => {

    return (
      <div className="card-design">
        <div className="card-image-div">
          <img src={item.car_details ? item.car_details.picture : ""} alt="Car" className="card-image"/>
        </div>
        {/* <div className="lender-image-div">
          <img src={item.picture} alt="hat lodu"  className="lender-image"/>
        </div> */}
        <h4 className="card-title">{item.lender_details.lender_name}</h4>
        <h4 className="card-title">{(item.car_details ? item.car_details.company : "") + " " + (item.car_details ? item.car_details.modl : "")}</h4>
        <p className="card-channel">
          <i>{item.car_details ? item.car_details.rent : ""}</i>
        </p>
        <div className="card-metrics">
          {/* {item.views} &bull; {item.published} */}
        </div>
      </div>
    );
  };

  export default React.memo(CarCard);