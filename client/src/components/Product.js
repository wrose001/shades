import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import PropTypes from 'prop-types'

export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;
    return (
      <ProductWrapper className="col-12 col-sm-6 col-md-4 my-3">
        <div className="card">
          <ProductConsumer>
            {(value) => (
              <div
                className="img-container"
                onClick={() => value.handleDetail(id)}
              >
                <Link to="/details">
                  <img src={img} alt="product" className="card-img-top" width="100%" />
                </Link>

                <button
                  className="cart-btn"
                  disabled={inCart ? true : false}
                  onClick={() => {
                    value.addToCart(id);
                    value.openModal(id);
                  }}
                >
                  {inCart ? (
                    <p className="text-capitalize mb-0" disabled>
                      In Cart
                    </p>
                  ) : (
                      <p className="text-capitalize mb-0" disabled>
                        <i className="fas fa-cart-plus" /> Add To Cart
                  </p>
                  )}
                </button>
              </div>
            )}
          </ProductConsumer>
          <div className="card-footer">
            <p className="align-self-center title mb-2">
              {title}
            </p>
            <h5 className="text-blue price font-italic mb-0">
              <span className="mr-1">$</span>
              {price}
            </h5>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool
  }).isRequired
};


const ProductWrapper = styled.div`
.card {
  border-color: transparent;
  transition: all .3s linear;
}
.card-footer {
  background: transparent;
  border-top: transparent;
  transition: all .3s linear;
}
&:hover {
  .card {
    border: 0.04rem solid rgba(0,0,0,0.2);
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2)
  }
  .card-footer {
    background: rgba(247, 247, 247);
  }
}
.img-container {
  position: relative;
  overflow: hidden;
}
.card-img-top {
  transition: all .3s linear;
  transform-origin: bottom;
}
.img-container:hover .card-img-top{
  transform: scale(1.2);
}
.cart-btn{
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 0.2 rem 0.4rem;
  background: #2a2a2a;
  border: none;
  color:var(--mainWhite);
  font-size: 1.4rem;
  border-radius: 0;
  transform: translate(0%, 100%);
  transition: all .3s linear;
}
.img-container: hover .cart-btn {
  transform: translate(0,0);
}
.cart-btn:hover{
  cursor: pointer;
}
.title {
  font-size: 24px;
}
.price {
  font-size: 16px;
  color: #777777;
}
`;
