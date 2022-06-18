import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";
import PropTypes from "prop-types";
const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>
        <img
          src={urlFor(image)}
          className='footer-banner-image'
          alt={product}
        />
      </div>
    </div>
  );
};
FooterBanner.prototype = {
  footerBanner: PropTypes.shape({
    discount: PropTypes.string,
    largeText1: PropTypes.string,
    largeText2: PropTypes.string,
    saleTime: PropTypes.string,
    smallText: PropTypes.string,
    midText: PropTypes.string,
    desc: PropTypes.string,
    product: PropTypes.string,
    buttonText: PropTypes.string,
    image: PropTypes.string,
  }),
};
export default FooterBanner;
