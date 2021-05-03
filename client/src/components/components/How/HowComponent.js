import React from 'react';
import Card from './Card';
import './HowComponent.css';

function HowComponent() {
    return (
        <div className="timeline" id="timeline">
            <h1> How it Works </h1>
            <div className="demo-card-wrapper">
                
                <Card
                    step="step1"
                    aos="right"
                    number="01"
                    heading="Explore &amp; Request"
                    content="Explore the website &amp; Request for the car you like"
                    src="http://placehold.it/1000x500"
                />

                <Card
                    step="step2"
                    aos="left"
                    number="02"
                    heading="Deal &amp; Book"
                    content="Contact the Lender, Deal a contract with him and Book the car"
                    src="http://placehold.it/1000x500"
                />

                <Card
                    step="step3"
                    aos="right"
                    number="03"
                    heading="Pay &amp; Take-Away"
                    content="Take the Rented Car from the lender's location after Paying the safe deposits"
                    src="http://placehold.it/1000x500"
                />

                <Card
                    step="step4"
                    aos="left"
                    number="04"
                    heading="Drive"
                    content="Enjoy your ride in the luxurious car"
                    src="http://placehold.it/1000x500"
                />

                <Card
                    step="step5"
                    aos="right"
                    number="05"
                    heading="Return"
                    content="Return Back the car at the Lender's preferred location"
                    src="http://placehold.it/1000x500"
                />

            </div>
        </div>
    );
}

export default React.memo(HowComponent);
