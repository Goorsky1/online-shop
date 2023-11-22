import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export const PatternPanelScreen = ({ turn, onClose }) => {
    const [chapterName, setChapterName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                patternName: chapterName,
            };

            const response = await axios.post('/api/patterns', payload);
            if (response.status === 200) {
                onClose();
                // Można dodać tutaj jakąś formę powiadomienia o sukcesie
            } else {
                setError('Nie udało się utworzyć rozdziału');
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'The request was made but no response was received');
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Dodaj Rozdział</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Form.Group className="mb-3" controlId="chapterNameInput">
                        <Form.Label>Nazwa rozdziału</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="funkcje"
                            value={chapterName}
                            onChange={(e) => setChapterName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Dodaj
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Zamknij
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
