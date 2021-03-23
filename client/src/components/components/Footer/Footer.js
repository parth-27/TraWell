import React from 'react';
import './Footer.css';
import { Button } from '../../assets/Button/Button';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer-container'>
            {/* <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Join the Adventure newsletter to receive our best vacation deals
        </p>
                <p className='footer-subscription-text'>
                    You can unsubscribe at any time.
        </p>
                <div className='input-areas'>
                    <form>
                        <input
                            className='footer-input'
                            name='email'
                            type='email'
                            placeholder='Your Email'
                        />
                        <Button buttonStyle='btn--outline'>Subscribe</Button>
                    </form>
                </div>
            </section> */}
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/sign-up'>How it works</Link>
                        <Link to='/'>Terms of Service</Link>
                    </div>
                </div>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Explore</h2>
                        <Link to='/'>Book a Car</Link>
                        <Link to='/'>Rent out car</Link>
                        <Link to='/'>Trust & Safety</Link>
                        <Link to='/'>FAQs</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Contact Us</h2>
                        <Link to='/'>Contact</Link>
                        <Link to='/'>Support</Link>
                        <Link to='/'>Destinations</Link>
                        <Link to='/'>Sponsorships</Link>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            TraWell
                        <i className='fab fa-typo3' />
                        </Link>
                    </div>
                    <small className='website-rights'>TRAWELL © 2021</small>
                    <div>
                        <Link
                            to='/'
                            target='_blank'
                            style={{color:"white"}}
                        >
                            Privacy
                        </Link>
                        &nbsp; &nbsp;
                        <Link
                            to='/'
                            target='_blank'
                            style={{ color: "white" }}
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;
