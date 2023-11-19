import { Route, Routes, useNavigate } from 'react-router-dom'
import './ProductsPage.css'
import { ProductsListPage } from './ProductsListPage.jsx'
import { ProductDetailsPage } from "./ProductDetailsPage.jsx";

export function ProductsBasePage(props) {
    const navigate = useNavigate();
    const { user } = props

    return (
        <div className='products_page'>
            <Routes>
                <Route path='/' element={<ProductsListPage />} />
                <Route path='details' element={<ProductDetailsPage />} />
                {/*<Route path='new' element={<ProductAdditionPage user={user} />} />*/}
            </Routes>
        </div>
    );
}