import React, { useState, useContext } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post('/auth/login', {
                user_email: email,
                user_password: password,
            });

            // Assuming the response data structure is { token: '...', role: '...', user: { ... } }
            // You might want to adjust this depending on your actual response structure.
            localStorage.setItem('token', response.data.token);
            // navigate to the home page or user dashboard
            navigate('/');
        } catch (error) {
            // Handle error response
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('The request was made but no response was received');
            }
        }
    }

    return (
                        <Container>
                            <Row className="justify-content-center align-items-center vh-100">
                                <Form className="w-75" onSubmit={handleSubmit}>
                                    <h1 className="text-center mb-4">Zaloguj się</h1>
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
                                        <Form.Label>Hasło</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Hasło"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 my-3">
                        Zaloguj
                    </Button>
                    <div className="text-center">
                        Nie masz jeszcze konta?
                        <Button
                            variant="secondary"
                            className="w-100 my-3"
                            onClick={() => navigate('/register')}
                        >
                            Zarejestruj
                        </Button>
                        <p className="forgot-password-text" onClick={() => navigate('/password-recovery')}>
                            Zapomniałeś hasła?
                        </p>
                    </div>
                </Form>
            </Row>
        </Container>
    );
}
