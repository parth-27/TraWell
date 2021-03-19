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

export function Signup(props) {

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

    const { switchToSignin } = useContext(AccountContext);

    const [userInfo, setUserInfo] = useState({
        fullName:"",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
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
        let isValid = false;
        
        const passValidation = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$";
        var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        
        
        if (userInfo.password === userInfo.confirmPassword && userInfo.password.match(passValidation) && userInfo.password.length !== 0)
        {
            isValid = true;
        }

        if (emailPattern.test(userInfo.email) && userInfo.email.length !== 0)
        {
            isValid = true;
        }

        if (userInfo.fullName.length !== 0 && userInfo.phoneNumber.length !== 0)
        {
            isValid = true;
        }

        
        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm())
        {
            alert("Inputs are not proper");
        }
        else
        {
            sendToServer();
        }
    };

    const sendToServer = () => {
        console.log(`function called`);
        setTimeout(5000);
        debugger;
        const payload = {
            fullName:userInfo.fullName,
            email: userInfo.email,
            password: userInfo.password,
            phoneNumber: userInfo.phoneNumber,
            address:userInfo.address,
        }
        // axios.post('http://localhost:8000/user/create',payload).then(res => console.log(res.data));
        axios.get('http://localhost:8000/user/get').then((res)=>{
            console.log(res);;
        },(err)=>{
            console.log(err);
            debugger;
        })
        // axios.post("http://localhost:8000/user/create", payload).then((res) => {
        //     debugger;
        // if(res.status==200){
        //         console.log(`succcess`);
        //         setTimeout(10000)
        //         debugger;
        //     }else{
        //         console.log(`error`);
        //         setTimeout(10000)
        //         debugger;
        //     }
        // });
        window.location.href = '/user/signin';
    }

    return (
        <BoxContainer>
            <FormContainer >
                <Input placeholder="Full Name" onChange={ handleChange } name="fullName" required/>
                <Input type="email" placeholder="Email" onChange={handleChange} name="email" pattern='/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i' />
                <Input type="password" placeholder="Password with atleast one letter and one number" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" onChange={handleChange} name="password" required/>
                <Input type="password" placeholder="Confirm Password" patter="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" onChange={handleChange} name="confirmPassword" required/>
                <Input type="tel" placeholder="0123456789" pattern="[0-9]{10}" maxlength="10" onChange={handleChange} name="phoneNumber" required />
                <Input placeholder="Address 1" onChange={handleChange} name="address1" />
                <Input placeholder="Address 2" onChange={handleChange} name="address2" />
                <Input placeholder="City" onChange={handleChange} name="city" />
                <Input placeholder="Pincode" onChange={handleChange} name="pincode" />
                <SubmitButton onClick={handleSubmit} >Signup</SubmitButton>
            </FormContainer>
            <Marginer direction="vertical" margin="1em" />
            <Marginer direction="vertical" margin={5} />
            <Link to="/user/signin" onClick={switchToSignin} style={navLinkStyle}>
                Already have an account?
            <Link to="/user/signin" onClick={switchToSignin} style={boldLink}>
                    Log In
            </Link>
            </Link>
        </BoxContainer>
    );
}