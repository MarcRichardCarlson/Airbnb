import _ from 'lodash';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';


interface Product {
  _id: number;
  productName: string;
  imageUrls: string[];
}

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);

  const fetchData = (value: any) => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((json) => {
        const filteredResults = json.filter((product: { productName: any }) => {
          return product && product.productName && product.productName.toLowerCase().includes(value.toLowerCase());
        });
        setResults(filteredResults);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debouncedHandleChange = _.debounce((value) => {
    setInput(value);
    if (value.trim() === "") {
      setResults([]);
    } else {
      fetchData(value);
    }
  }, 0);

  // Clear the search field when a result is clicked and removes list by setting results to empty
  const handleResultClick = () => {
    setInput("");
    setResults([]);
  };

  const handleChange = (value: React.SetStateAction<string>) => {
    setInput(value);
    debouncedHandleChange(value);
  };

  return (
    <div style={{ position: 'relative' }}>
      
      <div className='w-full absolute bg-white flex justify-center items-center rounded-md shadow-lx'>
        <div className='p-2'>
          <BiSearchAlt/>
        </div>

        <input
          className='w-full h-1 p-3 rounded-md text-sm 
          flex justify-center items-center cursor-pointer outline-none' 
          placeholder='Sök destination..' 
          type='text' 
          value={input}
          spellCheck='false'
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {results.length > 0 && (
        <div className='w-full bg-white absolute rounded-md p-2 shadow-lg Z-50 top-9'>
          {results.map((product) => (
            <Link
              to={`/details/${product._id}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleResultClick}
            >
              <div className='w-full h-10 mb-1 bg-default-white flex items-center cursor-pointer shadow-lg rounded-sm hover:bg-off-white' key={product._id}>
                <img className="object-cover h-full w-24" src={product.imageUrls[0]} alt={`Image of ${product.productName}`} />
                <p className='w-full flex items-center pl-2 h-12 text-sm'>{product.productName}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
