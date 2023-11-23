import React, { Key, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import productsService from '../../Utils/productService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Product {
  creationDate: string | number | Date;
  productName: string;
  description: string;
  price: number;
  imageUrls: string[];
}

interface CreateProductModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
}


const CreateProductModal: React.FC<CreateProductModalProps> = ({
  show,
  onHide,
}) => {
  const [product, setProduct] = useState<Product>({
    creationDate: new Date(),
    productName: '',
    description: '',
    price: 0,
    imageUrls: [],
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    handleCreateProduct(product)
    onHide();
  };

  const handleCreateProduct = async (product: Product) => {
    try {
      await productsService.createProduct(product);
      console.log('Product created successfully');
      window.location.reload()
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const [newImageUrl, setNewImageUrl] = useState<string>(''); // State to handle new image URL input

  const handleAddImageUrl = () => {
    // Add a new image URL to the imageUrls array
    if (newImageUrl) {
      setProduct({
        ...product,
        imageUrls: [...product.imageUrls, newImageUrl],
      });
      setNewImageUrl(''); // Clear the input after adding the URL
    }
  };

  const handleRemoveImageUrl = (index: number) => {
    // Remove the image URL at the specified index
    const updatedImageUrls = [...product.imageUrls];
    updatedImageUrls.splice(index, 1);
    setProduct({
      ...product,
      imageUrls: updatedImageUrls,
    });
  };
  

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Rent out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="imageUrl">
            <Form.Label>Add Image URL</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
              <Button className='inline-block bg-rich-blue ml-2' onClick={handleAddImageUrl}>
                Add
              </Button>
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              {product.imageUrls.map((url, index) => (
                <div key={index} style={{position: 'relative', display: 'flex', alignItems: 'center', marginRight: '7px' }}>
                  <img
                    src={url}
                    alt={`Thumbnail ${index}`}
                    style={{objectFit: 'cover', width: '70px', height: '50px', marginRight: '1px' }}
                  />
                  <FontAwesomeIcon className='absolute -top-1 -right-1 flex justify-center items-center text-white bg-default-red rounded-full h-4 w-4 cursor-pointer hover:bg-off-red' icon={faXmark} onClick={() => handleRemoveImageUrl(index)}/>
                </div>
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button 
        onClick={onHide}
        className='border-none bg-default-grey hover:bg-off-grey'
        >
          Close
        </Button>
        <Button
        onClick={handleSubmit}
        className='border-none bg-rich-green hover:bg-off-green'
        >
          List home
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProductModal;
