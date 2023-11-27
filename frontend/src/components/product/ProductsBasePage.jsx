import {Route, Routes, useNavigate} from 'react-router-dom'
import './ProductsPage.css'
import {ProductsListPage} from './ProductsListPage.jsx'
import {ProductDetailsPage} from "./ProductDetailsPage.jsx";

export function ProductsBasePage(props) {
    const navigate = useNavigate();
    const {
        productsInCart,
        addProductToCart,
        setShowCartWarningToast,
        setShowCartSuccessToast,
        showCartWarningToast,
        showCartSuccessToast
    } = props

    return (
        <div className='products_page'>
            <Routes>
                <Route path='/' element={<ProductsListPage productsInCart={productsInCart}
                                                           addProductToCart={addProductToCart}/>}/>
                <Route path='details' element={<ProductDetailsPage productsInCart={productsInCart}
                                                                   addProductToCart={addProductToCart}
                                                                   setShowCartWarningToast={setShowCartWarningToast}
                                                                   setShowCartSuccessToast={setShowCartSuccessToast}
                                                                   showCartWarningToast={showCartWarningToast}
                                                                   showCartSuccessToast={showCartSuccessToast}/>}/>
                {/*<Route path='new' element={<ProductAdditionPage user={user} />} />*/}
            </Routes>
        </div>
    );
}