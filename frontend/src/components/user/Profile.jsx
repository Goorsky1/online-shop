import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import createApiClient from '../../utils/apiClient'
import {getUserData, removeUserData} from '../../utils/userSession'
import './styleUserPanel.css'
import {Modal, Button} from 'react-bootstrap'

export function Profile() {
    const [profile, setProfile] = useState([])
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const user = getUserData()
    const apiClient = createApiClient()

    useEffect(() => {
        apiClient.get(`/api/users/${user.user.user_id}`)
            .then((response) => setProfile(response.data.data.user))
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [])

    const handleDeleteAccount = () => {
        setShowModal(true);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await apiClient.patch(`/api/users/${user.user.user_id}`, {
                "user_status": "deleted"
            });

            navigate('/login');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
        removeUserData()
        setShowModal(false);
    };

    return (
        <>
            <div className='container mt-4'>
                <div className='profile_info'>
                    <div className="space"/>
                    <h1>My Profile</h1>
                    <hr/>
                    <div className="profile-details-two-columns">
                        <div>
                            <h4>Account details</h4>
                            <div className="space"/>
                            <div className='user_info'>
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <th scope="col">Email</th>
                                        <td scope="col">{profile.user_email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Phone</th>
                                        <td scope="col">{profile.user_phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Permissions</th>
                                        <td scope="col">{profile.user_permissions}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <h4>Actions</h4>
                            <div className="space"/>
                            <button type="button" className="btn btn-outline-primary action-button" onClick={() => {
                                navigate('/profile/edit')
                            }}><b>Edit Data</b></button>
                            <div className="space"/>
                            <button type="button" className="btn btn-outline-primary action-button" onClick={handleDeleteAccount}><b>Delete Account</b>
                            </button>
                        </div>
                    </div>
                    <div className="space"/>
                    <hr/>
                </div>
            </div>
            <Modal className={"delete-profile-modal"} show={showModal} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete your account? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='light' onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                    <Button variant='danger' onClick={handleConfirmDelete}>
                    {/*<Button variant='danger'>*/}
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}