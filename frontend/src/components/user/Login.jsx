import React, { useState, useContext } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                user_email: email,
                user_password: password,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/');
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
                <Row >
                    <h1 className="Login">Zaloguj się</h1>
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
                        <Form.Label> Hasło </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button  type="submit" className="button">
                        Zaloguj
                    </Button>
                </Form>
            </Row>
            </div>
        </Container>
    );
}
