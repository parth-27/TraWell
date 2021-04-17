export const initialUserState = {
    userEmail: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    pincode: "",
    count: 0,
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
                pincode: payload.pincode,
            })
        case "CLEAR_USER":
            return initialUserState
        case "OTP_FAILED":
            return ({
                ...state,
                count:state.count+1,
            })
        case "LOGIN_SUCESS":
            return ({
                ...state,
                userEmail: payload.email,
            });
        default:
            return state;
    }
}