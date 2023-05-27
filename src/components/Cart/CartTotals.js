import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function CartTotals({ value }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart, cart } = value;
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState(''); 
  const nameRef = useRef();
  const surnameRef = useRef();
  const addressRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();

  const saveToLocalStorage = () => {
    const user = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      address: addressRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      email: emailRef.current.value
    };


    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('cart', JSON.stringify(cart));
    clearCart();
  };

  return (
    <React.Fragment>
      <form>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <input
              type="text"
              placeholder="Name"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Surname"
              ref={surnameRef}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              ref={addressRef}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="number"
              placeholder="Phone Number"
              ref={phoneNumberRef}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={saveToLocalStorage}
              >
                Make Order
              </button>
            </Link>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartSubTotal}</strong>
            </h5>
            <h5>
              <span className="text-title">taxes :</span>
              <strong>{cartTax}</strong>
            </h5>
            <h5>
              <span className="text-title">TOTAL :</span>
              <strong>{cartTotal}</strong>
            </h5>
          </div>
        </div>
      </div>
      </form>
    </React.Fragment>
  );
}
