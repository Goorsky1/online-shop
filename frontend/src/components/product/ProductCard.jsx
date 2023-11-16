export function ProductCard(props) {
    const {product, extra} = props

    return (
        <div className='product'>
            <div className="image-container">
                <img src={`data:image/jpeg;base64,${product?.image}`} alt={product?.product_name}/>
            </div>
            <h3 className='product-title'>{product?.product_name}</h3>
        </div>
    )
}