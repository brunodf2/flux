import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

import { MdShoppingCart } from "react-icons/md";

import api from "../../services/api";
import { formatPrice } from "../../util/format";

import { ProductList } from "./styles";

import * as CartActions from "../../store/modules/cart/actions";

function Home({ addToCart, amount: soma }) {
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
    addToCart(product);
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
              <MdShoppingCart size={16} color="#fff" /> {soma[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
