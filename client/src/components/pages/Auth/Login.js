import React, { useContext,useEffect,useState } from "react";
import { Marginer } from "./marginer";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
} from "./common";
import { AccountContext } from "./context";
import axios from 'axios';

export function Login(props) {
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
        console.log("login bitch");
        e.preventDefault();

        if (!validateForm()) {
            alert("Inputs are not proper");
        }
        else {
            sendToServer();
        }
        
    };

    const sendToServer = () => {
        console.log("hello");
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
            <FormContainer onSubmit={handleSubmit}>
                <Input placeholder="Email" name="email" onChange={handleChange} pattern='/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i' required/>
                <Input type="password" placeholder="Password" name="password" onChange={ handleChange } required/>
                <SubmitButton>Login</SubmitButton>
            </FormContainer>
            <MutedLink href="#">Forgot Password?</MutedLink>
            <Marginer direction="vertical" margin="1em" />
            <Marginer direction="vertical" margin={5} />
            <MutedLink href="/signup">
                Dont have an Account?
        <BoldLink href="/signup" onClick={switchToSignup}>
                    Sign Up
        </BoldLink>
            </MutedLink>
        </BoxContainer>
    );
}