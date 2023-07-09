import React, { useEffect } from "react";
import { fetchProductByIdAsync, fetchAllProductsAsync } from "./productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "./productsSlice";
import { Link } from "react-router-dom";
import { Dna } from  'react-loader-spinner';

function ProductList({ status }) {
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

  // console.log(products);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {status === "loading" ? (
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          ) : null}
          {products.map((product) => (
            <Link to={`/product-detail/${product.id}`} key={product.id}>
              <div
                key={product.id}
                className="group relative"
                onClick={() => dispatch(fetchProductByIdAsync(product.id))}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-lg text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.discountPercentage}% off
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      ${product.price}
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {" "}
                      Rating - {product.rating}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
