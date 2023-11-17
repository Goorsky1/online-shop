import React, { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import createApiClient from '../../utils/apiClient'
import { setUserData } from '../../utils/userSession'
import "./styleUserPanel.css"

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            console.log('Request Payload:', { user_email: email, user_password: password });
            const apiClient = createApiClient()
            const response = await apiClient.post('api/auth/login', {
                user_email: email,
                user_password: password,
            });
            setUserData(response.data.data)
            navigate('/');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error.message);
            } else {
                setError('The request was made but no response was received');
            }
        }
    }

    return (
        <Container fluid>
            <div className="panel">
                <Row >
                    <h1 className="Login">Log In</h1>
                </Row>
                <Row>
                    <Form className=" " onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label> Password </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" className="btn btn-primary button">
                            Log In
                        </Button>
                    </Form>
                </Row>
            </div>
        </Container>
    );
}
