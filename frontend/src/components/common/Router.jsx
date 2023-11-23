import { Routes, Route } from "react-router-dom"
import { ProductsListPage } from "../product/ProductsListPage"
import { ProductsBasePage } from "../product/ProductsBasePage"
import { Login } from "../user/Login"
import { Register } from "../user/Register"
import { Profile } from "../user/Profile"
import { ProfileEdit } from "../user/ProfileEdit"
import { AdminScreen } from "../admin/AdminPanelScreen"
import { AdminPatternsScreen } from "../admin/PatternScreen";



export function Router() {
    return (
        <section className={'page_container'}>
            <Routes>
                <Route path="/" element={<ProductsListPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
                <Route path='/products/*' element={<ProductsBasePage />} />
                <Route path='/admin/panel' element={<AdminScreen />} />
                <Route path='/admin/patterns' element={<AdminPatternsScreen />} />

                <Route path='/admin/users' element={<ProductsBasePage />} />
                <Route path='/admin/products' element={<ProductsBasePage />} />
            </Routes>
        </section>
    )
}