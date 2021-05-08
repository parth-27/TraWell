import React, { useState } from "react";
import { CheckBox } from "./../Checkbox/CheckBox";
import './UserCarCard.css';

const UserCarCard = ({ item }, cardtype) => {

    return (
        cardtype == "0" ? (
        // Added car card design
        <div className="user-car-card-2">
            <div className="left-user-car-card">
                <div className="car-image-name">
                    <img src={item.picture} className="car-image" />
                </div>
            </div>
            <div className="right-user-car-card">
                <div className="car-generals">
                    <div className="seats">
                        <p> Seats</p>
                        <p> {item.no_of_passenger} </p>
                    </div>
                    <hr className="vertical" />
                    <div className="engine">
                        <p>  Engine</p>
                        <p>{item.engine_type}</p>
                    </div>
                    <hr className="vertical" />
                    <div className="fuel">
                        <p>Fuel</p>
                        <p>{item.fuel_type}</p>
                    </div>
                </div>
                <div className="car-name">
                    <div className="car-details">
                        <p> {"Car Name : " + item.company +" " +item.modl} </p>
                        <p> {"Registration No. : " + item.registration_no} </p>
                        <p> {"Deal starts from : " + item.booking_details.from_date.split("T")[0]} </p>
                        <p> {"Deal Ending : " + item.booking_details.to_date.split("T")[0]} </p>
                    </div>
                </div>
                <div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>

        ) : (
        // Other car card design
        <div className="user-car-card">
            <div className="left-user-car-card">
                <div className="car-image-div">
                    <img src={item.image} alt={"ajfbehjf"} className="user-car-image" />
                </div>
                <div className="car-details">
                    <p> {"Car Name : " + (item.car_details ? item.car_details.carid : "")} </p>
                    <p> {"Registration No. : " + (item.car_details ? item.car_details.carid : "")} </p>
                    { cardtype!="3" && cardtype!="4" &&
                        (<>
                            <p> {"Deal starts from : " + (item.booking_details ? item.booking_details.from_date.split("T")[0] : "")} </p>
                            <p> {"Deal Ending : " + (item.booking_details ?item.booking_details.to_date.split("T")[0] : "")} </p>
                        </>)
                    }
                </div>
            </div>
            {cardtype == "3" && cardtype=="4" ? (
                <div className="right-user-car-card">
                    <div className="person-info">
                        {cardtype=="4" ? (
                            <>
                                <p> {"Lender Name : " + (item.lender_details ? item.lender_details.name : "")} </p>
                                <p> {"Lender City : " +  (item.lender_details ? item.lender_details.city : "")} </p>
                                <p> {"Lender Contact : " +  (item.lender_details ? item.lender_details.contact : "")} </p>
                            </>
                        ) : (
                            <>
                                <p> {"Renter Name : " +  (item.borrower_details ? item.borrower_details.name : "")} </p>
                                <p> {"Renter City : " + (item.borrower_details ? item.borrower_details.city : "")} </p>
                                <p> {"Renter Contact : " + (item.borrower_details ? item.borrower_details.contact: "")} </p>
                            </>
                        )
                        }
                    </div>
                    <div className="rent-info-req">
                        <p> {"Deal starts from : " + (item.booking_details ? item.booking_details.from_date.split("T")[0] : "" )} </p>
                        <p> {"Deal Ending : " + (item.booking_details ? item.booking_details.to_date.split("T")[0] : "")} </p>
                        <p> {"Rental Period : " + (item.booking_details ? item.booking_details.period : "")} </p>
                        <p> {"Rent per day : " + (item.booking_details ? item.booking_details.rent : "")} </p>
                        <p> {"Rental Fare : " + (item.booking_details ? item.booking_details.rent * item.booking_details.period : "")} </p>
                    </div>
                    { // pending request , user = lender
                    cardtype=="3" && (item.booking_details ? item.booking_details.booking_status : 1) == 0 && (
                        <div className="car-requested">
                            <p> Rent Requested </p>
                            <button> Accept </button>
                            <button> Decline </button>
                        </div>
                    )}

                    { // pending request , user = renter
                    cardtype=="4" && (item.booking_details ? item.booking_details.booking_status : 1) == 0 && (
                        <div className="req-response-wait">
                            <p> The car rent request has been sent. Waiting for the lender to accept or deny. </p>
                        </div>
                    )}

                    { // rejected request , user = renter
                    cardtype=="4" && (item.booking_details ? item.booking_details.booking_status : 1) == -1 && (
                        <div className="req-response-rejected">
                            <p> Sorry, the car rent request has been denied by the lender. Please try another car. </p>
                        </div>
                    )}

                    { // accepted request , user = renter
                    cardtype=="4" && (item.booking_details ? item.booking_details.booking_status : 1) == -1 && (
                        <div className="req-response-accepted">
                            <p> The car rent request has been accepted by the lender. Enjoy your journey! </p>
                        </div>
                    )}
                </div>
            ) : (
                // card type lended cars and rented cars
                <div className="right-user-car-card">
                    <div className="person-info">
                        {cardtype == "2" && (
                            <>
                                <p> {"Lender Name : " + (item.lender_details ? item.lender_details.name : "")} </p>
                                <p> {"Lender City : " + (item.lender_details ? item.lender_details.city : "")} </p>
                                <p> {"Lender Contact : " + (item.lender_details ? item.lender_details.contact : "")} </p>
                            </>)
                        }
                        {cardtype == "1" && (
                            <>
                                <p> {"Renter Name : " +  (item.borrower_details ? item.borrower_details.name : "")} </p>
                                <p> {"Renter City : " +  (item.borrower_details ? item.borrower_details.city : "")} </p>
                                <p> {"Renter Contact : " +  (item.borrower_details ?item.borrower_details.contact : "")} </p>
                            </>)
                        }
                    </div>
                    <div className="rent-details">
                        <p> {"No. of days : " + (item.booking_details ? item.booking_details.period : "")} </p>
                        <p> {"Rent per day : " + (item.booking_details ? item.booking_details.rent : "")} </p>
                        <p> {"Total Rental Fare : " + (item.booking_details ? (item.booking_details.period * item.booking_details.rent) : "")} </p>
                        <p> {"Insurance and GST : Inclusive"}</p>
                        <p> {"Final Payable amount : " + (item.booking_details ? (item.booking_details.period * item.booking_details.rent) : "")} </p>
                    </div>
                    <div className="rent-status-details">
                        <div className="rent-progress">
                                <p>Booking Status : </p>
                                { (item.booking_details ? item.booking_details.trip_status : 0) == 1 ? (<p>Completed</p>) : (
                                (item.booking_details ? item.booking_details.trip_status : 0) == 0 ? (
                                <>
                                <p>On-Going</p> 
                                {cardtype=="2" && <button> Mark deal as completed </button>}
                                </>) : (
                                    <>
                                    <p>Upcoming</p> 
                                    <button> Cancel the trip </button>
                                    </>))}
                        </div>
                    </div>
                </div>
            )}
        </div>
        )
    );
};

export default React.memo(UserCarCard);