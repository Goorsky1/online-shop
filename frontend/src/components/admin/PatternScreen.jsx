import React, { useState, useEffect } from 'react';
import { Container, Nav, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Pattern = ({ pattern, onEdit }) => {
    const navigate = useNavigate();
    return (
        <div className={`border rounded p-3 mb-4`}>
            <h2>{pattern.pattern_name}</h2>
            <p>{pattern.pattern_theme}</p>
            <Button className="mx-2" variant="primary" onClick={() => onEdit(pattern)}>
                Edytuj
            </Button>

        </div>
    );
};

export const AdminPatternsScreen = () => {
    const [patterns, setPatterns] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [patternName, setPatternName] = useState('');
    const [patternTheme, setPatternTheme] = useState('');
    const [error, setError] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPatternId, setCurrentPatternId] = useState(null);

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

    const handleEdit = (pattern) => {
        setPatternName(pattern.pattern_name);
        setPatternTheme(pattern.pattern_theme);
        setCurrentPatternId(pattern.pattern_id);
        setIsEditMode(true);
        setShowModal(true);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = { pattern_name: patternName, pattern_theme: patternTheme };

        try {
            if (isEditMode) {
                await axios.patch(`/api/patterns/${currentPatternId}`, payload);
            } else {
                await axios.post('/api/patterns', payload);
            }
            setPatternName('');
            setPatternTheme('');
            setShowModal(false);
            setIsEditMode(false);
            fetchPatterns();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Container className="my-5">
                <Button variant="primary" type="submit" onClick={() => setShowModal(true)}>Add patterns</Button>
                <Nav className="flex-column">
                    {patterns.map((pattern) => (
                        <Pattern key={pattern.pattern_id} pattern={pattern} onEdit={handleEdit}/>
                    ))}
                </Nav>
            </Container>

            <Modal show={showModal} onHide={() => { setShowModal(false); setIsEditMode(false); }}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? 'Edit Pattern' : 'Add Pattern'}</Modal.Title>
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
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            {isEditMode ? 'Update' : 'Add'}
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
