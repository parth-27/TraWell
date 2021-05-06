import React from 'react';
import Filters from "../../components/Filters/Filters";
import CarDeck from "../../components/CardDeck/CardDeck";

export const RentCar = () => {
    return (
        <div style={{display:"flex",flexDirection:"row"}}>
            <Filters />
            <CarDeck />
        </div>
    )
}
