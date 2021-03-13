import React, { Component } from 'react';

import Footer from '../components/Footer/Footer';
import HeroComponent from '../components/Hero/HeroComponent'
import HowComponent from '../components/How/HowComponent';
import WhyComponent from '../components/Why/WhyComponent';
import AOS from 'aos';
import "aos/dist/aos.css";
AOS.init();

export default class Home extends Component {
    render() {
        return (
            <>
                <HeroComponent />
                <HowComponent />
                <WhyComponent />
                <Footer />
            </>
        )
    }
}
