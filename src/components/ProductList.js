import React, { useState } from 'react';
import Product from './Product';
import Title from './Title';
import { ProductConsumer } from '../context';

const ITEMS_PER_PAGE = 6;

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="py-1">
        <div className="container">
          <Title name="our" title="products" />
          <div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </div>
          <div className="row">
            <ProductConsumer>
              {(value) => {
                const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
                const endIndex = startIndex + ITEMS_PER_PAGE;
                const filteredProducts = value.products.filter((product) =>
                  product.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
                const products = filteredProducts.slice(startIndex, endIndex);

                return products.map((product) => (
                  <Product key={product.id} product={product} />
                ));
              }}
            </ProductConsumer>
          </div>
          <div>
            {currentPage > 1 && (
              <button onClick={handlePrevPage}>Previous</button>
            )}
            <ProductConsumer>
              {(value) => {
                const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
                const endIndex = startIndex + ITEMS_PER_PAGE;
                const filteredProducts = value.products.filter((product) =>
                  product.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
                const products = filteredProducts;

                return endIndex < products.length ? (
                  <button onClick={handleNextPage}>Next</button>
                ) : null;
              }}
            </ProductConsumer>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
