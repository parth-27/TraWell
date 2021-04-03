import React, { useState } from 'react';
import styled from "styled-components";
import { BoxContainer, FormContainer, Input, SubmitButton } from "../../../styles/style";
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
        height: 250px;
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
        line-height: 14.24;
    `;

export const AccountConfirmation = (props) => {

    const [otp, setOTP] = useState(0);
    var payload = props.location.state.payload;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOTP((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        sendToServer();
    };


    const sendToServer = () => {
        payload = {
            ...payload,
            otp:otp
        }
        console.log(payload);
        axios.post("http://localhost:8000/user/create", payload).then((res) => {
            if (res.status == 200) {
                window.location.href = '/user/signin';
            } else {
                console.log(`error`);
                window.alert('Error please try again!!');
                window.location.href = '/user/accountConfirmation';
            }
        });
    }

    return (
        <Container>
            <TopContainer>
                <BackDrop />
                <>
                    <SmallText>Confirm Your OTP</SmallText>
                </>
            </TopContainer>
            <BoxContainer>
                <FormContainer>
                    <Input type="text" placeholder="Enter your OTP" name="otp" onChange={handleChange} required />
                    <SubmitButton onClick={handleSubmit} >Verify</SubmitButton>
                </FormContainer>
            </BoxContainer>
        </Container>
    )
}
