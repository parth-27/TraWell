import React, { useState, useRef, useEffect } from 'react';
import './Information.css';
import { GlobalState } from '../../../context/index';
import { Icon, Avatar } from '@material-ui/core';
import Modal from 'react-awesome-modal';
import { FormContainer, SubmitButton, Input } from '../../../../styles/style';
import { useHistory } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';



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
        inputRef.current.focus()
        document.title = "Edit Details"
    }, [open])


    const handleOpen = () => setOpen(true);

    const hideModal = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
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

    const handleCropImage = () => {
        console.log(setEditorRef);
        debugger;
        if (setEditorRef) {
            setEditorRef.getImageScaledToCanvas().toBlob(blob => {
                let imageUrl = URL.createObjectURL(blob);
                console.log(imageUrl);
                setCroppedImage(imageUrl);
            });
        }

        debugger;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (!validateForm()) {
        //     return;
        // }
        // else {
        //     sendToServer();
        // }
    };

    const changePassword = () => {
        history.push("/user/forgotPassword")
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
                            <Input ref={inputRef} placeholder="Full Name" value={userInfo.fullName} onChange={handleChange} name="fullName" required />
                            <Input type="text" placeholder="Email" value={userInfo.email} name="email" disabled />
                            {/* <Input type="password" placeholder="Password with atleast one letter and one number" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" onChange={handleChange} name="password" required /> */}
                            {/* <Input type="password" placeholder="Confirm Password" patter="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" onChange={handleChange} name="confirmPassword" required /> */}
                            <Input type="tel" placeholder="0123456789" value={userInfo.phoneNumber} pattern="[0-9]{10}" maxlength="10" onChange={handleChange} name="phoneNumber" required />
                            <Input placeholder="Address 1" onChange={handleChange} name="address1" />
                            <Input placeholder="Address 2" onChange={handleChange} name="address2" />
                            <Input placeholder="City" value={userInfo.city} onChange={handleChange} name="city" />
                            <Input placeholder="Pincode" value={userInfo.pincode} onChange={handleChange} name="pincode" />
                            <span style={{ display: "flex" }}>
                                <SubmitButton onClick={() => {
                                    handleCropImage();
                                    handleSubmit();
                                }} style={{ flex: 1 }} > Edit Profile </SubmitButton>
                                <SubmitButton onClick={() => changePassword()} style={{ flex: 1 }} > Change Password </SubmitButton>
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
