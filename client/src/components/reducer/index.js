export const initialUserState = {
    userEmail: "",
}

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                userEmail:action.payload.email
            }
        case 'CLEAR_USER':
            return {
                ...state,
                userEmail:"",
            }
        default:
            return state
    }
}