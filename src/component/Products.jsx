import React, { useContext, useState, useEffect } from 'react'; 
import { TrendingAndCategContext } from '../CONTEXT/trendingandcateg';
import { Link } from "react-router-dom";

const Products = () => {
  const { Products } = useContext(TrendingAndCategContext);

  const limitTitle = (title, limit = 20) => {
    return title.length > limit ? title.substring(0, limit) + '...' : title;
  };

  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      const categoryName = product.category.name;
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(product);
      return acc;
    }, {});
  };

  const categorizedProducts = Products ? groupByCategory(Products) : {};

  return (
    <div className="container product-list">
      {Object.keys(categorizedProducts).length > 0 ? (
        Object.keys(categorizedProducts).map((categoryName) => (
          <div key={categoryName} className="category-section mb-5">
            <h2 className="category-title weeee bording">{categoryName}</h2>
            <div className="row g-4 rounded-4">
              {categorizedProducts[categoryName].map((product) => (
                <ProductCard key={product.id} product={product} limitTitle={limitTitle} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

const ProductCard = ({ product, limitTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // State to track the heart icon click

  // Load liked state from localStorage on component mount
  useEffect(() => {
    const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
    if (likedProducts.includes(product.id)) {
      setIsLiked(true); // If the product was previously liked, set the liked state
    }
  }, [product.id]);

  useEffect(() => {
    let slideInterval;
    if (isHovered) {
      slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);
      }, 1500);
    } else {
      setCurrentIndex(0);
    }

    return () => {
      clearInterval(slideInterval);
    };
  }, [isHovered, product.images.length]);

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Toggle liked state and save it to localStorage
  const toggleLike = () => {
    setIsLiked(!isLiked);
    let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
    if (!isLiked) {
      likedProducts.push(product.id); // Add product to liked list
    } else {
      likedProducts = likedProducts.filter(id => id !== product.id); // Remove product from liked list
    }
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  };

  return (
    <div
      className="col-lg-3 col-md-4 col-sm-6 mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card p-2 rounded-4 border border-2">
        <div className="position-relative image-slider-container">
          <div className="image-slider">
            <Link to={`/Detaproduct/${product.id}`}>
              <img
                src={product.images[currentIndex]}
                alt={product.title}
                className="product-image w-100 h-auto rounded-4"
              />
            </Link>

            {/* Heart Icon */}
            <div
              className="add-overlay position-absolute d-flex justify-content-center align-content-center rounded-3 top-0 end-0 p-2"
              onClick={toggleLike} // Toggle like when heart icon is clicked
              style={{ cursor: 'pointer' }}
            >
              <i className={`fa-heart fs-3 ${isLiked ? 'fa-solid text-danger' : 'fa-regular'}`}></i>
            </div>

            {/* Rating Overlay */}
            <div className="product-overlay rating border-2 rounded-5 position-absolute bottom-0 start-0 w-25 p-1 px-2 text-center">
              {product.ratingsAverage}
              <div className="starrr"></div>(5)
            </div>
          </div>

          {/* Image Indicators */}
          <div className="image-indicators">
            {product.images.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToImage(index)}
              ></button>
            ))}
          </div>
        </div>

        {/* Product details */}
        <h5 className="product-title pt-1">{limitTitle(product.title)}</h5>
        <div className="d-flex">
          <p className="product-price px-3">${product.price}</p>
          <p className="product-price">{product.brand.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Products;
