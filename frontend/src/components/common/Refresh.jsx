import { useNavigate, useLocation } from 'react-router-dom';
import { getUserData, removeUserData, setUserData } from '../../utils/userSession'
import createApiClient from '../../utils/apiClient'
import React, { useState, useEffect } from 'react'

const Refresh = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const apiClient = createApiClient()
    const [refreshResponse, setRefreshResponse] = useState(null)

    function handleRefresh() {
        if (getUserData()) {
            apiClient.get('/api/auth/refresh')
                .then((response) => setRefreshResponse(response.data.data))
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
            if (refreshResponse) {
                if (refreshResponse.expired) {
                    removeUserData()
                    navigate('/login')
                } else {
                    setUserData(refreshResponse)
                }
            }
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