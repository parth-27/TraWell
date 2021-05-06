import React from 'react';
import "./Filters.css";
import {CheckBox} from "./../../assets/Checkbox/CheckBox"

const Filters = () => {
    return (
        <div className="filters">
            <hr className="hr-text2" data-content="Filters"/>

            <div className="categories-filter">
                <h3>Categories</h3>
                <CheckBox labelFor="Hatchback"/>
                <CheckBox labelFor="Sedan"/>
                <CheckBox labelFor="SUV"/>
                <CheckBox labelFor="MUV"/>
            </div>


            <div className="brand-filter">
                <h3>Brand</h3>
                <CheckBox labelFor="Hyundai"/>
                <CheckBox labelFor="Maruti Suzuki"/>
                <CheckBox labelFor="Mahindra"/>
                <CheckBox labelFor="Jeep"/>
                <CheckBox labelFor="Kia"/>
            </div>

            <div className="fuel-filter">

                <h3>Fuel Type</h3>

                <CheckBox labelFor="Diesel Only"/>
                <CheckBox labelFor="Petrol Only"/>
                <CheckBox labelFor="Diesel + CNG"/>
                <CheckBox labelFor="Petrol + CNG"/>
            </div>

            <div className="engine-filter">
                
                <h3>Transmission Types</h3>
                
                <CheckBox labelFor="Manual"/>
                <CheckBox labelFor="Automatic"/>
            </div>

            <div className="seats-filter">

                <h3>Seating Capacity</h3>
                
                <CheckBox labelFor="5 seater"/>
                <CheckBox labelFor="7 seater"/>

            </div>

        </div>
    )
}

export default Filters;