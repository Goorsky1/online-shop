import React, { useState, useEffect } from 'react';
import { Container, Nav, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const UserItem = ({ user, onDelete, onEdit }) => {
    return (
        <div className="border rounded p-3 mb-4">
            <h2>Email: {user.user_email}</h2>
            <p>Status: {user.user_status}</p>
            <p>Telefon: {user.user_phone}</p>
            <p>Uprawnienia: {user.user_permissions}</p>
            <Button variant="primary" onClick={() => onEdit(user)}>Edytuj</Button>
            <Button variant="danger" onClick={() => onDelete(user.user_id)}>Usuń</Button>
        </div>
    );
};

export const AdminUsersScreen = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
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
            setUsers(response.data.users || []);
        } catch (err) {
            setError(err.message);
            setUsers([]);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`/api/users/${userId}`);
            fetchUsers();
        } catch (err) {
            setError(err.message);
        }
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
                <Button variant="primary" onClick={() => setShowModal(true)}>Dodaj Użytkownika</Button>
                <Nav className="flex-column">
                    {users.map(user => (
                        <UserItem key={user.user_id} user={user} onDelete={handleDelete} onEdit={handleEdit}/>
                    ))}
                </Nav>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? 'Edytuj Użytkownika' : 'Dodaj Użytkownika'}</Modal.Title>
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
        </>
    );
}
