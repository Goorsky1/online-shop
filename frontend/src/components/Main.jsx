import {Header} from './common/Header.jsx'
import Refresh from './common/Refresh.jsx'
import {Router} from './common/Router.jsx'
import {useEffect, useState} from 'react'
import ShoppingCart from "./common/ShoppingCart";

function Cart() {
    const [productsInCart, setProductsInCart] =
        useState(
            JSON.parse(
                localStorage.getItem(
                    "shopping-cart"
                )
            ) || []
        );
    useEffect(() => {
        localStorage.setItem("shopping-cart", JSON.stringify(productsInCart));
    }, [productsInCart]);

    const addProductToCart = (product) => {
        const alreadyInCart = productsInCart.find(item => item.product_id === product.product_id);
        if (alreadyInCart) {
            const latestCartUpdate = productsInCart.map(item =>
                item.product_id === product.product_id ? {
                        ...item, count: item.count + 1
                    }
                    : item
            );
            setProductsInCart(latestCartUpdate);
        } else {
            const newProduct = {
                ...product,
                count: 1,
            }
            setProductsInCart([...productsInCart, newProduct,])
        }
        console.log("productsInCart: ", productsInCart)
    }
    return {
        productsInCart,
        addProductToCart
    }
}

export function Main() {
    const {productsInCart, addProductToCart} = Cart();

    return (
        <div className='Main'>
            <Header/>
            <Refresh/>
            <div className='content'>
                <Router productsInCart={productsInCart} addProductToCart={addProductToCart}/>
            </div>
            {/*<ShoppingCart productsInCart={productsInCart}/>*/}
        </div>
    )
}