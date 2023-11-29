import React, { useState, useEffect } from 'react';
import { Container, Nav, Modal, Button, Form } from 'react-bootstrap';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import axios from 'axios';
import './ProductAdminCss.css'

const Product = ({ product, onDelete, onEdit, onShowChangeQuantity }) => {
    return (
        <div className={`border rounded p-3 mb-4`}>
            <div className='adminProdFlex'>
                <div className='textWrapper'>
                    <h2>{product.product_name}</h2>
                    <h3>Quantity</h3>
                    {product.product_count}
                    <h3>Price</h3>
                    {product.product_price} €

                </div>
                <div className='adminImgWrapper'>
                    <img src={`data:image/jpg;base64,${product.product_image}`} alt={product.product_name} style={{ width: '300px', height: '150px' }} />
                </div>
            </div>
            <div className='buttons text-center'>
                <Button variant="primary" onClick={() => onEdit(product)}>Edit</Button>
                <Button variant="secondary" onClick={() => onShowChangeQuantity(product)}>Change Quantity</Button>
                <Button variant="danger" onClick={() => onDelete(product.product_id)}>Delete</Button>
            </div>
        </div>
    );
};

export const ProductsAdminScreen = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [patternName, setPatternName] = useState('');
    const [showQuantityModal, setShowQuantityModal] = useState(false);
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [newQuantity, setNewQuantity] = useState(0); // Dodane
    const [error, setError] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedPatternId, setSelectedPatternId] = useState('');
    const [currentProductId, setCurrentProductId] = useState(null);
    const [productColor, setProductColor] = useState('');
    const [productMaterial, setProductMaterial] = useState('');
    const [productDiameter, setProductDiameter] = useState('');
    const [productWidth, setProductWidth] = useState('');
    const [productCount, setProductCount] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState('');
    const [patterns, setPatterns] = useState([]);
    const [selectedPattern, setSelectedPattern] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            if (response.data.data && response.data.data.products) {
                setProducts(response.data.data.products);
            } else {
                setError('Received unexpected data format from the server');
            }
        } catch (err) {
            setError(err.response.data.error.message);
        }
    };

    useEffect(() => {
        const fetchPatterns = async () => {
            try {
                const response = await axios.get('/api/patterns');
                setPatterns(response.data.data.patterns);
            } catch (error) {
                console.error('Error fetching patterns:', error);
            }
        };

        fetchPatterns();
        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setPatternName(product.product_name);
        setProductColor(product.product_color);
        setProductMaterial(product.product_material);
        setProductDiameter(product.product_diameter);
        setProductWidth(product.product_width);
        setSelectedPatternId(product.pattern_id);
        setProductCount(product.product_count);
        setProductPrice(product.product_price);
        setProductDescription(product.product_description);
        setCurrentProductId(product.product_id);
        setSelectedPattern(patterns.find(p => p.id === product.pattern_id));
        setIsEditMode(true);
        setShowModal(true);
    };

    const handleShowChangeQuantity = (product) => {
        setPatternName(product.product_name);
        setProductColor(product.product_color);
        setProductMaterial(product.product_material);
        setProductDiameter(product.product_diameter);
        setProductWidth(product.product_width);
        setSelectedPatternId(product.pattern_id);
        setCurrentQuantity(product.product_count);
        setProductPrice(product.product_price);
        setProductDescription(product.product_description);
        setCurrentProductId(product.product_id);
        setIsEditMode(true);
        setShowQuantityModal(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedPattern) {
            setError('Please select a pattern');
            return;
        }
        const productData = {
            product_name: patternName,
            product_color: productColor,
            product_material: productMaterial,
            product_diameter: productDiameter,
            product_width: productWidth,
            pattern_id: selectedPattern.pattern_id,
            product_count: 0,
            product_price: productPrice,
            product_description: productDescription,
            product_image: productImage,
        };

        try {
            if (isEditMode) {
                await axios.patch(`/api/products/${currentProductId}`, productData);
            } else {
                await axios.post('/api/products', productData);
            }
            setShowModal(false);
            setIsEditMode(false);
            fetchProducts();
        } catch (err) {
            setError(err.response.data.error.message);
        }
    };

    const handleUpdateQuantity = async () => { // Zmienione
        try {
            await axios.patch(`/api/products/${currentProductId}`, { product_count: newQuantity });
            fetchProducts();
            setShowQuantityModal(false);
        } catch (err) {
            setError(err.response.data.error.message);
        }
    };
    const handleImageClick = () => {
        document.getElementById('image-file').click();
    };

    const handleImageChange = e => {
        const reader = new FileReader();
        reader.onload = () => {
            setProductImage(reader.result.split(',')[1]);
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product? This action cannot be undone.");
        if (confirmDelete) {
            try {
                await axios.delete(`/api/products/${productId}`);
                fetchProducts();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <>
            <Container className="my-5">
                <Button variant="primary" onClick={() => setShowModal(true)}>Add products</Button>
                <Nav className="flex-column">
                    {products.map((product) => (
                        <Product
                            key={product.product_id}
                            product={product}
                            onDelete={() => handleDelete(product.product_id)}
                            onShowChangeQuantity={() => handleShowChangeQuantity(product)}
                            onEdit={() => handleEdit(product)}

                        />
                    ))}
                </Nav>
            </Container>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? 'Edit product' : 'Add product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control
                                type="text"
                                value={patternName}
                                onChange={(e) => setPatternName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Autocomplete
                                value={selectedPattern}
                                onChange={(event, newValue) => {
                                    setSelectedPattern(newValue);
                                }}
                                options={patterns}
                                getOptionLabel={(option) => option.pattern_name}
                                renderInput={(params) => (
                                    <TextField {...params} label="Pattern" variant="outlined" />
                                )}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product color</Form.Label>
                            <Form.Control
                                type="text"
                                value={productColor}
                                onChange={(e) => setProductColor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Material</Form.Label>
                            <Form.Control
                                type="text"
                                value={productMaterial}
                                onChange={(e) => setProductMaterial(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product diameter</Form.Label>
                            <Form.Control
                                type="number"
                                value={productDiameter}
                                onChange={(e) => setProductDiameter(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product width</Form.Label>
                            <Form.Control
                                type="number"
                                value={productWidth}
                                onChange={(e) => setProductWidth(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Image</Form.Label>
                            <img src={`data:image/jpg;base64,${productImage}`} alt='Product Image' onClick={handleImageClick} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                            <input
                                type='file'
                                id='image-file'
                                name='image'
                                accept='image/*'
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        {isEditMode ? 'Update' : 'Add'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showQuantityModal} onHide={() => setShowQuantityModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change quantity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Current quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={currentQuantity}
                                onChange={(e) => setCurrentQuantity(e.target.value)}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>New quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={newQuantity}
                                onChange={(e) => setNewQuantity(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowQuantityModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => handleUpdateQuantity(newQuantity)}>Update quantity</Button>
                </Modal.Footer>
            </Modal>

        </>
    );

};
