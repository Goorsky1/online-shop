import React from 'react';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {useNavigate} from 'react-router-dom';
import {Button} from 'react-bootstrap';
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
    const {productsInCart, onQuantityChange, onProductRemove} = props;
    const navigate = useNavigate()

    const totalCost = productsInCart.reduce(
        (total, product) => total + product.product_price * product.count,
        0
    ).toFixed(2);

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
                                navigate(`/products/details`, {state: {product}});
                            }}
                        />
                        <div className="cart-product-info" key={product.product_id}>
                            <div className="product-details-cart">
                                <div className="product-name" onClick={() => {
                                    navigate(`/products/details`, {state: {product}});
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
                                        <RiDeleteBin6Line size={20}/>
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
                        <hr className="mb-3"/>
                        <button type="submit" className="btn btn-primary checkout-button">
                            Proceed to checkout
                        </button>
                    </>
                     : <hr/>
                }
            </div>
        </div>
    );
}

export default ShoppingCart;
