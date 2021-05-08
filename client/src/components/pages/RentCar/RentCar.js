import React from 'react';
import Filters from "../../components/Filters/Filters";
import CarDeck from "../../components/CardDeck/CardDeck";
import axios from 'axios';
import { GlobalState } from '../../context/index';

export const RentCar = () => {

    const [user, dispatch] = React.useContext(GlobalState);
    const [response, setResponse] = React.useState([]);
    const [city, setCity] = React.useState();
    const [toDate, setToDate] = React.useState();
    const [fromDate, setFromDate] = React.useState();
    var data;

    React.useEffect(() => {

        console.log("fuckkkkkkkkkkkkkkkkkkkk");
        const payload = JSON.parse(localStorage.getItem("location"));
        setCity(payload.city);
        setToDate(payload.to);
        setFromDate(payload.from);
        console.log(city, toDate, fromDate);    
        axios.post("http://localhost:8000/car/filter", JSON.parse(localStorage.getItem("location")))
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data);
                    data = res.data;
                    setResponse(oldData => [...oldData,...data]);
                }
                else {
                }
            }).catch((err) => {
                console.log(err);
            });
    }, [])
    return (
        <div style={{display:"flex",flexDirection:"row"}}>
            <Filters />
            <CarDeck
                data={response}
                city={city}
                toDate={toDate}
                fromDate={fromDate}
            />
        </div>
    )
}
