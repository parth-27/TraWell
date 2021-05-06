import React from 'react';
import Filters from "../../components/CardDeck/Filters";
import CarDeck from "../../components/CardDeck/CardDeck";

export const RentCar = () => {
    return (
        <div style={{display:"flex",flexDirection:"row"}}>
            <Filters />
            <CarDeck />
        </div>
    )
}
