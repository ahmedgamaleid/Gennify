import React, { useState, useEffect } from 'react';
import visa from "../img/visa-Photoroom.png";
import MasterCard from "../img/download-Photoroom.png";
import paypal from "../img/paypal-Photoroom.png"; // Assuming you have this image

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardType, setSelectedCardType] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity ? item.quantity : 1,
    }));
    setCartItems(updatedCart);
  }, []);

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = quantity > 0 ? quantity : 1;
    updateCart(updatedItems);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    updateCart(updatedItems);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleIncrement = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity += 1;
    updateCart(updatedItems);
  };

  const handleDecrement = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    }
    updateCart(updatedItems);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCardTypeChange = (type) => {
    setSelectedCardType(type);
  };
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  return (
    <div className="container">
      <h2 className="weeee bording">Shopping Cart</h2>
      <div className="row my-4">
        <div className="col-lg-9">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul className="list-group">
              {cartItems.map((item, index) => (
                <li key={index} className="list-group-item mb-4 border-1">
                  <div className="row">
                    <div className="col-lg-3 p-3">
                      <img src={item.imageCover} className="w-75 h-100" alt={item.name} />
                    </div>
                    <div className="col-lg-6 py-1">
                      <h5>{item.title}</h5>
                      <p>{truncateDescription(item.description, 150)}</p> {/* Limit description length here */}                      <p>${item.price}</p>
                    </div>
                    <div className="col-lg-3 d-flex flex-column">
                      <div className="Quantity py-1 d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleDecrement(index)}
                        >
                          &ndash;
                        </button>
                        <input
                          id={`quantity-${index}`}
                          type="number"
                          min="1"
                          className="form-control py-1 mx-2 text-center"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleIncrement(index)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn mx-3 rating my-2"
                        onClick={() => handleDeleteItem(index)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                      <h5 className="py-4">Total: ${(item.price * item.quantity).toFixed(2)}</h5>
                    
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-lg-3">
          <div className="border p-3 rounded">
            <h4>Cart Summary</h4>
            <p>Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
            <h5>Total Price: ${calculateTotalPrice()}</h5>
            <button className="btn btn-outline-warning ssssssss btn-lg my-5 px-5 rounded-5 mt-4" onClick={toggleModal}>
              Checkout
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Process Payment</h5>
                <button type="button" className="close" aria-label="Close" onClick={toggleModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="cardType">Card Type</label>
                    <div className="card-icons">
                      <label className="card-icon">
                        <input
                          type="radio"
                          name="cardType"
                          value="visa"
                          checked={selectedCardType === 'visa'}
                          onChange={() => handleCardTypeChange('visa')}
                        />
                        <img src={visa} className="img-fluid" alt="Visa" />
                      </label>
                      <label className="card-icon">
                        <input
                          type="radio"
                          name="cardType"
                          value="mastercard"
                          checked={selectedCardType === 'mastercard'}
                          onChange={() => handleCardTypeChange('mastercard')}
                        />
                        <img src={MasterCard} className="img-fluid" alt="MasterCard" />
                      </label>
                      <label className="card-icon">
                        <input
                          type="radio"
                          name="cardType"
                          value="paypal"
                          checked={selectedCardType === 'paypal'}
                          onChange={() => handleCardTypeChange('paypal')}
                        />
                        <img src={paypal} className="img-fluid" alt="PayPal" />
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      className="form-control"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="expiryDate">Expiration Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        className="form-control"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        className="form-control"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-outline-warning ssssssss btn-lg my-5 px-5 rounded-5 mt-4">Pay Now</button>
                </form>
              </div>
              <div className="modal-footer">
                {/* Add footer content here if needed */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
