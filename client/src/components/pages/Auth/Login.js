import React, { useContext,useEffect,useState,useRef } from "react";
import { Marginer } from "./marginer";
import {
    BoxContainer,
    FormContainer,
    Input,
    SubmitButton,
} from "../../../styles/style";
import { AccountContext } from "./context";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userContext } from '../../context/index';

export function Login(props) {

    const inputRef = useRef(null);
    const UserContext = useContext(userContext);

    const navLinkStyle = {
        color: 'rgba(170, 170, 170, 1)',
        fontSize: '15px',
        fontWeight: '500',
        margin: '10px 0',
        textDecoration: 'none',
    }

    const errorStyle = {
        color: '#c2372d',
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
        error: false,
        statement:""
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
        if (userInfo.email.length === 0)
        {
            setErrorState({
                error: true,
                statement:"Email Field is empty"
            });
            return false;
        }

        if (userInfo.password.length < 8) {
            
            if (userInfo.password.length > 0)
            {
                setErrorState({
                    error: true,
                    statement: "Please Enter Password in given format",
                });
            }
            else
            {
                setErrorState({
                    error: true,
                    statement: "Please Enter Your Password",
                });
            }

            return false;
        }

        setErrorState({
            error: false,
            statement:""
        })
        return true;
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
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
        axios.post("http://localhost:8000/user/signin", payload).then((res) => {
            if (res.status == 200) {

                UserContext.userDispatch({
                    type: 'SET_USER', payload: {
                        email: userInfo.email,
                    }
                });
                
                window.location.href = '/userProfile';
            }
            else {
                setErrorState({
                    error: true,
                    statement:"Please try again to signin"
                })
                window.alert('Error please try again!!');
                window.location.href = '/user/signin';
                
            }
        });
    }

    useEffect(() => {
        inputRef.current.focus();
        document.title = "Login into your account";
    },[])

    return (
        <BoxContainer>
            <p style={errorStyle}>{errorState.error && errorState.statement}</p>
            <FormContainer >
                <Input ref={inputRef} placeholder="Email" name="email" onChange={handleChange} pattern='/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i' required/>
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