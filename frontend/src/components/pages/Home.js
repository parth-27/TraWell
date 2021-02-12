import React, { Component } from 'react';

import Footer from '../components/Footer/Footer';
import HeroComponent from '../components/Hero/HeroComponent'
import HowComponent from '../components/How/HowComponent';
import WhyComponent from '../components/Why/WhyComponent';

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
