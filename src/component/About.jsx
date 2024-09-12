import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Parallax, Zoom, HashNavigation } from "swiper/modules";
import { TrendingAndCategContext } from '../CONTEXT/trendingandcateg';

const About = () => {
  let { categories, brands } = useContext(TrendingAndCategContext);

  return (
    <div className="about container">
      {/* Testimonials Section */}
      <div className="testimonials mb-5">
        <h1 className="text-center bording mb-4">What Our Customers Say</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="testimonial-card p-4 border rounded shadow-sm">
              <p className="testimonial-text">
                "The service was exceptional and the products are top-notch! I've never had a better shopping experience."
              </p>
              <h5 className="testimonial-author">- Alex Johnson</h5>
            </div>
          </div>
          <div className="col-md-4">
            <div className="testimonial-card p-4 border rounded shadow-sm">
              <p className="testimonial-text">
                "A fantastic selection of brands and categories. I found everything I needed and more!"
              </p>
              <h5 className="testimonial-author">- Maria Smith</h5>
            </div>
          </div>
          <div className="col-md-4">
            <div className="testimonial-card p-4 border rounded shadow-sm">
              <p className="testimonial-text">
                "The customer support was very helpful and responsive. Highly recommend this company!"
              </p>
              <h5 className="testimonial-author">- David Lee</h5>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/* Categories Section */}
      <div className="categories mb-5">
        <h1 className="text-center bording mb-4">Categories</h1>
        {categories.length > 0 ? (
          <Swiper
            modules={[Parallax, Zoom, HashNavigation]}
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1.5, spaceBetween: 10 },
              480: { slidesPerView: 2, spaceBetween: 15 },
              640: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 25 },
              1024: { slidesPerView: 4.5, spaceBetween: 30 },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category._id}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "2px solid #ddd",
                    }}
                  />
                  <h4 style={{ textAlign: "center", marginTop: "10px" }}>
                    {category.name}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div>Loading categories...</div>
        )}
      </div>
      <hr />
      {/* Brands Section */}
      <div className="brand mb-5">
        <h1 className="text-center bording mb-4">Brands</h1>
        {brands.length > 0 ? (
          <Swiper
            modules={[Parallax, Zoom, HashNavigation]}
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1.5, spaceBetween: 10 },
              480: { slidesPerView: 2, spaceBetween: 15 },
              640: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 25 },
              1024: { slidesPerView: 4.5, spaceBetween: 30 },
            }}
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand._id}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={brand.image}
                    alt={brand.slug}
                    // style={{
                    //   width: '200px',
                    //   height: '200px',
                    //   objectFit: 'cover',
                    //   borderRadius: '50%',
                    //   overflow: 'hidden',
                    //   border: '2px solid #ddd',
                    // }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div>Loading brands...</div>
        )}
      </div>
    </div>
  );
}

export default About;
