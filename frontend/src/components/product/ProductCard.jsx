import React, { useState, useEffect } from 'react'
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { getUserData } from '../../utils/userSession';
import { Toast } from "react-bootstrap";
import axios from 'axios';

export function ProductCardLine({ name, value }) {
    return (
        <div>
            <span className='product_card_line_name'>{name} </span>
            <span className='product_card_line_value'>{value}</span>
        </div>
    )
}

export function ProductCard(props) {
    const {
        product,
        extra,
        productsInCart,
        addProductToCart,
        setShowCartWarningToast,
        showCartWarningToast,
        setShowCartSuccessToast,
        showCartSuccessToast
    } = props
    const [avgRating, setAvgRating] = useState(null)
    const [userRating, setUserRating] = useState(null)
    const userData = getUserData()
    const userId = userData?.user.user_id

    async function getAvgRating() {
        await axios.get(`/api/products/${product.product_id}/ratings`).then(response => {
            const ratings = response.data.data.ratings;
            if (ratings.length > 0) {
                setAvgRating(ratings.reduce((sum, rating) => sum + rating.rating_value, 0) / ratings.length)
            }
        }).catch(error => {
        });
    }

    async function getUserRating() {
        await axios.get(`/api/products/${product.product_id}/ratings/${userId}`)
            .then(response => {
                setUserRating(response.data.data.rating.rating_value)
            }).catch(error => {
            });
    }

    async function createUserRating(value) {
        await axios.post(`/api/products/${product.product_id}/ratings`, {
            user_id: userId,
            rating_value: value
        }).then(response => {
            setUserRating(response.data.data.rating.rating_value)
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    async function editUserRating(value) {
        await axios.patch(`/api/products/${product.product_id}/ratings`, {
            user_id: userId,
            rating_value: value
        }).then(response => {
            setUserRating(response.data.data.rating.rating_value)
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    function mapAvailability(cnt) {
        if (cnt >= 1 && cnt < 10) {
            return "Low";
        }
        if (cnt >= 10 && cnt < 50) {
            return "Medium";
        }
        if (cnt >= 50) {
            return "High";
        }
        return cnt;
    }

    useEffect(() => {
        getAvgRating()
    }, [userRating])

    useEffect(() => {
        if (userData && extra) {
            getUserRating()
        }
    }, [])

    return (
        <>
            {extra ? <>
                <div style={{ position: 'fixed', top: 80, right: 16, zIndex: 1000, }}>
                    <Toast show={showCartSuccessToast} onClose={() => setShowCartSuccessToast(false)} delay={3000}
                        autohide
                        className={"bg-success"}><Toast.Header><strong className="me-auto">Product added to
                            cart</strong>
                        </Toast.Header></Toast>
                </div>

                <div style={{ position: 'fixed', top: 80, right: 16, zIndex: 1000, }}>
                    <Toast show={showCartWarningToast} onClose={() => setShowCartWarningToast(false)} delay={3000}
                        autohide
                        className={"bg-warning"}><Toast.Header><strong className="me-auto">Increased amount of
                            product in cart</strong></Toast.Header></Toast>
                </div>
            </> : null
            }
            <div className='product'>
                <div className="image-container">
                    <img
                        src={`data:image/jpeg;base64,${product.product_image}`}
                        alt={product?.product_name}
                        style={extra ? { marginTop: '2rem' } : {}} // css is brutal, use conditional margin
                    />
                </div>
                <div className="mt-3" />
                <h3 className='product-title'>{product?.product_name}</h3>
                <div className='product-details'>
                    <div className='product-details-two-columns'>
                        <ProductCardLine name='Price' value={`${product?.product_price} €`} />
                        <ProductCardLine name='Availability' value={mapAvailability(product?.product_count)} />
                        <ProductCardLine name='Color' value={`${product?.product_color}`} />

                        {extra ?
                            <>
                                <ProductCardLine name='Diameter' value={`${product?.product_diameter} mm`} />
                                <ProductCardLine name='Width' value={`${product?.product_width} mm`} />
                                <ProductCardLine name='Material' value={`${product?.product_material}`} />
                                <ProductCardLine name='Theme' value={`${product?.pattern.pattern_theme}`} />
                                <ProductCardLine name='Pattern' value={`${product?.pattern.pattern_name}`} />
                            </>
                            : null}

                    </div>
                    {extra ? <>
                        <hr></hr>
                        <ProductCardLine name='Description' value={`${product?.product_description}`} />
                        <hr></hr>
                    </> : null}
                    <ProductCardLine name={extra ? 'User Rating' : 'Rating'}
                        value={
                            <Rating name="read-only"
                                value={avgRating}
                                readOnly
                                precision={0.5}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />}
                    />
                    {userData && extra ? <>
                        <ProductCardLine name='Your Rating'
                            value={
                                <Rating name="edit"
                                    value={userRating}
                                    onChange={(e, value) => {
                                        e.preventDefault()
                                        userRating ? editUserRating(value) : createUserRating(value)
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />}
                        />
                        <button className="cart-btn btn btn-primary"
                            onClick={() => addProductToCart(product)}>{'Add to cart'}</button>
                    </> : null}
                </div>
            </div>
        </>
    )
}
