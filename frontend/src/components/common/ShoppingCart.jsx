import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios'
import './ShoppingCart.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function mapAvailability(cnt) {
    if (cnt >= 1 && cnt < 10) {
        return "Low";
    }
    if (cnt >= 10 && cnt < 50) {
        return "Medium";
    }
    if (cnt >= 50) {
        return "High";
    }
    return cnt;
}

export function ShoppingCart(props) {
    const { productsInCart, onQuantityChange, onProductRemove, clearCart } = props;
    const navigate = useNavigate()

    const totalCost = productsInCart.reduce(
        (total, product) => total + product.product_price * product.count,
        0
    ).toFixed(2);


    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCheckout = async () => {
        try {
            console.log(productsInCart)
            const response = await axios.post('/api/products/checkout', {
                "products_in_cart": productsInCart,
            });

            setShowSuccessModal(true);

            clearCart()
        } catch (error) {
            setShowErrorModal(true);
            setErrorMessage(error.response?.data?.error.message || 'An error occurred');
        }
    };

    const handleCloseModals = () => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
    };


    return (
        <div>
            <div className="cart-products">
                {productsInCart.length === 0 && (
                    <span className="empty-text">Your cart is currently empty</span>
                )}
                {productsInCart.map((product) => (
                    <div className="cart-product" key={product.product_id}>
                        <img
                            src={`data:image/jpeg;base64,${product.product_image}`}
                            alt={product.product_name}
                            onClick={() => {
                                navigate(`/products/details`, { state: { product } });
                            }}
                        />
                        <div className="cart-product-info" key={product.product_id}>
                            <div className="product-details-cart">
                                <div className="product-name" onClick={() => {
                                    navigate(`/products/details`, { state: { product } });
                                }}>
                                    <h2>{product.product_name}</h2>
                                </div>
                                <div className="product-availability">
                                    <h3>Availability</h3>
                                    {mapAvailability(product?.product_count)}
                                </div>
                                <div className="product-count">
                                    <h3>Count</h3>
                                    <select
                                        className="form-select count"
                                        value={product.count}
                                        onChange={(event) => {
                                            onQuantityChange(product.product_id, event.target.value);
                                        }}
                                    >
                                        {[...Array(10).keys()].map((number) => {
                                            const num = number + 1;
                                            return (
                                                <option value={num} key={num}>
                                                    {num}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="product-price">
                                    <h3>Price</h3>
                                    {(product.product_price * product.count).toFixed(2)}€
                                </div>
                                <div className="remove-from-cart-button">
                                    <button
                                        className="btn remove-btn"
                                        onClick={() => onProductRemove(product)}
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {productsInCart.length > 0 ?
                    <>
                        <hr className="mb-3" />
                        <div className="total-cost">
                            <h3>Total Cost</h3>
                            {totalCost}€
                        </div>
                        <hr className="mb-3" />

                        <button
                            type="button"
                            className="btn btn-primary checkout-button"
                            onClick={handleCheckout}
                        >
                            Proceed to checkout
                        </button>
                    </>
                    : <hr />
                }
                <Modal show={showSuccessModal} onHide={handleCloseModals}>
                    <Modal.Header closeButton>
                        <Modal.Title>Checkout Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Your order has been successfully placed!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseModals}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showErrorModal} onHide={handleCloseModals}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{errorMessage}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseModals}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default ShoppingCart;
