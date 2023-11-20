import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import createApiClient from '../../utils/apiClient';
import { ProductCard } from './ProductCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './ProductsPage.css'

export function ProductsListPage() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const navigate = useNavigate();
    const apiClient = createApiClient();

    useEffect(() => {
        apiClient
            .get('/api/products')
            .then((response) => {
                let filteredProducts = response.data.data.products.filter(product => product.product_count !== 0);
                filteredProducts = filteredProducts.map((product) => {
                    apiClient.get(`/api/patterns/${product.pattern_id}`)
                        .then((response) => product.pattern = response.data.data.pattern)
                        .catch((error) => {
                            console.error('Error fetching data:', error);
                        });
                    return product
                })
                setProducts(filteredProducts);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const goToDetailsPage = async (product) => {
        navigate(`/products/details`, { state: { product } });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className='Products page_content'>
            <Stack spacing={2} mt={3}>
                <Pagination
                    count={Math.ceil(products.length / itemsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                />
            </Stack>
            <div className={'product-list'}>
                {currentProducts.map((product) => {
                    if (product.product_count !== 0) {
                        return (
                            <div
                                key={product.product_id}
                                className='product-card'
                                onClick={() => {
                                    goToDetailsPage(product);
                                }}
                            >
                                <ProductCard product={product} extra={false} />
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}