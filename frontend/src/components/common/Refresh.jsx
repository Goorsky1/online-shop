import { useNavigate, useLocation } from 'react-router-dom';
import { getUserData, removeUserData, setUserData } from '../../utils/userSession'
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Refresh = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [refreshResponse, setRefreshResponse] = useState(null)

    function handleRefresh() {
        if (getUserData()) {
            axios.get('/api/auth/refresh')
                .then((response) => {
                    setRefreshResponse(response.data.data)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
            if (refreshResponse) {
                if (refreshResponse.expired) {
                    delete axios.defaults.headers.common.Authorization;
                    setRefreshResponse(null)
                    removeUserData()
                    navigate('/login')
                } else {
                    setUserData(refreshResponse)
                    axios.defaults.headers.common['Authorization'] = refreshResponse.token;
                }
            }
        } else {
            delete axios.defaults.headers.common.Authorization;
            setRefreshResponse(null)
            removeUserData()
        }
    }

    useEffect(() => {
        handleRefresh()
    }, [location]);

    return (
        <></>
    );
};

export default Refresh;