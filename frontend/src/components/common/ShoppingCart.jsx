import React from 'react';
import './ShoppingCart.css';
import {AiFillCloseCircle} from "react-icons/ai";
// import {RiDeleteBin6Line} from "react-icons/ri";
// import {ProductCardLine} from "../pages/products/ProductCard.jsx";
import {Button, Modal} from 'react-bootstrap';

export function ShoppingCart(props) {
    const productsInCart = props.productsInCart
    console.log("shopping productsInCart: ", productsInCart)
    return (
        <div>
            <div className={"cart-products"}>
                {productsInCart.length === 0 && (<span className={"empty-text"}>Your cart is currently empty</span>)}
                {productsInCart.map((product) => (
                    <div className={"cart-product"} key={product.product_id}>
                        <img src={`data:image/jpeg;base64,${product.product_image}`} alt={product.product_name}/>
                        <div className={"cart-product-info"}
                             key={product.product_id}>
                            <h2>{product.product_name}</h2>
                            {/*<h3>Additional info</h3>*/}
                            {/*<ProductCardLine name={"Material"} value={product.material}/>*/}
                            {/*<ProductCardLine name={"Size"} value={product.size}/>*/}
                            {/*<span*/}
                            {/*    className={"cart-product-price"}>{Math.max(product?.product_min_price, Math.round((product?.product_price * (1 - ((product?.product_percent / 100) * (product.count - 1))))) * product.count)}€</span>*/}
                            {/*<select className={"count"} value={product.count} onChange={(event) => {*/}
                            {/*    onQuantityChange(*/}
                            {/*        product.product_id,*/}
                            {/*        product.material,*/}
                            {/*        product.size,*/}
                            {/*        event.target*/}
                            {/*            .value*/}
                            {/*    );*/}
                            {/*}}>*/}
                            {/*    {[...Array(10).keys(),].map(number => {*/}
                            {/*        const num = number + 1;*/}
                            {/*        return <option value={num} key={num}>{num}</option>*/}
                            {/*    })}*/}
                            {/*</select>*/}
                            {/*<button className={"btn remove-btn"} onClick={() => onProductRemove(product)}>*/}
                            {/*    <RiDeleteBin6Line size={20}/></button>*/}
                        </div>
                    </div>
                ))}
                {productsInCart.length > 0 && (<button className={"btn checkout-btn"}>Proceed to checkout</button>)}
            </div>
        </div>
    )
}

export default ShoppingCart;