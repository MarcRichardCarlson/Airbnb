import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';


/*Get products*/
async function getProducts(){
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/*Get by id*/
async function getProductById(productId: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
}

/*Create product*/
async function createProduct(productData: any) {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

async function updateProduct(productId: any, productData: any) {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

async function deleteProduct(productId: any) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}


/*Price formater*/
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD", style: "currency"})
function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number)
}




const productsService = {
  getProducts,
  getProductById,
  createProduct,
  formatCurrency,
  deleteProduct,
  updateProduct,
};

export default productsService;