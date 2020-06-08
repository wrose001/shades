import React, { Component } from 'react'
import Product from './Product'
import Title from './Title'
import {ProductConsumer} from '../context'

export default class ProductList extends Component {
  render() {
    return (
        <React.Fragment>
            <div className="py-5">
              <div className="container">
                <Title title="Time To Treat You" subTitle="30 Styles, 90 Lens Types, 300 Color Options. Design your Shades, your own way." bodySub="Choose from our most wanted eyeglasses to find your authentic look." />
                <div className="row">
                    <ProductConsumer>
                        {
                          value => {
                            return value.products.map (
                              product => {
                                return <Product key={product.id} product={product}/>
                              }
                            )
                          }
                        }
                    </ProductConsumer>
                </div>
              </div>
            </div>
        </React.Fragment>
    )
  }
}
