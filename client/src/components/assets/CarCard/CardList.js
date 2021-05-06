import React, { useState } from "react";
import CarCard from "./CarCard";
import Modal from "react-awesome-modal";
import { PhoneSharp, Schedule, LocationOn } from "@material-ui/icons";
import BookingDetails from "./BookingDetails";
import GeneralInstructions from "./GeneralInstructions";
import FareDetails from "./FareDetails";

const CardList = ({ list }) => {

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
		console.log("*********")
		// console.log(index)
		// console.log(item)
		setVisible(true);
		setCar({
			carId: item.carid,
			carName: item.company + " " + item.modl,
			seats: item.no_of_passengers,
			rent: item.rent,
			penalty: item.penalty,
			engine: item.engine_type,
			fuel: item.fuel_type,
			features: item.features,
			picture: item.picture,
			plan: item.plan,
			lender_id: item.lender_id,
			lender_name: item.lender_name,
			lender_add: item.lender_add,
			lender_phone: item.lender_phone,
			ref_deposit: item.ref_deposit,
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
						/>

						<div className="info-container">
							<GeneralInstructions />
							<FareDetails
								rent={car.rent}
								ref_deposit={car.ref_deposit}
							/>
						</div>

					</div>
				</div>
			</Modal>
		</div>
	);
};

export default React.memo(CardList);