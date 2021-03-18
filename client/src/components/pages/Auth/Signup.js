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

export function Signup(props) {
    const { switchToSignin } = useContext(AccountContext);

    const [userInfo, setUserInfo] = useState({
        fullName:"",
        email: "",
        password: "",
        confirmPassword:"",
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
            userInfo.fullName.length === 0 ||
            userInfo.email.length === 0 ||
            userInfo.password.length === 0
        ) {
            alert("one or more fields are empty!");
        } else {
            sendToServer();
        }
    };

    const sendToServer = () => {
        const payload = {
            fullName:userInfo.fullName,
            email: userInfo.email,
            password: userInfo.password,
        };
        axios.post("http://localhost:3000/login", payload).then((res) => {
            console.log(res);
        });
    }

    return (
        <BoxContainer>
            <FormContainer onSubmit={handleSubmit}>
                <Input placeholder="Full Name" onChange={ handleChange } name="fullName"/>
                <Input placeholder="Email" onChange={handleChange} name="email"/>
                <Input type="password" placeholder="Password" onChange={handleChange} name="password"/>
                <Input type="password" placeholder="Confirm Password" onChange={handleChange} name="confirmPassword" />
            </FormContainer>
            <Marginer direction="vertical" margin="1em" />
            <SubmitButton>Signup</SubmitButton>
            <Marginer direction="vertical" margin={5} />
            <MutedLink href="/login" onClick={switchToSignin}>
                Already have an account?
            <BoldLink href="/login" onClick={switchToSignin}>
                    Log In
            </BoldLink>
            </MutedLink>
        </BoxContainer>
    );
}