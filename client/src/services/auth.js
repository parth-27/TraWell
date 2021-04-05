const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    logout,
    getCurrentUser,
};