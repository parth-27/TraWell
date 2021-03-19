import React, { useContext,useEffect,useState } from "react";
import { Marginer } from "./marginer";
import {
    BoxContainer,
    FormContainer,
    Input,
    SubmitButton,
} from "./common";
import { AccountContext } from "./context";
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Login(props) {

    const navLinkStyle = {
        color: 'rgba(170, 170, 170, 1)',
        fontSize: '15px',
        fontWeight: '500',
        margin: '10px 0',
        textDecoration: 'none',
    }

    const boldLink = {
        color: '#5963c3',
        fontWeight: '600',
        fontSize: '16px',
        textDecoration: 'none',
        margin: '0 3px',
    }

    const { switchToSignup } = useContext(AccountContext);
    
    // user information
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    // error state
    const [errorState, setErrorState] = useState({
        email: false,
        password: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        // console.log(userInfo.email, userInfo.password);
    };

    const validateForm = () => {
        let isValid = true;
        if (userInfo.email.length === 0)
        {
            setErrorState(errorState.email = true);
            isValid = false;
        }

        if (userInfo.email.length < 8) {
            setErrorState(errorState.password = true);
            isValid = false;
        }

        return isValid;
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert("Inputs are not proper");
        }
        else {
            sendToServer();
        }
        
    };

    const sendToServer = () => {
        
        const payload = {
            email: userInfo.email,
            password: userInfo.password,
        };
        axios.post("http://localhost:3000/", payload).then((res) => {
            console.log(res);
        });
    }

    return (
        <BoxContainer>
            <FormContainer >
                <Input placeholder="Email" name="email" onChange={handleChange} pattern='/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i' required/>
                <Input type="password" placeholder="Password" name="password" onChange={ handleChange } required/>
                <SubmitButton onClick={handleSubmit}>Login</SubmitButton>
            </FormContainer>
            <Link to="/forgotPassword" style={navLinkStyle}>Forgot Password?</Link>
            <Marginer direction="vertical" margin="1em" />
            <Marginer direction="vertical" margin={5} />
            <Link to="/user/signup" style={navLinkStyle} onClick={switchToSignup}>
                Dont have an Account?
            <Link to="/user/signup" onClick={switchToSignup} style={boldLink}>
                    Sign Up
            </Link>
            </Link>
        </BoxContainer>
    );
}