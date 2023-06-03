import React, { useState, useEffect, useCallback } from "react";
import { storeProducts } from "./data";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); // Add loading state
  const [products, setProducts] = useState([]);
  const [detailProduct, setDetailProduct] = useState();
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState();
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProducts(() => {
        let updatedProducts = [];
        storeProducts.forEach((item) => {
          const singleItem = { ...item };
          updatedProducts = [...updatedProducts, singleItem];
        });
        return updatedProducts;
      });
      checkLocalStorage();
      setLoading(false); // Set loading to false after 3 seconds
    }, 3000); // 3 seconds

    // eslint-disable-next-line
  }, []);

  const checkLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
      addTotals(JSON.parse(savedCart));
    }
  };

  const getItem = useCallback((id) => {
    return products.find((item) => item.id === id);
  }, [products]);

  useEffect(() => {
    if (detailProduct) {
      const product = getItem(detailProduct.id);
      setDetailProduct(product);
    }
  }, [products, detailProduct, getItem]);

  const handleDetail = (id) => {
    const product = getItem(id);
    setDetailProduct(product);
  };

  const addToCart = (id) => {
    let tempProducts = [...products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    product.total = product.price;

    setProducts([...tempProducts]);
    setCart([...cart, product]);
    setDetailProduct({ ...product });

    const updatedCart = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    addTotals(updatedCart);
  };

  const openModal = (id) => {
    const product = getItem(id);
    setModalProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const increment = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;

    setCart([...tempCart]);
    addTotals([...tempCart]);
    localStorage.setItem("cart", JSON.stringify(tempCart));
  };

  const decrement = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;

    if (product.count === 0) {
      removeItem(id);
      tempCart = tempCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(tempCart));
    } else {
      product.total = product.count * product.price;

      setCart([...tempCart]);
      addTotals([...tempCart]);
      localStorage.setItem("cart", JSON.stringify(tempCart));
    }
  };

  const getTotals = (cartItems) => {
    let subTotal = 0;
    cartItems.forEach((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = parseFloat((subTotal + tax).toFixed(2));
    return {
      subTotal,
      tax,
      total,
    };
  };

  const addTotals = (cartItems) => {
    const totals = getTotals(cartItems);
    setCartSubTotal(totals.subTotal);
    setCartTax(totals.tax);
    setCartTotal(parseFloat(totals.total.toFixed(2)));
  };

  const removeItem = (id) => {
    let tempProducts = [...products];
    let tempCart = [...cart];

    const index = tempProducts.indexOf(getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter((item) => item.id !== id);

    setCart([...tempCart]);
    setProducts([...tempProducts]);
    addTotals([...tempCart]);

    localStorage.setItem("cart", JSON.stringify(tempCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    setProducts(() => {
      let updatedProducts = [];
      storeProducts.forEach((item) => {
        const singleItem = { ...item };
        updatedProducts = [...updatedProducts, singleItem];
      });
      return updatedProducts;
    });
    addTotals([]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        detailProduct,
        cart,
        modalOpen,
        modalProduct,
        cartSubTotal,
        cartTax,
        cartTotal,
        handleDetail,
        addToCart,
        openModal,
        closeModal,
        increment,
        decrement,
        removeItem,
        clearCart,
      }}
    >
      {loading ? (
  <div className="loader-container">
<span className="loader">Per Programera</span>
  </div>
) : (
  children
)}

    </ProductContext.Provider>
  );
};

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
