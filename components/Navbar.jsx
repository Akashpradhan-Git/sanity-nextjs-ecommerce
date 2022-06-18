import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../app/slices/cartSlice";
import Cart from "./Cart";

import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const showCart = useSelector((state) => state.cart.showCart);
  const cartItem = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { data: session } = useSession();

  const handleCartOpen = () => {
    dispatch(toggleCart());
  };

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>
          <img className='logo' src='/logo.png' alt='logo' />
        </Link>
      </p>
      <div className='navbar-links'>
        <Link href='/'>
          <a className='nav-item'>Home</a>
        </Link>
        <Link href='/products'>
          <a className='nav-item'>Products</a>
        </Link>
        <Link href='/about'>
          <a className='nav-item'>About</a>
        </Link>
        {session ? (
          <>
            <button
              type='button'
              className='nav-item logout'
              onClick={() => signOut()}
            >
              Logout
            </button>
            <img className='avatar' src={session.user.image} alt='user-image' />
            <a className='nav-item'>{session.user.name}</a>
          </>
        ) : (
          <button
            type='button'
            className='nav-item login'
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </div>
      <button
        type='button'
        className='cart-icon'
        onClick={() => handleCartOpen()}
      >
        <AiOutlineShopping />
        <span className='cart-item-qty'>
          {cartItem.cart.length > 0 ? cartItem.cart.length : 0}
        </span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
