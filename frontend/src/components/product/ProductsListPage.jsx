import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import createApiClient from '../../utils/apiClient'
import {CardList} from '../common/CardList';
import {ProductCard} from "./ProductCard";

export function ProductsListPage() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    const apiClient = createApiClient()
    useEffect(() => {
        apiClient.get('/api/products')
            .then((response) => setProducts(response.data.data.products))
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [])

    const goToDetailsPage = async (product) => {
        navigate(`/products/details`, { state: { product } });
    }

    return (
        <div>
            <h1>Example Component</h1>
            <div className={'product-list'}>
                {products.map(product =>
                <div key={product.product_id} className='product-card' onClick={() => {
                    goToDetailsPage(product)
                }}>
                <ProductCard product={product} extra={false}/>
                </div>
                )}
            </div>
        </div>
    )
};