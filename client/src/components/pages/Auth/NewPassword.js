import React, { useState } from 'react';
import styled from "styled-components";
import { BoxContainer, FormContainer, Input } from "./common";
import axios from 'axios';

const Container = styled.div`
        margin-left:auto;
        margin-right:auto;
        margin-top : 8%;
        margin-bottom : 2%;
        width: 30%;
        transition : width 1s;
        @media (max-width : 900px){
            width:75%;
            transition : width 1s;
        }
        @media (max-width : 640px){
            width:94%;
            transition : width 0.5s;
        }
        min-height: 200px;
        height:90%;
        display: flex;
        flex-direction: column;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);
        position: relative;
        overflow: hidden;
    `;

const TopContainer = styled.div`
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
        padding: 0 2em;
        padding-bottom: 3.5em;
    `;

const BackDrop = styled.div`
        position: absolute;
        width: 65%;
        height: 250px;
        border-radius: 50%;
        transform: rotate(60deg);
        background: #151515;
    `;

const SmallText = styled.h5`
        font-weight: 500;
        color: #fff;
        z-index: 10;
        margin: 0;
        margin-left: 8%;
        font-size: 20px;
        line-height: 8.24;
    `;

const SubmitButton = styled.button`
        background-color: transparent;
        padding: 11px 30%;
        width: 100%;
        color: #151515;
        font-size: 20px;
        font-weight: 600;
        border: 1px solid #151515;
        border-radius: 2px;
        cursor: pointer;
        transition: all, 240ms ease-in-out;
        background: #fff; /* fallback for old browsers */
        
        
        /* Chrome 10-25, Safari 5.1-6 */
        ${'' /* background: -webkit-linear-gradient(
            to right,
            #2ebf91,
            #8360c3
        );  */}
        
        
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        ${'' /* background: linear-gradient(
            to right,
            #2ebf91,
            #8360c3
        );  */}
        
        &:focus {
            outline: none;
        }
        &:hover {
            filter: brightness(1.03);
            transition: all 0.3s ease-out;
            background: #151515;
            color: #fff;
            transition: 250ms;
        }
    `;

export const NewPassword = () => {


    const [newPass, setPassword] = useState({
        password: "",
        confirmPassword:"",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(newPass.confirmPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const passValidation = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$";

        if(newPass.password.match(passValidation) && newPass.password===newPass.confirmPassword && newPass.password.length !== 0)
            sendToServer();
        else
        {
            console.log(`error`);
            window.alert('Error please try again!!');
            window.location.href = '/resetPassword';
        }

    };

    const sendToServer = () => {
        const payload = {
            password: newPass.password,
        }
        axios.post("http://localhost:8000/user/create", payload).then((res) => {
            if (res.status == 200) {
                window.location.href = '/user/signin';
            } else {
                console.log(`error`);
                window.alert('Error please try again!!');
                window.location.href = '/resetPassword';
            }
        });
    }

    return (
        <Container>
            <TopContainer>
                <BackDrop />
                <>
                    <SmallText>Reset Your Password</SmallText>
                </>
            </TopContainer>
            <BoxContainer>
                <FormContainer>
                    <Input type="password" placeholder="Enter New Password" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" onChange={handleChange} name="password" required />
                    <Input type="password" placeholder="Confirm Password" patter="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" onChange={handleChange} name="confirmPassword" required />
                    <SubmitButton onClick={handleSubmit} >Reset&nbsp;Password</SubmitButton>
                </FormContainer>
            </BoxContainer>
        </Container>
    )
}
