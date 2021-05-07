import React from 'react';
import Filters from "../../components/Filters/Filters";
import CarDeck from "../../components/CardDeck/CardDeck";
import axios from 'axios';
import { GlobalState } from '../../context/index';

export const RentCar = () => {

    const [user, dispatch] = React.useContext(GlobalState);
    const [res, setResponse] = React.useState();

    React.useEffect(() => {
        const payload = {
            to: user.toDate,
            from: user.fromDate,
            city: user.rentCity,
            categories: [],
            brand: [],
            fuel: [],
            eng: [],
            seats: [],
        }
        console.log(payload);

        axios.post("http://localhost:8000/car/filter", payload)
            .then((res) => {
                if (res.status == 200) {
                    console.log(res)
                    setResponse({ res });
                }
                else {
                }
            }).catch((err) => {
                console.log(err);
            });
        
        console.log(res);
    }, [])
    return (
        <div style={{display:"flex",flexDirection:"row"}}>
            <Filters />
            <CarDeck />
        </div>
    )
}
