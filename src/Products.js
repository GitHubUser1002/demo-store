import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './App.css'
import * as _ from 'lodash';
import { Link } from 'react-router-dom';

export function Products() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    document.title = "Commerce General Store";

    if(products) return;

    const request = new Request('/products');

    fetch(request, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      setProducts(data.products);
    })
  });

  return (
    <div className="Body">
        <div className="Products">
        {
        products && products.map(product => {
            const images = product.images.map(image => {
              return {
                  original: image.url,
                  thumbnail: image.url + "?format=100w"
              }
            })

            let minPrice = null;
            product.variants.forEach(v => {
            if (minPrice === null || Number(minPrice) > Number(_.get(v, 'pricing.basePrice.value'))) {
                minPrice = _.get(v, 'pricing.basePrice.value');
            }
            });

            return (
            <div className="Product" key={product.id}>
              <h2><Link to={`/product/${product.id}`}>{product.name}</Link></h2>
              <h3>Starting from ${minPrice}</h3>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
              <ImageGallery 
                items={images} 
                showNav={true} 
                showThumbnails={false} 
                showFullscreenButton={false}
                showPlayButton={false}
                />
              <hr/>
            </div>
            )
        })
        }
        </div>
    </div>
  );
}

export default Products;
