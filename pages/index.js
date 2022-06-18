
import { Product, FooterBanner, HeroBanner } from '../components/index'
import { client } from '../lib/client'
const index = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroData={bannerData.length > 0 && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>
      <div className="products-container">
        {
          products?.map((product) => {
            return <Product key={product._id} product={product} />
          })
        }
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export default index

export const getServerSideProps = async () => {
  const products = await client.fetch(`*[_type == "product"]`)
  const bannerData = await client.fetch(`*[_type == "banner"]`)
  return {
    props: {
      products,
      bannerData
    }
  }
}