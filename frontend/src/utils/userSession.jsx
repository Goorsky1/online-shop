const getUserData = () => {
    return JSON.parse(localStorage.getItem('userData'))
};

const setUserData = (data) => {
    localStorage.setItem('userData', JSON.stringify(data))
}

const removeUserData = () => {
    localStorage.removeItem('userData')
}

export { getUserData, setUserData, removeUserData };