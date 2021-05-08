import React, { useState, useRef, useEffect } from 'react';
import './Information.css';
import { GlobalState } from '../../../context/index';
import { Icon, Avatar } from '@material-ui/core';
import Modal from 'react-awesome-modal';
import { FormContainer, SubmitButton, Input } from '../../../../styles/style';
import { useHistory } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';
import axios from 'axios';
import { authHeader } from "../../../../services/authHeader";


export const Information = () => {
    const [user, dispatch] = React.useContext(GlobalState)
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);
    const setEditorRef = useRef();
    const history = useHistory();

    const [userInfo, setUserInfo] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        pincode: "",
    });

    const [userInfoUpdated, setUserInfoUpdated] = useState({
        updatedFullName: "",
        updatedPhoneNumber: "",
        updatedAddress1: "",
        updatedAddress2: "",
        updatedCity: "",
        updatedPincode: "",
    });

    const [image, setImage] = useState("");
    const [croppedImage, setCroppedImage] = useState("");

    useEffect(() => {
        setUserInfo({
            fullName: user.fullName,
            email: user.userEmail,
            phoneNumber: user.phoneNumber,
            address: user.address,
            city: user.city,
            pincode: user.pincode,
        })
        setUserInfoUpdated({
            updatedFullName: user.fullName,
            updatedPhoneNumber: user.phoneNumber,
            updatedAddress1: user.address,
            updatedCity: user.city,
            updatedPincode: user.pincode,
        })
        inputRef.current.focus()
        document.title = "Edit Details"
    }, [open])


    const handleOpen = () => setOpen(true);

    const hideModal = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfoUpdated((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFile = event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener("load", () => {
                setImage(reader.result);
                console.log(image);
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (setEditorRef) {
        //     setEditorRef.getImageScaledToCanvas().toBlob(blob => {
        //         let imageUrl = URL.createObjectURL(blob);
        //         console.log(imageUrl);
        //         setCroppedImage(imageUrl);
        //     });
        // }

        var payload = {
            fullName: user.fullName,
            email: user.userEmail,
            phoneNumber: user.phoneNumber,
            address: user.address,
            city: user.city,
            pincode: user.pincode,
        }

        if (userInfoUpdated.updatedFullName !== userInfo.fullName)
        {
            payload = {
                ...payload,
                fullName:userInfoUpdated.updatedFullName
            }
        }

        if (userInfoUpdated.updatedPhoneNumber !== userInfo.phoneNumber) {
            payload = {
                ...payload,
                phoneNumber: userInfoUpdated.updatedPhoneNumber
            }
        }

        if (userInfoUpdated.updatedCity !== userInfo.city) {
            payload = {
                ...payload,
                city: userInfoUpdated.updatedCity
            }
        }

        if ((userInfoUpdated.updatedAddress1 + ',' + userInfoUpdated.updatedAddress2) !== userInfo.address) {
            payload = {
                ...payload,
                address: (userInfoUpdated.updatedAddress1 + ',' + userInfoUpdated.updatedAddress2)
            }
        }

        if (userInfoUpdated.updatedPincode !== userInfo.pincode) {
            payload = {
                ...payload,
                pincode: userInfoUpdated.updatedPincode
            }
        }

        console.log(payload);

        axios({
            method: "post",
            url: "http://localhost:8000/user/updateprofile",
            headers: authHeader(),
            data: payload
        }).then((res) => {
            console.log(res);
            if (res.status == 200) {
                history.push("/");
            }
        }).catch = (err) => {
            console.log(err);
        };
    };

    const changePassword = (e) => {
        e.preventDefault();
        const payload = {
            email: userInfo.email,
        }

        axios.post("http://localhost:8000/user/resetpassmail", payload).then((res) => {
            if (res.status == 200) {
                history.push("/user/confirmOTP",);
            } else {
                history.push("/user/profile");
            }
        });
    }

    return (
        <div id="info">
            <img src={"https://c4.wallpaperflare.com/wallpaper/291/744/20/anime-domestic-girlfriend-rui-tachibana-hd-wallpaper-preview.jpg"}
                alt={"hellow"}
            />
            <h1>
                <div className="fullName">{userInfo.fullName}</div>
            </h1>
            <br />
            <button
                onClick={() => handleOpen()}
            >
                Edit Profile
            </button>

            <Modal visible={open} width="750" height="750" effect="fadeInUp" onClickAway={() => hideModal()}>
                <div className="modal-container" >
                    <div className="modal-header">
                        <h1>Car Rental</h1>
                        <p>Safe Car Rentals in India</p>
                        <Icon className='far fa-times-circle' />
                        <hr />
                    </div>
                    <div className="modal-content" style={{ overflowY: 'scroll', position: 'relative', height: "550px" }} >
                        {image &&
                            <AvatarEditor
                                ref={setEditorRef}
                                image={image}
                                width={200}
                                height={200}
                                borderRadius={100}
                                color={[0, 0, 0, 0.6]} // RGBA
                                scale={1.2}
                                rotate={0}
                            />
                        }
                        <Input
                            onChange={handleFile}
                            fluid
                            type="file"
                            label="New Avatar"
                            name="previewImage"
                        />
                        <FormContainer >
                            <Input ref={inputRef} placeholder="Full Name" value={userInfoUpdated.updatedFullName} onChange={handleChange} name="updatedFullName" required />
                            <Input type="text" placeholder="Email" value={userInfo.email} name="email" disabled />
                            <Input type="tel" placeholder="0123456789" value={userInfoUpdated.updatedPhoneNumber} pattern="[0-9]{10}" maxlength="10" onChange={handleChange} name="updatedPhoneNumber" required />
                            <Input placeholder="Address 1" onChange={handleChange} name="updatedAddress1" />
                            <Input placeholder="Address 2" onChange={handleChange} name="updatedAddress2" />
                            <Input placeholder="City" value={userInfoUpdated.updatedCity} onChange={handleChange} name="updatedCity" />
                            <Input placeholder="Pincode" value={userInfoUpdated.updatedPincode} onChange={handleChange} name="updatedPincode" />
                            <span style={{ display: "flex" }}>
                                <SubmitButton onClick={(e) => {handleSubmit(e);}} style={{ flex: 1 }} > Edit Profile </SubmitButton>
                                <SubmitButton onClick={(e) => changePassword(e)} style={{ flex: 1 }} > Change Password </SubmitButton>
                            </span>
                        </FormContainer>
                    </div>
                </div>
            </Modal>
            <div className="location">{userInfo.city}</div>
            <div className="email">{userInfo.email}</div>
        </div>
    )
}
