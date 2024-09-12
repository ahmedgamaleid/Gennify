import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import Products from './../component/Products';

export const TrendingAndCategContext = createContext("");

function TrendingAndCategProvider(props) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [Products, setproducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const localStorageDataCategories = localStorage.getItem("categories");
        if (localStorageDataCategories) {
          setCategories(JSON.parse(localStorageDataCategories));
        } else {
          const { data } = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/categories"
          );
          console.log("Categories Data:", data);
          setCategories(data.data);
          localStorage.setItem("categories", JSON.stringify(data.data));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const localStorageDataBrands = localStorage.getItem("brands");
        if (localStorageDataBrands) {
          setBrands(JSON.parse(localStorageDataBrands));
        } else {
          const { data } = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/brands"
          );
          console.log("Brands Data:", data);
          setBrands(data.data);
          localStorage.setItem("brands", JSON.stringify(data.data));
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    const fetchproducts = async () => {
      try {
        const localStorageDataproducts = localStorage.getItem("products");
        if (localStorageDataproducts) {
          setproducts(JSON.parse(localStorageDataproducts));
        } else {
          const { data } = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/products"
          );
          console.log("products Data:", data);
          setproducts(data.data);
          localStorage.setItem("products", JSON.stringify(data.data));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchproducts();
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <TrendingAndCategContext.Provider value={{ categories, brands ,Products}}>
      {props.children}
    </TrendingAndCategContext.Provider>
  );
}

export default TrendingAndCategProvider;
