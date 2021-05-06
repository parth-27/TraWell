import React from 'react';
import "./Filters.css";

const Filters = () => {
    return (
        <div className="filters">
            <h2 className="section-title">Filters</h2>

            <div className="categories">

                <h3>Categories</h3>
                <input type="checkbox" id="Hatchback" name="Hatchback" />
                <label htmlFor="type">Hatchback</label>
                <br />

                <input type="checkbox" id="Sedan" name="Sedan" />
                <label htmlFor="type">Sedan</label>
                <br />

                <input type="checkbox" id="SUV" name="SUV" />
                <label htmlFor="type">SUV</label>
                <br/>

                <input type="checkbox" id="MUV" name="MUV" />
                <label htmlFor="type">MUV</label>
            </div>


            <div className="brand">

                <h3>Brand</h3>
                <input type="checkbox" id="Hyundai" name="Hyundai" />
                <label htmlFor="type">Hyundai</label>
                <br />

                <input type="checkbox" id="Maruti" name="Maruti" />
                <label htmlFor="type">Maruti Suzuki</label>
                <br />

                <input type="checkbox" id="Mahindra" name="Mahindra" />
                <label htmlFor="type">Mahindra</label>
                <br/>

                <input type="checkbox" id="Jeep" name="Jeep" />
                <label htmlFor="type">Jeep</label>
                <br/>

                <input type="checkbox" id="Kia" name="Kia" />
                <label htmlFor="type">Kia</label>
            </div>

            <div className="fuel-type">

                <h3>Fuel Type</h3>
                <input type="checkbox" id="Diesel" name="Diesel" />
                <label htmlFor="type">Diesel</label>
                <br />

                <input type="checkbox" id="Petrol" name="Petrol" />
                <label htmlFor="type">Petrol</label>
                <br />

                <input type="checkbox" id="Diesel-CNG" name="Diesel-CNG" />
                <label htmlFor="type">Diesel + CNG</label>
                <br />

                <input type="checkbox" id="Petrol-CNG" name="Petrol-CNG" />
                <label htmlFor="type">Petrol + CNG</label>

            </div>

            <div className="engines">
                
                <h3>Transmission Types</h3>
                <input type="checkbox" id="Manual" name="Manual" />
                <label htmlFor="type">Manual</label>
                <br />

                <input type="checkbox" id="Auto" name="Auto" />
                <label htmlFor="type">Auto</label>

            </div>

            <div className="seating-capacity">

                <h3>Seating Capacity</h3>
                <input type="checkbox" id="5seats" name="5seats" />
                <label htmlFor="type">5 Seats</label>
                <br />

                <input type="checkbox" id="7seats" name="7seats" />
                <label htmlFor="type">7seats</label>

            </div>

        </div>
    )
}

export default Filters;