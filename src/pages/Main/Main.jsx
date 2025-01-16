import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import './Main.css'; // Import the CSS file
import SimpleImageSlider from "react-simple-image-slider";

const Main = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const images = [
        { url: "images/1.jpg" },
    ];

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
        <div>
            <div className="home-page">
                <div className="slider">
                    <SimpleImageSlider
                        width={1360}
                        height={520}
                        images={images}
                        showBullets={true}
                        style={{radius: "15px"}}
                        showNavs={false}
                    />
                </div>
            </div>

            <div className="products">
                <div className='list'>
                    {error ? (
                        <div className="error">{error}</div>
                    ) : (
                        <div className="product-list">
                            {products.map((product, index) => (
                                <Link key={`${product.id}-${index}`} to={`/product/${product.id}`}
                                      className="product-item-container">
                                    <div className="product-item-image">
                                        <img src={product.image} alt={product.name}/>
                                    </div>
                                    <div>
                                    <h2 className="product-item-name">{product.name}</h2>
                                        <p className="product-item-price">Price: ${product.price}</p>
                                        <div className="add-to-basket">Add to cart</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                    {loading && <div className="loading">Loading...</div>}
                    <div ref={ref} className="loading-trigger"></div>
                </div>
            </div>
        </div>
    );
};

export default Main;