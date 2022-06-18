import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components/index'
import { addToCart } from '../../app/slices/cartSlice'
import { useDispatch } from 'react-redux'
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify'
import PropTypes from "prop-types";
const ProductSingle = ({ product, products }) => {
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch()
    const { data: session } = useSession();

    const handleAddToCart = () => {
        if (session) {
            dispatch(addToCart(product))
        }
        else {
            toast.warning('Please login to add to cart')
        }

    }

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(product.image && product.image[index])} className="product-detail-image" />
                    </div>
                    <div className="small-images-container">
                        {
                            product.image && product.image.map((image, i) => {
                                return <img key={i} src={urlFor(image)}
                                    className={i === index ? 'small-image selected-image' : 'small-image'}
                                    onClick={() => setIndex(i)} />
                            })
                        }
                    </div>
                </div>
                <div className="product-detail-desc">
                    <h3>{product.Name}</h3>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details: </h4>
                    <p>{product.details}</p>
                    <p className="price">₹{product.price} </p>

                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                        <button type="button" className="buy-now">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {
                            products?.map((product) => (
                                <Product key={product._id} product={product} />
                            ))

                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

ProductSingle.prototype = {
    product: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired
}

export default ProductSingle

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
                slug {
                current
            }
  }
            `;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return {
        props: { products, product }
    }
}
