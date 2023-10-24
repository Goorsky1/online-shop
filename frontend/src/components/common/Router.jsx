
import { Routes, Route } from "react-router-dom";
import { ProductList } from "../product/ProductList"
import { Login } from "../user/Login"
import { Register } from "../user/Register"

export function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}