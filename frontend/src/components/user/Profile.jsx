import React, { useState, useEffect } from 'react'
import createApiClient from '../../utils/apiClient'
import { getUserData } from '../../utils/userSession'

export function Profile() {
    const [profile, setProfile] = useState([])
    const userData = getUserData()
    const apiClient = createApiClient()
    useEffect(() => {
        apiClient.get(`/api/users/${userData.user.user_id}`)
            .then((response) => setProfile(response.data.data.user))
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [])
    return <div>
        {JSON.stringify(profile)}
    </div>;
};