import React, {useState, useEffect, useRef} from "react";
import './UserCarCard.css';
import * as dayjs from 'dayjs';
import axios from 'axios';
import { authHeader } from "../../../services/authHeader";
import { GlobalState } from '../../context/index';
import { Icon, Avatar } from '@material-ui/core';
import Modal from 'react-awesome-modal';
import { FormContainer, SubmitButton, Input } from '../../../styles/style';
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
        carId : "",
        registration_no : "",
        carModel : "",
        company : "",
        carImage : "",
        features : [],
        city: "",
        no_of_passengers : "",
        engine : "",
        fuel : "",
    });

    const [carInfoUpdated, setCarInfoUpdated] = useState({
        carId : "",
        registration_no : "",
        carModel : "",
        company : "",
        carImage : "",
        features : [],
        city: "",
        no_of_passengers : "",
        engine : "",
        fuel : "",
    });

    const [image, setImage] = useState("");
    const [croppedImage, setCroppedImage] = useState("");

    useEffect(() => {
        setCarInfo({
            carId : item.id,
            registration_no : item.registration_no,
            carModel : item.modl,
            company : item.company,
            carImage : item.pictures,
            features : item.features,
            city: item.city,
            no_of_passengers : item.no_of_passengers,
            engine : item.engine_type,
            fuel : item.fuel_type,
            deposit : item.deposite,
            color : item.color,
            from_date : item.from_date,
            to_date : item.to_date,
        })
        setCarInfoUpdated({
            carImage : item.pictures,
            features : item.features,
            city: item.city,
            fuel : item.fuel_type,
            deposit : item.deposite,
            color : item.color,
            from_date : item.from_date,
            to_date : item.to_date,
        })
        inputRef.current.focus()
        document.title = "Edit Car Details"
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
        setcarInfoUpdated((prevState) => ({
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (setEditorRef) {
        //     setEditorRef.getImageScaledToCanvas().toBlob(blob => {
        //         let imageUrl = URL.createObjectURL(blob);
        //         console.log(imageUrl);
        //         setCroppedImage(imageUrl);
        //     });
        // }

        var payload = {
            carId : carInfo.carId,
            city : (carInfoUpdated.city !== carInfo.city) ? carUpdatedInfo.city : carInfo.city,
            carImage : (carInfoUpdated.carImage !== carInfo.carImage) ? carUpdatedInfo.carImage : carInfo.carImage,
            rent : (carInfoUpdated.rent !== carInfo.rent) ? carUpdatedInfo.rent : carInfo.rent,
            deposit : (carInfoUpdated.deposit !== carInfo.deposit) ? carUpdatedInfo.deposit : carInfo.deposit,
            fuel : (carInfoUpdated.fuel !== carInfo.fuel) ? carUpdatedInfo.fuel : carInfo.fuel,
            color : (carInfoUpdated.color !== carInfo.color) ? carUpdatedInfo.color : carInfo.color,
            to_date : (carInfoUpdated.to_date !== carInfo.to_date) ? carUpdatedInfo.to_date : carInfo.to_date,
            from_date : (carInfoUpdated.from_date !== carInfo.from_date) ? carUpdatedInfo.from_date : carInfo.from_date,
            features : (carInfoUpdated.features !== carInfo.features) ? carUpdatedInfo.features : carInfo.features,
        }

        console.log(payload);

        axios({
            method: "post",
            url: "http://localhost:8000/user/updatecardetails",
            headers: authHeader(),
            data: payload
        }).then((res) => {
            console.log(res);
            if (res.status == 200) {
                history.push("/");
            }
        }).catch = (err) => {
            console.log(err);
        };
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
                                    <h1 style={{ flexGrow: "1" }}>Edit Car Details</h1>
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
                                                    <img src={carInfo.carImage} alt={"user-profile"} className="profile-img" />
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
                                        <Input ref={inputRef} placeholder="Car Model" value={carInfo.carModel} name="carModel" required disabled/>
                                        <Input type="text" placeholder="Car Company" value={carInfo.company} name="carCompany" disabled />
                                        <Input type="text" placeholder="Registration No" value={carInfo.registration_no} name="reg_no" disabled />
                                        <Input type="text" placeholder="Engine Type" value={carInfo.engine} name="engine" disabled />
                                        <Input type="text" placeholder="Rent" value={carUpdatedInfo.fuel} name="rent" onChange={handleChange} disabled />
                                        <Input type="text" placeholder="Deposit" value={carUpdatedInfo.fuel} name="deposit" onChange={handleChange} disabled />
                                        {/*
                                        Drop down for city,
                                        Drop down for fuel,
                                        Drop down for color,
                                        Add-Remove type input for Features
                                        Date input type for To_date, from date
                                        */}
                                        
                                        <span style={{ display: "flex", flexDirection:"row", width:"100%", marginTop:"5%"}}>
                                            <SubmitButton onClick={(e) => { handleSubmit(e); }} style={{ width:"40%", margin:"0% 5%", padding:"2% 8%" }} > Edit Car Details </SubmitButton>
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