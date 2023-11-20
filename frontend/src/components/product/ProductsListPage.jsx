import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import createApiClient from '../../utils/apiClient'
import { ProductCard } from "./ProductCard";

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
        <div className='Products page_content'>
            <div className={'product-list'}>
                {products.map(product => {
                    if (product.product_count !== 0) {
                        return (
                            <div key={product.product_id} className='product-card' onClick={() => {
                                goToDetailsPage(product)
                            }}>
                                <ProductCard product={product} extra={false} />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
};
