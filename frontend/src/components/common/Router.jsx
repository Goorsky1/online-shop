import { Routes, Route } from "react-router-dom";
import { ProductsListPage } from "../product/ProductsListPage"
import { ProductsBasePage } from "../product/ProductsBasePage"
import { Login } from "../user/Login"
import { Register } from "../user/Register"
import { Profile } from "../user/Profile"
import { ProfileEdit } from "../user/ProfileEdit";
import ShoppingCart from "./ShoppingCart";

export function Router(props) {
    const {
        productsInCart,
        addProductToCart,
        onQuantityChange,
        onProductRemove,
        setShowCartWarningToast,
        setShowCartSuccessToast,
        showCartWarningToast,
        showCartSuccessToast
    } = props

    return (
        <section className={'page_container'}>
            <Routes>
                <Route path="/" element={<ProductsListPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
                <Route path="/cart"
                    element={<ShoppingCart productsInCart={productsInCart} onQuantityChange={onQuantityChange}
                        onProductRemove={onProductRemove} />} />
                <Route path='/products/*' element={<ProductsBasePage productsInCart={productsInCart}
                    addProductToCart={addProductToCart}
                    setShowCartWarningToast={setShowCartWarningToast}
                    setShowCartSuccessToast={setShowCartSuccessToast}
                    showCartWarningToast={showCartWarningToast}
                    showCartSuccessToast={showCartSuccessToast} />} />
            </Routes>
        </section>
    )
}