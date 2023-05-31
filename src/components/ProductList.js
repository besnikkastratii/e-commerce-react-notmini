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

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="py-1">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Title name="our" title="products" />
            </div>
            <div className="col-12 text-right">
              <input type="text" placeholder="Search products..." onChange={handleSearchQueryChange} className="kerko" value={searchQuery}
              />
            </div>
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

                if (products.length === 0) {
                  return (
                    <div className="no-items-found">
                      <p>No items found with the {searchQuery}.</p>
                    </div>
                  );
                }

                return products.map((product) => (
                  <Product key={product.id} product={product} />
                ));
              }}
            </ProductConsumer>
          </div>
          <div className="butonat">
            {currentPage > 1 && (
              <button className="mbrapa" onClick={handlePrevPage}>
                Previous
              </button>
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
                  <button className="para" onClick={handleNextPage}>
                    Next
                  </button>
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
