import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import './Main.css'; // Import the CSS file

const Main = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadProducts = useCallback(() => {
        if (loading || page > totalPages) return;
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_GATEWAY_URL}api/v1/products?page=${page}&itemsPerPage=30`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                setProducts((prevProducts) => [...prevProducts, ...data.data]);
                setPage((prevPage) => prevPage + 1);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
                setError(error.toString());
                setLoading(false);
            });
    }, [loading, page, totalPages]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            loadProducts();
        }
    }, [inView, loadProducts]);

    return (
        <div className="home-page">
            {error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="product-list">
                    {products.map((product, index) => (
                        <Link key={`${product.id}-${index}`} to={`/product/${product.id}`} className="product-item">
                            <h2>{product.name}</h2>
                            <img src={product.image} alt={product.name} />
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                        </Link>
                    ))}
                </div>
            )}
            {loading && <div className="loading">Loading...</div>}
            <div ref={ref} className="loading-trigger"></div>
        </div>
    );
};

export default Main;