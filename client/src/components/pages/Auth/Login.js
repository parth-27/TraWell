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
    
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

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


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (
            userInfo.email.length === 0 ||
            userInfo.password.length === 0
        ) {
            alert("one or more fields are empty!");
        } else {
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
                <Input placeholder="Email" name="email" onChange={ handleChange }/>
                <Input type="password" placeholder="Password" name="password" onChange={ handleChange }/>
            </FormContainer>
            <MutedLink href="#">Forgot Password?</MutedLink>
            <Marginer direction="vertical" margin="1em" />
            <SubmitButton>Login</SubmitButton>
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