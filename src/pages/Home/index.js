import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import { MdShoppingCart } from "react-icons/md";

import api from "../../services/api";
import { formatPrice } from "../../util/format";

import { ProductList } from "./styles";

import { addToCart } from "../../store/modules/cart/actions";

function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const response = await api.get("products");

    const data = response.data.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    setProducts(data);
  }

  function handleAddProduct(product) {
    dispatch(addToCart(product));
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product)}>
            <div>
              <MdShoppingCart size={16} color="#fff" /> 3
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

export default connect()(Home);
