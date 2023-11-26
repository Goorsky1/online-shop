import React, { useState, useEffect } from 'react';
import { Container, Nav, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const UserItem = ({ user, onDelete, onEdit }) => {
    return (
        <div className="border rounded p-3 mb-4">
            <h2>Email: {user.user_email}</h2>
            <p>Status: {user.user_status}</p>
            <p>Phone: {user.user_phone}</p>
            <p>Permissions: {user.user_permissions}</p>
            <Button variant="primary" onClick={() => onEdit(user)}>Edytuj</Button>
            <Button variant="danger" onClick={() => onDelete(user.user_id)}>Usuń</Button>
        </div>
    );
};

export const AdminUsersScreen = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        user_email: '',
        user_password: '',
        user_phone: '',
        user_status: '',
        user_permissions: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            if (response.data && response.data.data && response.data.data.users)
                setUsers(response.data.data.users || []);
            else
                setError('Received unexpected data format from the server');

        } catch (err) {
            setError(err.message);
            setUsers([]);
        }
    };

    const handleDelete = (userId) => {
        setCurrentUser(users.find(user => user.user_id === userId));
        setShowDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.patch(`/api/users/${currentUser.user_id}`, { "user_status": "deleted" });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting account:', error);
        }
        setShowDeleteModal(false);
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setIsEditMode(true);
        setShowModal(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userPayload = {
            user_email: currentUser.user_email,
            user_password: currentUser.user_password,
            user_phone: currentUser.user_phone,
            user_status: 'active',
            user_permissions: currentUser.user_permissions
        };
        try {
            if (isEditMode) {
                await axios.patch(`/api/users/${currentUser.user_id}`, userPayload);
            } else {
                await axios.post('/api/users', userPayload);
            }
            setShowModal(false);
            setIsEditMode(false);
            setCurrentUser({user_email: '', user_password: '', user_phone: '', user_permissions: ''});
            fetchUsers();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleChange = (e) => {
        setCurrentUser({...currentUser, [e.target.name]: e.target.value});
    };

    return (
        <>
            <Container className="my-5">
                <Button variant="primary" onClick={() => setShowModal(true)}>Add user</Button>
                <Nav className="flex-column">
                    {users.map(user => (
                        <UserItem key={user.user_id} user={user} onDelete={handleDelete} onEdit={handleEdit}/>
                    ))}
                </Nav>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? 'Update user' : 'Add user'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="user_email"
                                value={currentUser.user_email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="user_password"
                                value={currentUser.user_password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="user_phone"
                                value={currentUser.user_phone}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Privileges</Form.Label>
                            <Form.Control
                                type="text"
                                name="user_permissions"
                                value={currentUser.user_permissions}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Zapisz</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Zamknij</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteModal} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this account? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleCancelDelete}>Cancel</Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>Delete Account</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
