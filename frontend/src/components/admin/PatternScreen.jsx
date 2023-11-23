import React, { useState, useEffect } from 'react';
import { Container, Nav, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Pattern = ({ pattern, onDelete }) => {
    const navigate = useNavigate();
    return (
        <div className={`border rounded p-3 mb-4`}>
            <h2>{pattern.pattern_name}</h2>
            <p>{pattern.pattern_theme}</p>
            <Button className="mx-2" variant="primary" onClick={() => {navigate('/admin/patterns/edit');}}> {/* Adjusted the URL */}
                Edytuj
            </Button>
            <Button variant="danger" onClick={() => onDelete(pattern.pattern_id)}>
                Usuń
            </Button>
        </div>
    );
};

export const AdminPatternsScreen = () => {
    const [patterns, setPatterns] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [patternName, setPatternName] = useState('');
    const [patternTheme, setPatternTheme] = useState(''); // Declare patternTheme state
    const [error, setError] = useState('');

    const fetchPatterns = async () => {
        try {
            const response = await axios.get('/api/patterns');
            if (response.data && response.data.data && response.data.data.patterns) {
                setPatterns(response.data.data.patterns);
            } else {
                setError('Received unexpected data format from the server');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchPatterns();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/patterns/${id}`);
            fetchPatterns();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/patterns', { pattern_name: patternName, pattern_theme: patternTheme });
            setPatternName('');
            setPatternTheme('');
            setShowModal(false);
            fetchPatterns();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Container className="my-5">
                <Button variant="success" onClick={() => setShowModal(true)}>Patterns</Button>
                <Nav className="flex-column">
                    {patterns.map((pattern) => (
                        <Pattern key={pattern.pattern_id} pattern={pattern} onDelete={handleDelete} />
                    ))}
                </Nav>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add pattern</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <Form.Group className="mb-3" controlId="patternNameInput">
                            <Form.Label>Pattern Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter pattern name"
                                value={patternName}
                                onChange={(e) => setPatternName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="patternThemeInput">
                            <Form.Label>Pattern Theme</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter pattern theme"
                                value={patternTheme}
                                onChange={(e) => setPatternTheme(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
