import React from 'react'
import './AboutUsContent.css';

function AboutUsContent() {
    return (
        <div className="about-us-content">
            <div className="content-image">
                <img src="./car-lineup1.jpg" className="car-image"/>
            </div>
            <div className="overlay-content">
                <q> Blah blah blah </q>
            </div>
        </div>
    )
}

export default React.memo(AboutUsContent);