import React from "react";
import UserCarCard from "./UserCarCard";

const UserCarCardList = ({ list }, cardtype) => {

	return (
		<div className="cars-div">
			<ul className="list">
				{
					list.map((item, index) => {
						console.log(item);
						return (<li className="user-car-card"><UserCarCard cardtype={cardtype} key={index} item={item} /></li>);
					})
				}
			</ul>
		</div>
	);
};

export default React.memo(UserCarCardList);