import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import createApiClient from '../../utils/apiClient';
import { ProductCard } from './ProductCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './ProductsPage.css';

export function ProductsListPage() {
    const [products, setProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('product_name');
    const [selectedColors, setSelectedColors] = useState([]);
    const [possibleColors, setPossibleColors] = useState([]);
    const [selectedPatternValues, setSelectedPatternValues] = useState([]);
    const [possiblePatternValues, setPossiblePatternValues] = useState([]);
    const [selectedPatternThemes, setSelectedPatternThemes] = useState([]);
    const [possiblePatternThemes, setPossiblePatternThemes] = useState([]);
    const navigate = useNavigate();
    const apiClient = createApiClient();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/api/products');
                const filteredProducts = response.data.data.products.filter((product) => product.product_count !== 0);

                const patternRequests = filteredProducts.map((product) =>
                    apiClient.get(`/api/patterns/${product.pattern_id}`)
                );

                const patternsData = await Promise.all(patternRequests);

                const productsWithPatterns = filteredProducts.map((product, index) => {
                    product.pattern = patternsData[index].data.data.pattern;
                    return product;
                });

                setPossibleColors([...new Set(productsWithPatterns.map((product) => product.product_color))]);
                setPossiblePatternValues([...new Set(productsWithPatterns.map((product) => product.pattern.pattern_name))]);
                setPossiblePatternThemes([...new Set(productsWithPatterns.map((product) => product.pattern.pattern_theme))]);

                applyFilters(productsWithPatterns);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [page, sortBy, sortOrder, selectedColors, selectedPatternValues, selectedPatternThemes]);

    const applyFilters = (products) => {
        if (selectedColors.length > 0) {
            products = products.filter((product) => selectedColors.includes(product.product_color));
        }

        if (selectedPatternValues.length > 0) {
            products = products.filter((product) =>
                selectedPatternValues.includes(product.pattern.pattern_name)
            );
        }

        if (selectedPatternThemes.length > 0) {
            products = products.filter((product) =>
                selectedPatternThemes.includes(product.pattern.pattern_theme)
            );
        }

        const sortedProducts = [...products];
        sortedProducts.sort((a, b) => {
            const valueA = a[sortBy];
            const valueB = b[sortBy];

            if (sortOrder === 'asc') {
                return valueA < valueB ? -1 : 1;
            } else {
                return valueA > valueB ? -1 : 1;
            }
        });

        setProducts(sortedProducts);

        const indexOfLastItem = page * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentProducts(sortedProducts.slice(indexOfFirstItem, indexOfLastItem));
    };

    const handleSortChange = (event) => {
        const selectedSort = event.target.value;
        const sorts = selectedSort.split('-');
        setSortBy(sorts[0]);
        setSortOrder(sorts[1]);
        applyFilters(products);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div className="Products page_content">
            <div className="product-filters">
                <label htmlFor="sortSelect">Sort by:</label>
                <select id="sortSelect" value={`${sortBy}-${sortOrder}`} onChange={handleSortChange}>
                    <option value="product_name-asc">Name (asc)</option>
                    <option value="product_name-desc">Name (desc)</option>
                    <option value="product_price-asc">Price (asc)</option>
                    <option value="product_price-desc">Price (desc)</option>
                    <option value="product_count-asc">Availability (asc)</option>
                    <option value="product_count-desc">Availability (desc)</option>
                </select>

                <Autocomplete
                    multiple
                    id="colorFilter"
                    options={possibleColors}
                    value={selectedColors}
                    onChange={(_, newValue) => setSelectedColors(newValue)}
                    renderInput={(params) => <TextField {...params} label="Color" />}
                />

                <Autocomplete
                    multiple
                    id="patternValueFilter"
                    options={possiblePatternValues}
                    value={selectedPatternValues}
                    onChange={(_, newValue) => setSelectedPatternValues(newValue)}
                    renderInput={(params) => <TextField {...params} label="Pattern Value" />}
                />

                <Autocomplete
                    multiple
                    id="patternThemeFilter"
                    options={possiblePatternThemes}
                    value={selectedPatternThemes}
                    onChange={(_, newValue) => setSelectedPatternThemes(newValue)}
                    renderInput={(params) => <TextField {...params} label="Pattern Theme" />}
                />
            </div>

            <div className="product-content">
                <div className={'product-list'}>
                    {currentProducts.map((product) => {
                        if (product.product_count !== 0) {
                            return (
                                <div
                                    key={product.product_id}
                                    className="product-card"
                                    onClick={() => {
                                        navigate(`/products/details`, { state: { product } });
                                    }}
                                >
                                    <ProductCard product={product} extra={false} />
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>

            <Stack spacing={2} mt={3} style={{ marginTop: 0, marginBottom: '1rem' }}>
                <Pagination count={Math.ceil(products.length / itemsPerPage)} page={page} onChange={handleChangePage} size="large" />
            </Stack>
        </div>
    );
}
