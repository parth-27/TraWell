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
                    src="https://i.pinimg.com/564x/22/07/15/22071546f7c1a7ba363c93cdcc26bec2.jpg"
                />

                <Card
                    step="step2"
                    aos="left"
                    number="02"
                    heading="Deal &amp; Book"
                    content="Contact the Lender, Deal a contract with him and Book the car"
                    src="https://i.pinimg.com/236x/c9/97/85/c9978551f765824a2af3612c3117b853.jpg"
                />

                <Card
                    step="step3"
                    aos="right"
                    number="03"
                    heading="Pay &amp; Take-Away"
                    content="Take the Rented Car from the lender's location after Paying the safe deposits"
                    src="https://i.pinimg.com/236x/f8/5f/a5/f85fa5cc20fa64c426ea21c80c32dfbd.jpg"
                />

                <Card
                    step="step4"
                    aos="left"
                    number="04"
                    heading="Drive"
                    content="Enjoy your ride in the luxurious car"
                    src="https://i.pinimg.com/236x/01/15/df/0115df95ec10be0f04a96e63fbbe60f4.jpg"
                />

                <Card
                    step="step5"
                    aos="right"
                    number="05"
                    heading="Return"
                    content="Return Back the car at the Lender's preferred location"
                    src="https://i.pinimg.com/236x/02/8b/d7/028bd71717782755e2f78fd4eb8db69b.jpg"
                />

            </div>
        </div>
    );
}

export default React.memo(HowComponent);
