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
                user_status: 'active',  // Domyślny status
                user_phone: phone,
                user_permissions: 'client'  // Domyślne uprawnienia
            };
            console.log('Request Payload:', user);
            const response = await axios.post('http://localhost:3000/api/users', user);
            navigate('/login'); // Przekierowanie do logowania po pomyślnej rejestracji
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
                    <h1 className="Login">Zarejestruj się</h1>
                </Row>
                <Row>
                    <Form onSubmit={handleSubmit}>
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
                            <Form.Label>Hasło </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Hasło"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPhone">
                            <Form.Label>Numer Telefonu </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Telefon"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" className="btn btn-primary button">
                            Zarejestruj
                        </Button>
                    </Form>
                </Row>
            </div>
        </Container>
    );
}
