import React, { useState } from "react";
import CarCard from "./CarCard";
import Modal from "react-awesome-modal";
import { PhoneSharp, Schedule, LocationOn } from "@material-ui/icons";
import BookingDetails from "./BookingDetails";
import GeneralInstructions from "./GeneralInstructions";
import FareDetails from "./FareDetails";

const CardList = ({ list,toDate,fromDate }) => {

	const [visible, setVisible] = useState(false);
	const [car, setCar] = useState({
		carId: "",
		carName: "",
		seats: 5,
		rent: 0,
		penalty: 0,
		engine: "",
		fuel: "",
		features: [],
		picture: "",
		plan: "",
		lender_id: "",
		lender_name: "",
		lender_add: "",
		lender_phone: 1039289753,
		ref_deposit: 10000,
	})

	function openModal(item) {
		setVisible(true);
		setCar({
			carId: item.car_details ? item.car_details.carid : "",
			carName: ( item.car_details ? item.car_details.company : "" ) + " " +( item.car_details ? item.car_details.modl : "" ),
			seats: item.car_details ? item.car_details.no_of_passengers:"",
			rent: item.car_details ? item.car_details.rent:"",
			penalty: item.car_details ? item.car_details.penalty:"",
			engine: item.car_details ? item.car_details.engine_type:"",
			fuel: item.car_details ? item.car_details.fuel_type:"",
			features: item.car_details ? item.car_details.features:"",
			picture: item.car_details ? item.car_details.picture:"",
			lender_id: item.car_details ? item.car_details.lender_email:"",
			lender_name: item.lender_details ? item.lender_details.lender_name:"",
			lender_add: item.lender_details ? item.lender_details.lender_add:"",
			lender_phone: item.lender_details ? item.lender_details.lender_phone:"",
			ref_deposit: item.lender_details ? item.lender_details.ref_deposit:"",
		});
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
						<BookingDetails
							carName={car.carName}
							picture={car.picture}
							seats={car.seats}
							engine={car.engine}
							fuel={car.fuel}
							modl={car.modl}
							lender_name={car.lender_name}
							lender_add={car.lender_add}
							lender_phone={car.lender_phone}
							toDate={toDate}
							fromDate={fromDate}
						/>

						<div className="info-container">
							<GeneralInstructions />
							<FareDetails
								rent={car.rent}
								ref_deposit={car.ref_deposit}
								lender_email={car.lender_id}
								carid={car.carId}
								fromDate={fromDate}
								toDate={toDate}
							/>
						</div>

					</div>
				</div>
			</Modal>
		</div>
	);
};

export default React.memo(CardList);