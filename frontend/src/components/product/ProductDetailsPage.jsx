import React, {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import './ProductsPage.css';
import {ProductCard} from './ProductCard.jsx';

export function ProductDetailsPage(props) {

    const {
        productsInCart,
        addProductToCart,
        setShowCartWarningToast,
        setShowCartSuccessToast,
        showCartWarningToast,
        showCartSuccessToast
    } = props
    const location = useLocation()
    const [product, setProduct] = useState(location.state?.product);
    window.history.pushState(location.state, '', '/')


    if (product) {
        return (
            <div className="product page_content">
                <ProductCard product={product} extra={true} productsInCart={productsInCart}
                             addProductToCart={addProductToCart} setShowCartWarningToast={setShowCartWarningToast}
                             setShowCartSuccessToast={setShowCartSuccessToast}
                             showCartWarningToast={showCartWarningToast} showCartSuccessToast={showCartSuccessToast}/>
            </div>
        );
    } else {
        return (
            <div className="product page_content">
                <p>Error</p>
            </div>
        );
    }
}
