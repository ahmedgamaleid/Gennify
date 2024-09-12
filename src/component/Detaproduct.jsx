import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import Toastify

const Detaproduct = () => {
  const { productid } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const mainImageRef = useRef(null);
  const imageGalleryRef = useRef(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productid}`);
        const productData = response.data.data;
        setProduct(productData);
        setSelectedImage(productData.imageCover);
        setLoading(false);

        localStorage.setItem('product', JSON.stringify(productData));
      } catch (err) {
        setError("Failed to fetch product details");
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productid]);

  useEffect(() => {
    const adjustImageGalleryHeight = () => {
      if (mainImageRef.current && imageGalleryRef.current) {
        imageGalleryRef.current.style.height = `${mainImageRef.current.clientHeight}px`;
      }
    };

    adjustImageGalleryHeight();
    window.addEventListener('resize', adjustImageGalleryHeight);

    return () => {
      window.removeEventListener('resize', adjustImageGalleryHeight);
    };
  }, [selectedImage]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.find(item => item.id === product.id)) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      toast.success('Product added to cart!'); // Show success message
    } else {
      toast.info('Product is already in the cart'); // Optional: Inform if already in the cart
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <div className="row shhh rounded-4">
        {product ? (
          <>
            <div className="col-lg-6">
              <div className="main-image d-flex justify-content-center pt-3">
                <img
                  src={selectedImage}
                  alt="product-main"
                  className="img-fluid rounded-3 p-2"
                  ref={mainImageRef}
                  style={{ height: '60%', width: '60%', objectFit: 'contain' }}
                />
              </div>

              <div className="image-gallery mt-3 d-flex flex-row justify-content-center h-25 pb-3" ref={imageGalleryRef}>
                {product.images && product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`product-thumbnail-${index}`}
                    className={`img-thumbnail ${selectedImage === img ? 'border-warning border-3' : ''}`}
                    onClick={() => setSelectedImage(img)}
                    style={{ cursor: 'pointer', height: '80px', width: '80px', objectFit: 'cover', margin: '2px' }}
                  />
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="product-info pt-5">
                <h2 className='text-warning mb-5'>{product.title}</h2>
                <p>{product.description}</p>
                <div className="Quantity">
                  <span>Quantity: {product.ratingsQuantity} piece available</span>
                </div>
                <p>
  Rating: 
  <span className="text-warning d-flex align-items-center fs-6">
    {product.ratingsAverage}
    <span className="star one ms-2 "></span> {/* Use ms-2 for spacing */}
  </span>
</p>


                <div className="price-section mt-3">
                  <p className="text-muted">Brand: <p>{product.brand.name}</p></p>
                  <h3 className="text-success">Now: ${product.price}</h3>
                  <p className="text-success">Discount:70% Off</p>
                </div>
{/* <i className="fa-solid fa-cart-plus"></i> */}
                <div className="mt-5 align-left">
                <button className="btn btn-outline-warning ssssssss btn-lg my-5 px-5 rounded-5" onClick={addToCart}>
  Add to cart
</button>
                 
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>No product found</p>
        )}
      </div>
    </div>
  );
};

export default Detaproduct;


















// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

