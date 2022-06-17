import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";
const Product = ({ product: { image, Name, slug, price, _id } }) => {
  return (
    <>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            alt={slug.current}
            className='product-image'
          />
          <p className='product-name'>{Name}</p>
          <p className='product-price'>{price}</p>
        </div>
      </Link>
    </>
  );
};

export default Product;
