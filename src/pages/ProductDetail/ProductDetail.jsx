import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProductDetail.css';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_GATEWAY_URL}api/v1/products/${productId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
                setError(error.toString());
                setLoading(false);
            });
    }, [productId]);

    const addToBasket = () => {
        // Add product to cart logic here
        console.log(`Product ${productId} added to basket`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-detail">
            <div className='product-image'>
                <img src={product.image} alt={product.name}/>
            </div>
            <div className='product-description'>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
            </div>
            <div className="add-to-cart">
                <p className="price">Price: ${product.price}</p>
                <button className="add-to-basket" onClick={addToBasket}>Add to Basket</button>
            </div>
        </div>
    );
};

export default ProductDetail;