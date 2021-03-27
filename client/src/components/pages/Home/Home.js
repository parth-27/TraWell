import React, { useEffect } from 'react';

import Footer from '../../components/Footer/Footer';
import HeroComponent from '../../components/Hero/HeroComponent'
import HowComponent from '../../components/How/HowComponent';
import WhyComponent from '../../components/Why/WhyComponent';
import AOS from 'aos';
import "aos/dist/aos.css";
AOS.init();

export default function Home(){

    useEffect(() => {
        document.title = 'Welcome to TraWell'
    },[])

    return (
        <>
            <HeroComponent />
            <HowComponent />
            <WhyComponent />
            <Footer />
        </>
    )
}