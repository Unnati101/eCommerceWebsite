import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] =useState({});
    const [relatedProducts, setRelatedProducts]=useState([])

    //initial details
    useEffect(()=>{
        if(params?.slug) getProduct()

    }, [params?.slug]);
    //get product

    const getProduct = async () => {
        try{
            const {data}  = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        }catch(error){
            console.log(error)
        }
    };

    //get similar product
    const getSimilarProduct = async(pid,cid)=>{
        try{
            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);

        }catch(error){
            console.log(error);
        }
    };
  return (
    <Layout>
         <div className='row container mt-2'>
            <div className='col-md-6'>
                  <img
                      src={`/api/v1/product/product-photo/${product._id}`}
                      className="card-img-top" 
                      alt={product.name} />
            </div>
            <div className='col-md-6 text-center'>
                  <h1>Product details</h1>
                  <h6>Name: {product.name}</h6>
                  <h6>Description: {product.description}</h6>
                  <h6>Price: {product.price}</h6>
                  <h6>Category: {product?.category?.name}</h6>
                  <h6>Shipping: {product.shipping}</h6>
                  <button class="btn btn-secondary ms-1">Add to cart</button>

            </div>
         </div>
         <hr/>
         <div className='row container'>
              <h6>Similar products</h6>
                 {relatedProducts.length < 1 &&
                  <p className='text-center'>
                  No Similar Products found
                  </p>
                  }
              <div className='d-flex flex-wrap'>

                  {relatedProducts?.map((p) => (
                      // <Link key={p._id} to={`/dashboard/admin/product/${p.plug}`}
                      // className='product-link'
                      // >


                      <div className="card m-2" style={{ width: "18rem" }}>
                          <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                          />
                          <div className="card-body">
                              <h5 class="card-title">{p.name}</h5>
                              <p className="card-text">{p.description.substring(0, 30)}...
                              </p>
                              <p className="card-text">{p.price}</p>
                              
                              <button class="btn btn-secondary ms-1">Add to cart</button>
                          </div>
                      </div>

                      //  </Link>


                  ))}
              </div>
              </div>
    </Layout>
         
    
 
  );
};

export default ProductDetails;