import React, { useEffect, useState } from 'react';
import productsService from '../../Utils/productService';
import StoreProduct from '../../components/StoreProduct/StoreProduct';
import SearchBarMobile from '../../components/SearchBarMobile/SearchBarMobile';

const HomePage: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  /*Window Resize*/
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await productsService.getProducts();
        setProductList(productsData as Product[]);
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts();
  }, []);
  
  return (
    <div>
      <div className='px-4 pt-4 bg-DEDE'>
        {windowWidth <= 735 && (
          <SearchBarMobile/>
        )}
      </div>
      <div className="w-full h-full bg-DEDE 
      grid gap-3 pt-10 px-6
      pb-10 sm:grid-cols-1 md:grid-cols-2
      lg:grid-cols-3 xl:grid-cols-4">
        {productList.map((product) => {
            const Product = product;
            console.log("Product:", Product);
            return (
              <StoreProduct
                  id={product._id}
                  productName={product.productName}
                  price={product.price}
                  imageUrls={product.imageUrls}
                  description={product.description}
                  key={product._id}
              />
            );
        })}
      </div>
    </div>
  );
};

export default HomePage;
