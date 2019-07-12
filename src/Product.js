import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './App.css'
import Button from '@material-ui/core/Button';

export class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      selectedVariantIndex: 0
    };
  }
  
  componentDidMount() {
    document.title = "Commerce General Store";

    if(this.state.product) return
  
    const request = new Request(`/product/${this.props.productId}`);

    fetch(request, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        document.title += `: ${data[0].name}`
        this.setState({
          ...this.state,
          product: data[0]
        });
      }
    });

    return null;
  }

  render() {

    const { product, selectedVariantIndex } = this.state;

    if (!product) return null;

    const selectedVariant = product.variants[selectedVariantIndex];

    let images = [];
    if (product.isSubscribable) {
      if (product.images.length > 0) {
        images.push({
          original: product.images[0].url,
        })
      }
    } else {
      images = product.variants.map(v => {
        return {
          original: v.image.url,
          thumbnail: v.image.url + "?format=100w"
        }
      })
    }

    return (
      <div className="Body">
        <div className="SingleProduct">
          <h2>{product.name}</h2>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
          <hr/>
          <ImageGallery 
            items={images} 
            showNav={false} 
            showThumbnails={images.length > 1} 
            showFullscreenButton={false}
            showPlayButton={false}
            startIndex={selectedVariantIndex}
            onSlide={idx => this.setState({
              ...this.state,
              selectedVariantIndex: idx
            })}
            slideDuration={0}
            thumbnailPosition={'top'}
            />
            <hr/>
            <div className="AddContainer">
              <div>
                <h3>${selectedVariant.pricing.basePrice.value}</h3> 
                {!selectedVariant.stock.unlimited && <h3>{selectedVariant.stock.quantity} left in stock</h3> }
              </div>
              <div className="Add">
                <Button disabled={true} variant="contained" color="primary">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Product;
