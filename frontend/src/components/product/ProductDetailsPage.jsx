import React, {useState, useEffect} from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';
import './ProductsPage.css';
import {ProductCard} from './ProductCard.jsx';
// import {ProductCardCool} from './ProductCardCool.jsx';

export function ProductDetailsPage(props) {
    const [product, setProduct] = useState(null);

    if (product) {
        // if (user?.permissions === 'worker') {
        //     return (
        //         <div className="product">
        //             <ProductCardCool product={product} extra={false} />
        //         </div>
        //     );
        // } else {
            return (
                <div className="product page_content">
                    <ProductCard product={product} extra={true}/>
                </div>
            );
        // }
    } else {
        return (
            <div className="product page_content">
                <p>Error</p>
            </div>
        );
    }
}
