import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import { ProductConsumer } from '../context';

export default class Navbar extends Component {
  state = {
    isMobileMenuOpen: false,
  };

  toggleMobileMenu = () => {
    this.setState((prevState) => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }));
  };

  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { cart } = value;
          const cartItemsCount = cart.reduce((total, item) => total + item.count, 0);

          return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
              <Link to="/">
                <img src={logo} alt="store" className="navbar-brand" />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                onClick={this.toggleMobileMenu}
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className={`collapse navbar-collapse ${this.state.isMobileMenuOpen ? 'show' : '' }`} >
                <ul className="navbar-nav align-items-center">
                  <li className="nav-item ml-5">
                    <Link to="/" className="nav-link">
                      Mobile Shop
                    </Link>
                  </li>
                  <li className="nav-item ml-5">
                    <Link to="/" className="nav-link">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item ml-5">
                    <Link to="/" className="nav-link">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <Link to="/cart" className="ml-auto">
                <ButtonContainer>
                  <i className="fas fa-cart-plus" /> My Cart
                  {cartItemsCount > 0 && (
                    <CartIndicator className="cart-indicator">
                      {cartItemsCount}
                    </CartIndicator>
                  )}
                </ButtonContainer>
              </Link>
            </NavWrapper>
          );
        }}
      </ProductConsumer>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--mainDark);

  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: var(--mainYellow) !important;
    }
  }

  .navbar-toggler {
    order: -1;
    margin-right: 1rem;
  }

  @media (min-width: 576px) {
    .navbar-toggler {
      display: none;
    }
  }
`;

const CartIndicator = styled.span`
  position: relative;
  top: -3px;
  left: 80px;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: white;
`;
