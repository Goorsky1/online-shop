import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../utils/userSession';
import './styleUserPanel.css';
import axios from 'axios';

export function ProfileEdit() {
    const successMessage = 'Profile updated successfully!'
    const [newPhone, setNewPhone] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = getUserData();
        setNewPhone(user.user.user_phone || '');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = getUserData();

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match. Please check and try again.');
            return;
        } else if (newPassword === user.user.user_password) {
            setMessage('New password cannot be the same as the old password.');
            return;
        } else if (newPassword.length > 0 && newPassword.length < 5) {
            setMessage('Password must be at least 5 characters long.');
            return;
        }

        try {
            const requestData = {
                "user_phone": newPhone,
            };
            if (newPassword !== "") {
                requestData.user_password = newPassword;
            }
            console.log("requestData:", requestData)
            const response = await axios.patch(`/api/users/${user.user.user_id}`, requestData);
            setMessage(successMessage);
        } catch (error) {
            setMessage('Error updating profile. Please try again.');
            console.error('Error updating profile:', error);
        }
        navigate('/profile')
    };

    return (
        <div className="container mt-4">
            <div className="space" />
            <h1>Edit Profile</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="newPhone" className="form-label">Phone:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="newPhone"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder={`${newPhone}`}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <p className="text-warning"><i>Leave empty to leave unchanged</i></p>
                <div className={"mb-3 text-danger"}>{message}</div>
                <div className="space" />
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <hr />
                <div className="space" />
            </form>
        </div>
    );
}
