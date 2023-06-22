import React, { useState } from 'react';
import "../../pages/Admin/admin.css"

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    size: '',
    color: '',
    genre: '',
    quantity: '',
    price: '',
    image: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    // Send form data to the backend API
    fetch('http://localhost:3308/api/newproduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response from the server
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="size">Size:</label>
        <input
          type="text"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          required
        /><br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProductForm;
