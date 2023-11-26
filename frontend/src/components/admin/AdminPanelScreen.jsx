import React, { useState } from 'react';
import { Container, Row, Col, Button,  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const AdminScreen = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const navigateToPatterns = () => {
        navigate('/admin/patterns');
    };

    const navigateToUsers = () => {
        navigate('/admin/users');
    };
    const navigateToProducts = () => {
        navigate('/admin/products');
    };

    return (
        <Container fluid className="admin-panel">
            <Row>
                <Col>
                    <h2>Admin panel</h2>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Button variant="primary" size="lg" onClick={navigateToPatterns}>
                        Patterns
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Button variant="primary" size="lg" onClick={navigateToUsers}>
                        Users
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Button variant="primary" size="lg" onClick={navigateToProducts}>
                        Products
                    </Button>
                </Col>
            </Row>
            {error && <div className="alert alert-danger">{error}</div>}
        </Container>
    );
};
