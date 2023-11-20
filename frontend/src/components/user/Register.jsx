import React, { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./styleUserPanel.css";

export function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const user = {
                user_email: email,
                user_password: password,
                user_status: 'active',
                user_phone: phone.toString(),
                user_permissions: 'client'
            };
            // console.log('Request Payload:', user);
            const response = await axios.post('/api/users', user);
            navigate('/login');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('The request was made but no response was received');
            }
        }
    }

    return (
        <Container fluid>
            <div className="panel">
                <Row>
                    <h1 className="Login">Register</h1>
                </Row>
                <Row>
                    <Form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={5}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>
                        <div className="mt-4"/>
                        <button type="submit" className="btn btn-primary login-button">Register</button>
                    </Form>
                </Row>
            </div>
        </Container>
    );
}