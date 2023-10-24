import './card.css'
export function Card(props) {
    const product = props.product
    console.log(product)
    return (
        < div className="card" >
            <div className="cardProperty">Name: {product.product_name}</div>
            <div className="cardProperty">Color: {product.product_color}</div>
            <div className="cardProperty">Description: {product.product_description}</div>
            <div className="cardProperty">Material: {product.product_material}</div>
            <div className="cardProperty">Diameter: {product.product_diameter}cm</div>
            <div className="cardProperty">Width: {product.product_width}cm</div>
            <div className="cardProperty">Price: {product.product_price}$</div>
        </div >
    )
}