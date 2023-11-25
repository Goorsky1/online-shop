import {Header} from './common/Header.jsx'
import Refresh from './common/Refresh.jsx'
import {Router} from './common/Router.jsx'
import {useEffect, useState} from 'react'

function Cart() {
    const [showCartSuccessToast, setShowCartSuccessToast] = useState(false);
    const [showCartWarningToast, setShowCartWarningToast] = useState(false);
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
            setShowCartWarningToast(true);
        } else {
            const newProduct = {
                ...product,
                count: 1,
            }
            setProductsInCart([...productsInCart, newProduct,])
            setShowCartSuccessToast(true);
        }
        setTimeout(() => {
            setShowCartSuccessToast(false);
            setShowCartWarningToast(false);
        }, 3000);
        // console.log("productsInCart: ", productsInCart)
    }

    const onQuantityChange = (productId, count) => {
        setProductsInCart((oldState) => {
            const productsIndex = oldState.findIndex(
                (item) =>
                    item.product_id === productId
            );
            if (productsIndex !== -1) {
                oldState[productsIndex].count = count;
            }
            return [...oldState];
        });
    };

    const onProductRemove = (product) => {
        setProductsInCart((oldState) => {
            const productsIndex = oldState.findIndex(
                (item) =>
                    item.product_id === product.product_id
            );
            if (productsIndex !== -1) {
                oldState.splice(productsIndex, 1);
            }
            return [...oldState];
        });
    }
    return {
        productsInCart,
        addProductToCart,
        onQuantityChange,
        onProductRemove,
        showCartSuccessToast,
        setShowCartSuccessToast,
        showCartWarningToast,
        setShowCartWarningToast
    }
}

export function Main() {
    const {
        productsInCart, addProductToCart, onQuantityChange, onProductRemove, showCartSuccessToast,
        setShowCartSuccessToast, showCartWarningToast, setShowCartWarningToast
    } = Cart();

    return (
        <div className='Main'>
            <Header/>
            <Refresh/>
            <div className='content'>
                <Router productsInCart={productsInCart} addProductToCart={addProductToCart}
                        onQuantityChange={onQuantityChange} onProductRemove={onProductRemove}
                        showCartSuccessToast={showCartSuccessToast} setShowCartSuccessToast={setShowCartSuccessToast}
                        showCartWarningToast={showCartWarningToast} setShowCartWarningToast={setShowCartWarningToast}/>
            </div>
            {/*<ShoppingCart productsInCart={productsInCart}/>*/}
        </div>
    )
}