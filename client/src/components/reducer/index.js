export const initialUserState = {
    userEmail: "",
    fullName: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
}

export const userReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "SET_USER":
            console.log(state.city);
            console.log(action.payload.email);
            return ({
                ...state,
                userEmail: action.payload.email,
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