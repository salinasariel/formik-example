import React from 'react';
import '../App.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-details">
        <p className="product-title">{product.title}</p>
        <p className="product-price">Precio: ${product.price}</p>
        <p className="product-category">Categoría: {product.category}</p>
      </div>
    </div>
  );
}

export default ProductCard;
