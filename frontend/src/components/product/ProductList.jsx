import React, { useState, useEffect } from 'react'
import apiClient from '../../utils/apiClient'
import { CardList } from '../common/CardList';

export function ProductList() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        apiClient.get('/api/products')
            .then((response) => setProducts(response.data.data.products))
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [])

    return (
        <div>
            <h1>Example Component</h1>
            <CardList products={products} />
        </div>
    )
};
