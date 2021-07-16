import React, {useState, useEffect, useRef} from "react";
import './UserCarCard.css';
import * as dayjs from 'dayjs';
import axios from 'axios';
import { authHeader } from "../../../services/authHeader";
import { GlobalState } from '../../../context/index';
import { Icon, Avatar } from '@material-ui/core';
import Modal from 'react-awesome-modal';
import { FormContainer, SubmitButton, Input } from '../../../../styles/style';
import { useHistory } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';
import { LocationCity, LocationOn, Email } from '@material-ui/icons';

const UserCarCard = ({ item, cardtype }) => {
    console.log(cardtype,item);

    const [user, dispatch] = React.useContext(GlobalState);
    const [openModal, setOpenModal] = useState(false);
    const inputRef = useRef(null);
    const setEditorRef = useRef();
    const history = useHistory();

    const [carInfo, setCarInfo] = useState({
        carName: "",
        rent: "",
        phoneNumber: "",
        address: "",
        city: "",
        pincode: "",
    });

    const [userInfoUpdated, setUserInfoUpdated] = useState({
        updatedFullName: "",
        updatedPhoneNumber: "",
        updatedAddress1: "",
        updatedCity: "",
        updatedPincode: "",
    });

    const [image, setImage] = useState("");
    const [croppedImage, setCroppedImage] = useState("");

    useEffect(() => {
        setUserInfo({
            fullName: user.fullName,
            email: user.userEmail,
            phoneNumber: user.phoneNumber,
            address: user.address,
            city: user.city,
            pincode: user.pincode,
        })
        setUserInfoUpdated({
            updatedFullName: user.fullName,
            updatedPhoneNumber: user.phoneNumber,
            updatedAddress1: user.address,
            updatedCity: user.city,
            updatedPincode: user.pincode,
        })
        inputRef.current.focus()
        document.title = "Edit Details"
    }, [openModal])

    // let objectURL = "";
    // if(item){
    //     objectURL = URL.createObjectURL(item.pictures);
    // }

    // var reader = new FileReader();
    // var base64data="";
    // if (item){
    //     reader.readAsDataURL(item.pictures); 
    //     reader.onloadend = function() {
    //         base64data = reader.result;                
    //         console.log(base64data);
    //     }
    // }
    const handleOpen = () => setOpenModal(true);

    const hideModal = () => setOpenModal(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfoUpdated((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFile = event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener("load", () => {
                setImage(reader.result);
                console.log(image);
            });
        }
    };




    const sendResponse = (status, bookingid, carid) => {
        
        const payload = {
            bookingid: bookingid,
            carid:carid,
        }

        console.log(payload);
        
        if (status === 1)
        {
            axios({
                method: 'post',
                url: "http://localhost:8000/car/acceptrequestbooking",
                headers: authHeader(),
                data: payload,
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res);
                }
                
            }).catch((err) => {
                console.log(err);
                console.log("frontend");
            });
        }
        else if(status === 2)
        {
            axios({
                method: 'post',
                url: "http://localhost:8000/car/cancelrequestbooking",
                headers: authHeader(),
                data: payload,
            })
            .then((res) => {
                    if (res.status === 200) {
                        console.log(res);
                    }
                }).catch((err) => {
                    console.log(err);
                    console.log("frontend");
                });
        }
        else
        {
            axios({
                method: 'post',
                url: "http://localhost:8000/car/cancelconfirmedbooking",
                headers: authHeader(),
                data: payload,
            })
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res);
                    }
                }).catch((err) => {
                    console.log(err);
                    console.log("frontend");
                });
        }
    }

    let dayz = 0;
    if (cardtype !== "0")
    {
        const td = dayjs(item.booking_details ? item.booking_details.to_date : "", "YYYY-MM-DD");
        const fm = dayjs(item.booking_details ? item.booking_details.from_date : "", "YYYY-MM-DD");
        dayz = td.diff(fm, "day");
    }


    return (
        cardtype === "0" ? (
            // Added car card design
            <div className="user-car-card-2">
                <div className="left-user-car-card">
                    <div className="car-image-div">
                        <img src={item.pictures} className="car-image" alt="car" />
                    </div>
                </div>
                <div className="right-user-car-card">
                    <div className="car-generals">
                        <div className="seats">
                            <p> Seats</p>
                            <p className="value-x"> {item.no_of_passengers} </p>
                        </div>
                        <hr className="vertical" />
                        <div className="engine">
                            <p>  Engine</p>
                            <p className="value-x">{item.engine_type}</p>
                        </div>
                        <hr className="vertical" />
                        <div className="fuel">
                            <p>Fuel</p>
                            <p className="value-x">{item.fuel_type}</p>
                        </div>
                    </div>
                    <div className="car-name-details-2">
                        <div className="car-details">
                            <p> Car Name :</p>
                            <p className="value-x"> { " " + item.company + " " + item.modl} </p> 
                        </div><div className="car-details">
                            <p> Registration No. : </p>
                            <p className="value-x"> { " " + item.registration_no} </p>
                        </div>
                    </div>
                    <div className="button-list-2">
                        <button onclick={() => handleOpen()}>Edit</button>

                        <Modal visible={openModal} width="750" height="600" effect="fadeInUp" onClickAway={() => hideModal()}>
                            <div className="modal-container" >
                                <div className="modal-header" style={{ display: "flex", flexDirection: "row" }}>
                                    <h1 style={{ flexGrow: "1" }}>Edit Profile</h1>
                                    <Icon className='far fa-times-circle' onClick={() => hideModal()} style={{cursor:"pointer"}}/>
                                </div>
                                <hr />
                                <div className="modal-content">
                                    <FormContainer>
                                        {image ? (
                                            <div style={{ width: "50%", margin: "5% 25%"}}>
                                            <AvatarEditor
                                                ref={setEditorRef}
                                                image={image}
                                                width={300}
                                                height={300}
                                                borderRadius={200}
                                                color={[0, 0, 0, 0.6]} // RGBA
                                                scale={1.2}
                                                rotate={0}
                                            /></div>
                                            ) : (
                                                <div style={{ width: "50%", margin: "5% 25%", borderRadius:"200px", border:"1px solid black" }}>
                                                    <img src="\acc.png" alt={"user-profile"} className="profile-img" />
                                                </div>
                                        )
                                        }
                                        <Input
                                            onChange={handleFile}
                                            fluid
                                            type="file"
                                            label="New Avatar"
                                            name="previewImage"
                                        />
                                        <Input ref={inputRef} placeholder="Full Name" value={userInfoUpdated.updatedFullName} onChange={handleChange} name="updatedFullName" required />
                                        <Input type="text" placeholder="Email" value={userInfo.email} name="email" disabled />
                                        <Input type="tel" placeholder="0123456789" value={userInfoUpdated.updatedPhoneNumber} pattern="[0-9]{10}" maxlength="10" onChange={handleChange} name="updatedPhoneNumber" required />
                                        <Input placeholder="Address 1" onChange={handleChange} name="updatedAddress1" />
                                        <Input placeholder="City" value={userInfoUpdated.updatedCity} onChange={handleChange} name="updatedCity" />
                                        <Input placeholder="Pincode" value={userInfoUpdated.updatedPincode} onChange={handleChange} name="updatedPincode" />
                                        <span style={{ display: "flex", flexDirection:"row", width:"100%", marginTop:"5%"}}>
                                            <SubmitButton onClick={(e) => { handleSubmit(e); }} style={{ width:"40%", margin:"0% 5%", padding:"2% 8%" }} > Edit Profile </SubmitButton>
                                            <SubmitButton onClick={(e) => changePassword(e)} style={{ width:"40%", margin:"0% 5%", padding:"2% 8%" }} > Change Password </SubmitButton>
                                        </span>
                                    </FormContainer>
                                </div>
                            </div>
                        </Modal>

                        <button>Delete</button>
                    </div>
                </div>
            </div>

        ) : (
            // Other car card design
            <div className="user-car-card">
                <div className="left-user-car-card">
                    <div className="car-image-div">
                        <img src={item.car_details ? item.car_details.pictures : ""} alt={"ajfbehjf"} className="user-car-image" />
                    </div>
                    <div className="car-details">
                            <p>
                                {/* {"Car Name : " + (item.car_details ? item.car_details.company : "" + " " + item.car_details ? item.car_details.modl : "")} */}
                            </p>
                        <p> {"Registration No. : " + (item.car_details ? item.car_details.registration_no : "")} </p>
                        {cardtype !== "3" && cardtype !== "4" &&
                            (<>
                                <p> {"Deal starts from : " + (item.booking_details ? item.booking_details.from_date.split("T")[0] : "")} </p>
                                <p> {"Deal Ending : " + (item.booking_details ? item.booking_details.to_date.split("T")[0] : "")} </p>
                            </>)
                        }
                    </div>
                </div>
                {cardtype === "3" || cardtype === "4" ? (
                    <div className="right-user-car-card">
                        <div className="person-info">
                            {cardtype === "4" ? (
                                <div>
                                    <p> {"Lender Name : " + (item.lender_details ? item.lender_details.name : "")} </p>
                                    <p> {"Lender City : " + (item.lender_details ? item.lender_details.city : "")} </p>
                                    <p> {"Lender Contact : " + (item.lender_details ? item.lender_details.phone_no : "")} </p>
                                </div>
                            ) : (
                                <div>
                                    <p> {"Renter Name : " + (item.borrower_details ? item.borrower_details.name : "")} </p>
                                    <p> {"Renter City : " + (item.borrower_details ? item.borrower_details.city : "")} </p>
                                    <p> {"Renter Contact : " + (item.borrower_details ? item.borrower_details.phone_no : "")} </p>
                                </div>
                            )
                            }
                        </div>
                        <div className="rent-info-req">
                            <p> {"Deal starts from : " + (item.booking_details ? item.booking_details.from_date.split("T")[0] : "")} </p>
                            <p> {"Deal Ending : " + (item.booking_details ? item.booking_details.to_date.split("T")[0] : "")} </p>
                            <p> {"Rental Period : " + dayz} </p>
                            <p> {"Rent per day : " + (item.car_details ? item.car_details.rent : "")} </p>
                            <p> {"Rental Fare : " + (item.booking_details ? item.booking_details.rent : "")} </p>
                        </div>
                        { // pending request , user = lender
                            cardtype === "3" && (item.booking_details ? item.booking_details.booking_status : -1) === -1 && (
                                <div className="car-requested">
                                    <p> Rent Requested </p>
                                        <button onClick={() => sendResponse(1, item.booking_details ? item.booking_details.bookingID : "", item.booking_details ? item.booking_details.carID : "")}> Accept </button>
                                        <button onClick={() => sendResponse(-1, item.booking_details ? item.booking_details.bookingID : "", item.booking_details ? item.booking_details.carID : "")}> Decline </button>
                                </div>
                                )}
                            
                            {cardtype === "3" && (item.booking_details ? item.booking_details.booking_status : -1) === 0 && (
                            <div className="car-requested">
                                <p> You have denied this request </p>
                            </div>
                            )}

                            {cardtype === "3" && (item.booking_details ? item.booking_details.booking_status : -1) === 1 && (
                                <div className="car-requested">
                                    <p> You have accepted this request </p>
                                </div>
                            )}

                        { // pending request , user = renter
                            cardtype === "4" && (item.booking_details ? item.booking_details.booking_status : -1) === -1 && (
                                <div className="req-response-wait">
                                    <p> The car rent request has been sent. Waiting for the lender to accept or deny. </p>
                                </div>
                            )}

                        { // rejected request , user = renter
                            cardtype === "4" && (item.booking_details ? item.booking_details.booking_status : -1) === 0 && (
                                <div className="req-response-rejected">
                                    <p> Sorry, the car rent request has been denied by the lender. Please try another car. </p>
                                </div>
                            )}

                        { // accepted request , user = renter
                            cardtype === "4" && (item.booking_details ? item.booking_details.booking_status : -1) === 1 && (
                                <div className="req-response-accepted">
                                    <p> The car rent request has been accepted by the lender. Enjoy your journey! </p>
                                </div>
                            )}
                    </div>
                ) : (
                    // card type lended cars and rented cars
                    <div className="right-user-car-card">
                        <div className="person-info">
                            {cardtype === "2" && (
                                <div>
                                    <p> {"Lender Name : " + (item.lender_details ? item.lender_details.name : "")} </p>
                                    <p> {"Lender City : " + (item.lender_details ? item.lender_details.city : "")} </p>
                                    <p> {"Lender Contact : " + (item.lender_details ? item.lender_details.phone_no : "")} </p>
                                </div>)
                            }
                            {cardtype === "1" && (
                                <div>
                                    <p> {"Renter Name : " + (item.borrower_details ? item.borrower_details.name : "")} </p>
                                    <p> {"Renter City : " + (item.borrower_details ? item.borrower_details.city : "")} </p>
                                    <p> {"Renter Contact : " + (item.borrower_details ? item.borrower_details.phone_no : "")} </p>
                                </div>)
                            }
                        </div>
                        <div className="rent-details">
                            <p> {"No. of days : " + dayz} </p>
                            <p> {"Rent per day : " + (item.car_details ? item.car_details.rent : "")} </p>
                            <p> {"Total Rental Fare : " + (item.booking_details ? item.booking_details.rent : "")} </p>
                            <p> {"Insurance and GST : Inclusive"}</p>
                            <p> {"Final Payable amount : " + (item.booking_details ? item.booking_details.rent : "")} </p>
                        </div>
                        <div className="rent-status-details">
                            <div className="rent-progress">
                                <p>Trip Status : </p>
                                {(item.booking_details ? item.booking_details.trip_status : 0) === 1 ? (<p>Completed</p>) : (
                                    (item.booking_details ? item.booking_details.trip_status : 0) === 0 ? (
                                        <>
                                            <p>On-Going</p>
                                            {cardtype === "2" && <button> Mark deal as completed </button>}
                                        </>) : (
                                        <>
                                            <p>Upcoming</p>
                                            {cardtype === "2" && <button onClick={() => sendResponse(3, item.booking_details ? item.booking_details.bookingid : "", item.booking_details ? item.booking_details.carid : "")} > Cancel the trip </button>}
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