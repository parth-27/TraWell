import React from 'react';
import './HowComponent.css';

function HowComponent() {
    return (
        <div className="timeline" id="timeline">
            <h1> How it Works </h1>
            <div className="demo-card-wrapper">
                <div className="demo-card demo-card--step1" data-aos="fade-right" data-aos-duration="2400ms">
                    <div className="head">
                        <div className="number-box">
                            <span>01</span>
                        </div>
                        <h2>  Explore &amp; Request </h2>
                    </div>
                    <div className="body">
                        <p>Explore the website &amp; Request for the car you like</p>
                        <img src="http://placehold.it/1000x500" alt="Graphic" />
                    </div>
                </div>

                <div className="demo-card demo-card--step2" data-aos="fade-left" data-aos-duration="2400ms">
                    <div className="head">
                        <div className="number-box">
                            <span>02</span>
                        </div>
                        <h2>  Deal &amp; Book </h2>
                    </div>
                    <div className="body">
                        <p> Contact the Lander, Deal a contract with him and Book the car </p>
                        <img src="http://placehold.it/1000x500" alt="Graphic" />
                    </div>
                </div>

                <div className="demo-card demo-card--step3" data-aos="fade-right" data-aos-duration="2400ms">
                    <div className="head">
                        <div className="number-box">
                            <span>03</span>
                        </div>
                        <h2>  Pay &amp; Take-Away 
                            </h2>
                    </div>
                    <div className="body">
                        <p>Take the Rented Car from the lander's location after Paying the safe deposits.</p>
                        <img src="http://placehold.it/1000x500" alt="Graphic" />
                    </div>
                </div>

                <div className="demo-card demo-card--step4" data-aos="fade-left" data-aos-duration="2400ms">
                    <div className="head">
                        <div className="number-box">
                            <span>04</span>
                        </div>
                        <h2>  Drive</h2>
                    </div>
                    <div className="body">
                        <p>Enjoy your ride in the luxurious car.</p>
                        <img src="http://placehold.it/1000x500" alt="Graphic" />
                    </div>
                </div>

                <div className="demo-card demo-card--step5" data-aos="fade-right" data-aos-duration="2400ms">
                    <div className="head">
                        <div className="number-box">
                            <span>05</span>
                        </div>
                        <h2>Return</h2>
                    </div>
                    <div className="body">
                        <p>Return Back the car at the Lander's preferred location.</p>
                        <img src="http://placehold.it/1000x500" alt="Graphic" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HowComponent;
