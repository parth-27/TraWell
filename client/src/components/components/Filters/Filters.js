import React, { useRef, useLayoutEffect } from 'react';
import "./Filters.css";
import { CheckBox } from "./../../assets/Checkbox/CheckBox";
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Filters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            brand: [],
            fuel: [],
            eng: [],
            seats: [],
        }
    }

    componentDidUpdate() {
        const payload = {...this.state}
        console.log(payload);
        // axios.post("http://localhost:8000/car/filter", payload)
        //     .then((res) => {
        //         if (res.status == 200) {
        //             console.log(payload)
        //             this.props.history.push("/rent");
        //         }
        //         else {
        //             this.props.history.push("/");
        //         }
        //     }).catch((err) => {
        //         console.log(err);
        //     });
    }

    eventHandler = (e) => {

        if (e.target.className == "categories") {
            if (e.target.checked) {
                this.setState({
                    categories: [...this.state.categories, e.target.name]
                });
            }
            else
            {
                let cat = this.state.categories.filter(item => item !== e.target.name);
                this.setState({
                    categories: [...cat]
                }, () => console.log("new state",this.state));
            }
        }
        else if (e.target.className == "brand") {
            if (e.target.checked) {
                this.setState({
                    brand: [...this.state.brand, e.target.name]
                });
            }
            else {
                let cat = this.state.brand.filter(item => item !== e.target.name);
                this.setState({
                    brand: [...cat]
                });
            }
        }
        else if (e.target.className == "fuel") {
            if (e.target.checked) {
                this.setState({
                    fuel: [...this.state.fuel, e.target.name]
                });
            }
            else {
                let cat = this.state.fuel.filter(item => item !== e.target.name);
                this.setState({
                    fuel: [...cat]
                });
            }
        }
        else if (e.target.className == "eng") {
            if (e.target.checked) {
                this.setState({
                    eng: [...this.state.eng, e.target.name]
                });
            }
            else {
                let cat = this.state.eng.filter(item => item !== e.target.name);
                this.setState({
                    eng: [...cat]
                });
            }
        }
        else if (e.target.className == "seats") {
            if (e.target.checked) {
                this.setState({
                    seats: [...this.state.seats, e.target.name]
                });
            }
            else {
                let cat = this.state.seats.filter(item => item !== e.target.name);
                this.setState({
                    seats: [...cat]
                });
            }
        }

    };

    render() {
        return (
            <div className="filters">
                <hr className="hr-text2" data-content="Filters" />

                <div className="categories-filter">
                    <h3>Categories</h3>
                    <CheckBox labelFor="Hatchback" className="categories" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Sedan" className="categories" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="SUV" className="categories" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="MUV" className="categories" onChange={this.eventHandler} values={false} />
                </div>


                <div className="brand-filter">
                    <h3>Brand</h3>
                    <CheckBox labelFor="Hyundai" className="brand" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Maruti Suzuki" className="brand" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Mahindra" className="brand" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Jeep" className="brand" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Kia" className="brand" onChange={this.eventHandler} values={false} />
                </div>

                <div className="fuel-filter">

                    <h3>Fuel Type</h3>
                    <CheckBox labelFor="Diesel Only" className="fuel" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Petrol Only" className="fuel" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Diesel + CNG" className="fuel" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Petrol + CNG" className="fuel" onChange={this.eventHandler} values={false} />
                </div>

                <div className="engine-filter">

                    <h3>Transmission Type</h3>
                    <CheckBox labelFor="Manual" className="eng" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Automatic" className="eng" onChange={this.eventHandler} values={false} />
                </div>

                <div className="seats-filter">

                    <h3>Seating Capacity</h3>
                    <CheckBox labelFor="5 seater" className="seats" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="7 seater" className="seats" onChange={this.eventHandler} values={false} />

                </div>

            </div>
        )
    }
}

export default withRouter(Filters);