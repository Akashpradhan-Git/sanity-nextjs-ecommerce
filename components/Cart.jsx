import React from "react";
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  toggleCart,
  quantityIncrement,
  quantityDecrement,
  removeFromCart,
} from "../app/slices/cartSlice";
import { urlFor } from "../lib/client";
import { initializeRazorpay } from "../lib/rozorpay";

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const products = useSelector((state) => state.cart);

  async function handlePayment() {
    rozorpay();
  }

  const rozorpay = async () => {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Something went wrong");
      return;
    }
    // creating a new order
    const result = await fetch("http://localhost:3000/api/payment", {
      method: "POST",
      body: JSON.stringify({
        amount: products.total,
        currency: "INR",
        receipt: "order_rcpt_" + Date.now(),
        payment_capture: 1,
      }),
    });

    const data = await result.json();
    console.log(data);
    if (!data) {
      alert("Server error. Are you online?");
      return;
    }
    // Getting the order details back
    // const { amount, id: order_id, currency } = data.data;

    var options = {
      key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      name: "Headphones Store",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank you for shopping with us",
      handler: function (response) {
        ganerateInvoice(response);
      },
      prefill: {
        name: "Akash Pradhan",
        email: "akashpradhan@gmail.com",
        contact: "9999999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  async function ganerateInvoice(response) {
    dispatch(toggleCart());
    router.push("/success");
  }

  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => dispatch(toggleCart())}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({products.cart.length} items)</span>
        </button>
        {products.cart.length > 0 &&
          products.cart.map((product) => (
            <div className='product' key={product._id}>
              <img
                src={urlFor(product?.image[0])}
                className='cart-product-image'
              />
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{product.name}</h5>
                  <h4>₹{product.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span
                        className='minus'
                        onClick={() => dispatch(quantityDecrement(product))}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className='num'>{product.quantity}</span>
                      <span
                        className='plus'
                        onClick={() => dispatch(quantityIncrement(product))}
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button
                    type='button'
                    className='remove-item'
                    onClick={() => dispatch(removeFromCart(product))}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}

        {products && products != null && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${products.total}</h3>
            </div>
            <div className='btn-container'>
              <button
                type='button'
                className='btn'
                onClick={() => handlePayment()}
              >
                Pay Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
