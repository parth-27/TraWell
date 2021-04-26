import React, { useState } from "react";
import CarCard from "./CarCard";
import Modal from "react-awesome-modal";
import { PhoneSharp, Schedule, LocationOn } from "@material-ui/icons";

const CardList = ({ list }) => {

  const [visible, setVisible] = useState(false);
  const [car, setCar] = useState({ carId: "", carName: "", seats: 5, rent: 0, penalty: 0, engine: "", fuel: "", features: [], picture: "", plan: "", lender_id:"", lender_name:"", lender_add:"", lender_phone:1039289753, ref_deposit:10000})

  function openModal(item) {
    console.log("*********")
    // console.log(index)
    // console.log(item)
    setVisible(true);
    setCar({ carId: item.carid, carName: item.company + " " + item.modl, seats: item.no_of_passengers, rent: item.rent, penalty: item.penalty, engine: item.engine_type, fuel: item.fuel_type, features: item.features, picture: item.picture, plan: item.plan, lender_id : item.lender_id, lender_name : item.lender_name, lender_add : item.lender_add, lender_phone:item.lender_phone, ref_deposit : item.ref_deposit });
  }

  function hideModal() {
    setVisible(false);
  }

  return (
    <div className="cars-div">
      <ul className="list">
        {list.map((item, index) => {
          return (<li className="car-card" onClick={() => openModal(item)} ><CarCard key={index} item={item} /></li>);
        })}
      </ul>
      <Modal visible={visible} effect="fadeInUp" width="95%" height="90%" onClickAway={() => hideModal()}>
        <div className="modal-div">
          <div className="close-div">
            <button onClick={() => hideModal()} className="close-btn"><img src="/close-button.png" className="image-design" /></button>
          </div>
          <div className="car-details-container">
            <div className="car-profile-details-container">
              <hr className="hr-text" data-content="Car & Booking Details" />
              <br />
              <div className="car-profile-details">
                <div className="car-image-name-details">
                  <div className="car-image-name">
                    <h2>{car.carName}</h2>
                    <div>
                      <img src={car.picture} className="car-image" />
                    </div>
                  </div>
                  <div className="car-generals">
                    <div className="seats">
                      <p> Seats</p>
                      <p> {car.seats} </p>
                    </div>
                    <hr className="vertical" />
                    <div className="engine">
                      <p>  Engine</p>
                      <p>{car.engine}</p>
                    </div>
                    <hr className="vertical" />
                    <div className="fuel">
                      <p>Fuel</p>
                      <p>{car.fuel}</p>
                    </div>
                  </div>
                </div>

                <div className="booking-details">
                  <div className="lender-details">
                    <div className="lender-name-profile" style={{marginBottom:"2%"}}>
                      <img src={car.picture} alt={car.modl}  className="lender-image"/>
                      <p style={{lineHeight:"40px", paddingTop:"auto", paddingBottom:"auto", marginLeft:"10%"}}> {car.lender_name} </p>
                    </div>
                    <div className="lender-address" style={{marginBottom:"2%"}}>
                      <LocationOn fontSize="large" style = {{float : "left"}}/>
                      <p style={{lineHeight:"40px", paddingTop:"auto", paddingBottom:"auto", marginLeft : "10%"}}>{car.lender_add}</p>
                    </div>

                    <div className="lender-contact">
                      <PhoneSharp fontSize="large" style = {{float : "left"}}/>
                      <p style={{lineHeight:"40px", paddingTop:"auto", paddingBottom:"auto", marginLeft : "10%"}}> {car.lender_phone}</p>
                    </div>
                  </div>
                  <div className="journey-row">
                    <div className="journey-from"> <p> Wed, 28 Apr </p> </div>
                    <div className="to-image">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30"><g fill="none"><g><g><g><g transform="translate(0 1)"><path stroke="#979797" d="M.5 15h40" stroke-linecap="square"/><circle cx="20" cy="16" r="13" fill="#9B9B9B" stroke="#F7F7F7"/><text fill="#fff" font-family="Helvetica" font-size="13" font-weight="bold"><tspan x="12" y="21">TO</tspan></text></g></g></g></g></g></svg>
                    </div>
                    <div className="journey-to"><p> Wed, 28 May </p></div>
                  </div>
                  <div className="journey-duration">
                    <Schedule style={{float:"left"}} />
                    <p style={{float:"left", marginLeft:"10px", textDecoration:"underline"}}> Journey duration </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-container">
              <div className="left-panel">
                <div className="general-instru">
                  <hr className="hr-text" data-content="General Instructions" />
                  <table className="instructions">
                    <thead>
                    <tr>
                      <th> Details About </th>
                      <th> Instructions </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td> CHANGE IN PRICING PLAN:  </td>
                      <td> <ul> <li>The pricing plan (5 kms/hr, without fuel) cannot be changed after the booking is made </li> </ul></td>
                    </tr>
                    <tr>
                      <td> FUEL: </td>
                      <td> <ul> <li>In case you are returning the car at a lower fuel level than what was received, we will charge a flat Rs 500 refuelling service charge + actual fuel cost to get the tank to the same level as what was received.</li> </ul> </td>
                    </tr>
                    <tr>
                      <td> TOLLS, PARKING, INTER-STATE TAXES:  </td>
                      <td> <ul> <li>To be paid by you. </li> </ul></td>
                    </tr>
                    <tr>
                      <td> ID VERIFICATION:  </td>
                      <td> <ul> <li>Please keep your original Driving License handy. </li> <li>While delivering the car to you, our executive will verify your original Driving License and ID proof (same as the ones whose details were provided while making the booking). This verification is mandatory.</li><li> In the unfortunate case where you cannot show these documents, we will not be able to handover the car to you, and it will be treated as a late cancellation (100% of the fare would be payable).</li> <li> Driving license printed on A4. </li> <li> The pricing plan (5 kms/hr, without fuel) cannot be changed after the booking is madesheet of paper (original or otherwise) will not be considered as a valid document.</li> </ul> </td>
                    </tr>
                    <tr>
                      <td> PRE-HANDOVER INSPECTION: </td>
                      <td> <ul> <li>Please inspect the car (including the fuel gauge and odometer) thoroughly before approving the checklist.</li> </ul> </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="right-panel">
                <div className="charges">
                  <hr className="hr-text" data-content="Fare Details" />
                  <table className="fare">
                    <tbody>
                      <tr>
                        <td> <p style={{float:"left"}}>Base Fare</p><p style={{color:"red"}}>*</p> </td>
                        <td> <i className="fas fa-rupee-sign"> </i> {car.rent} </td>
                      </tr>

                      <tr>
                        <td> <p style={{float:"left"}}>Penalty Charges</p><p style={{color:"red"}}>*</p> </td>
                        <td> Same as Base Fare </td>
                      </tr>

                      <tr>
                        <td> <p style={{float:"left"}}>Insurance & GST</p><p style={{color:"red"}}>*</p> </td>
                        <td> Included </td>
                      </tr>

                      <tr>
                        <td> <p style={{float:"left"}}>Refundable security deposit</p><p style={{color:"red"}}>*</p> </td>
                        <td> <i className="fas fa-rupee-sign"> </i>{car.ref_deposit} </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="restriction" style={{marginTop:"1%"}}><p style={{color:"red", float:"left", marginRight:"1%"}}>*</p> These amount are based on the per day plan </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CardList;