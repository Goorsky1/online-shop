import React from "react";

export function ProductCardLine({ name, value }) {
    return (
        <div>
            <span className='product_card_line_name'>{name}: </span>
            <span className='product_card_line_value'>{value}</span>
        </div>
    )
}

export function ProductCard(props) {
    const { product, extra } = props

    return (
        <div className='product'>
            <div className="image-container">
                <img
                    src={`data:image/jpeg;base64,${product.product_image}`}
                    alt={product?.product_name} />
            </div>
            <h3 className='product-title'>{product?.product_name}</h3>
            <div className='product-details'>
                <div className='product-details-two-columns'>
                    <ProductCardLine name='Price' value={`${product?.product_price} €`} />
                    <button className="btn btn-primary">{'Add to cart'}</button>
                </div>
            </div>
        </div>
    )
}