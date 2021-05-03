import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../../assets/Button/Button';
import { Link, useHistory } from 'react-router-dom';
import AuthService from "../../../services/auth";
import { authHeader } from "../../../services/authHeader";
import './Navbar.css';
import styled from "styled-components";
import axios from 'axios';
import { GlobalState } from '../../context/index';

const LoginButton = styled.button`
    :root{
        ---primary:#fff;
    }

    padding: 8px 20px;
    font-size: 18px;
    
    background-color: transparent;
    color: #fff;
    padding: 8px 20px;
    border: 1px solid var(--primary);
    transition: all 0.3s ease-out;
    
    padding: 8px 20px;
    border-radius: 2px;
    outline: none;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease-out;
        background: #fff;
        color: #242424;
        transition: 250ms;
    }

`;

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [navbar, setNavbar] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const history = useHistory();

    const [user, dispatch] = useContext(GlobalState);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);


    window.addEventListener('resize', showButton);

    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', changeBackground);

    const fetchUserProfile = () => {
        axios.get("http://localhost:8000/user/profile", { headers: authHeader() }).then((res) => {
            if (res.status == 200) {
                console.log(res);
                dispatch({
                    type: "SET_USER_DETAILS",
                    payload: {
                        email: res.data.email,
                        fullName: res.data.name,
                        phoneNumber: res.data.phone_no,
                        address: res.data.address,
                        city: res.data.city,
                        pincode: res.data.pincode,
                    }
                })
                history.push("/user/profile");
            }
        });
    }

    return (
        <>
            <nav className='navbar active'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        TraWell
            <i className='fab fa-typo3' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/user/lendcar'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Lend Your Car
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/rent'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Rent a Car
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/aboutUs'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                About Us
                            </Link>
                        </li>

                        {
                            !(AuthService.getCurrentUser() && AuthService.getCurrentUser().accessToken)
                                ?
                                <li>
                                    <Link
                                        to='/user/signin'
                                        className='nav-links-mobile'
                                        onClick={closeMobileMenu}
                                    >
                                        Log In
                                    </Link>
                                </li>
                                :
                                <div>
                                    <li
                                        className='nav-links-mobile'
                                        onClick={
                                            () => {
                                                fetchUserProfile();
                                                closeMobileMenu();
                                            }
                                        }
                                    >
                                        {/* <Link
                                            to="/"
                                            
                                        > */}
                                            My Profile
                                        {/* </Link> */}
                                    </li>
                                    <li>
                                        <Link
                                            to='/'
                                            className='nav-links-mobile'
                                            onClick={() => {
                                                AuthService.logout();
                                                closeMobileMenu();
                                            }}
                                        >
                                            Log Out
                                        </Link>
                                    </li>
                                </div>

                        }
                    </ul>
                    {
                        !(AuthService.getCurrentUser() && AuthService.getCurrentUser().accessToken)
                            ?
                            <>
                                {button && <Button buttonStyle='btn--outline' style={{ marginRight: '2.5vw' }} link="/user/signin" >LOG IN</Button>}
                            </>
                            :
                            <>
                                {
                                    button
                                    &&
                                    <>
                                        <LoginButton onClick={() => { fetchUserProfile() }} >My Profile</LoginButton>
                                        &nbsp; &nbsp;
                                        <LoginButton onClick={() => { AuthService.logout() }}>LogOut</LoginButton>
                                        {/* <Button buttonStyle='btn--outline' style={{ marginRight: '2vw' }} link="/" onClick={()=>logout}>LogOut</Button> */}
                                    </>
                                }
                            </>
                    }
                </div>
            </nav>
        </>
    );
}

export default Navbar;
