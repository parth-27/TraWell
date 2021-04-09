export const initialUserState = {
    userEmail: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    pincode:"",
}

export const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_USER_DETAILS":
            return ({
                ...state,
                userEmail: payload.email,
                fullName: payload.fullName,
                phoneNumber: payload.phoneNumber,
                address: payload.address,
                city: payload.city,
                pincode:payload.pincode,
            })
        case "LOGIN_SUCESS":
            return ({
                ...state,
                userEmail: payload.email,
            });
        case "CLEAR_USER":
            return ({
                ...state,
                userEmail: "",
            });
        default:
            return state;
    }
}