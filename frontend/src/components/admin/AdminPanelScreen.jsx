import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
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
            <Row className="mt-4 justify-content-center align-items-center w-100">
                <Col className="text-center">
                    <h1>Admin panel</h1>
                </Col>
            </Row>

            <Row className="mt-4 justify-content-center">
                <Col xs="auto" className='w-100'>
                    <Button variant="primary w-100" size="lg" block onClick={navigateToPatterns}>
                        Patterns
                    </Button>
                </Col>
            </Row>

            <Row className="mt-2 justify-content-center">
                <Col xs="auto" className='w-100'>
                    <Button variant="secondary w-100" size="lg" block onClick={navigateToUsers}>
                        Users
                    </Button>
                </Col>
            </Row>

            <Row className="mt-2 justify-content-center">
                <Col xs="auto" className='w-100'>
                    <Button variant="primary w-100" size="lg" block onClick={navigateToProducts}>
                        Products
                    </Button>
                </Col>
            </Row>

            {error && <div className="alert alert-danger">{error}</div>}
        </Container>
    );
};
