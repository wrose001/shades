import React, { Component } from 'react'
import { storeProducts, detailProduct, productReviews } from './data'
import { runInThisContext } from 'vm';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    reviews: productReviews,
    productReviews: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  }

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    })
    this.setState(() => {
      return { products: tempProducts };
    })
  }

  getItem = (id) => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  }

  getReviews = (id) => {
    return this.state.reviews.filter(({ itemID }) => itemID === id);
  }

  handleDetail = (id) => {
    console.log("hande detail")
    const product = this.getItem(id);
    const reviews = this.getReviews(id);
    this.setState(
      () => {
        return {
          detailProduct: product,
          productReviews: reviews
        };
      }
    )
  }

  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    const product = this.getItem(id);
    const index = tempProducts.indexOf(product);
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(() => {
      return { products: tempProducts, cart: [...this.state.cart, product] }
    },
      () => {
        this.addTotals();
      })
  }

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    })
  }

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    })
  }

  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  }

  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;

    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      )
    }
  }

  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter(item => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(() => {
      return {
        cart: [...tempCart],
        products: [...tempProducts]
      }
    }, () => {
      this.addTotals();
    })
  }

  clearCart = () => {
    this.setState(() => {
      return { cart: [] };
    }, () => {
      this.setProducts();
      this.addTotals();
    })
  }

  addNewReview = (review) => {
    this.state.reviews.push(review)
    this.setState(() => {
      return {
        reviews: this.state.reviews
      }
    })
    // console.log(this.state.reviews);
    this.handleDetail(review.itemID)
  }

  addTotals = () => {
    let subTotal = 0.00;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.0825;
    const tax = parseFloat(tempTax);
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal.toFixed(2),
        cartTax: tax.toFixed(2),
        cartTotal: total.toFixed(2)
      }
    })
  }
  render() {
    return (
      <ProductContext.Provider value={
        {
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          addNewReview: this.addNewReview,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }
      }>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };