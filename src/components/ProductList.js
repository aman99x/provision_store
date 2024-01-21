import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  const searchProducts = () => {
    axios.get('https://api.kalpav.com/api/v1/product/category/retail')
      .then(response => {
        // Filter products based on search term
        const filteredProducts = response.data.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && searchProducts()}
      />

      {products.map(product => (
        <div key={product.id}>
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
