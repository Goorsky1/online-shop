import { Card } from "./Card"

export function CardList(props) {
    const products = props.products
    return (
        <div className="cardList">
            {products.map((products) => <Card product={products} />)}
        </div>
    )
}
