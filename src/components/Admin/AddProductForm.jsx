import React, { useState, useEffect } from 'react';
import "../../pages/Admin/admin.css"

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    sizes: [],
    selectedSizes: [],
    colors: [],
    selectedColors: [],
    genre: '',
    quantity: '',
    price: '',
    images: {},
  });

  useEffect(() => {
    fetch('http://localhost:3308/api/sizes')
      .then((response) => response.json())
      .then((data) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          sizes: data,
        }));
      })
      .catch((error) => {
        console.error('Error fetching sizes:', error);
      });

    fetch('http://localhost:3308/api/colors')
      .then((response) => response.json())
      .then((data) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          colors: data,
        }));
      })
      .catch((error) => {
        console.error('Error fetching colors:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (e) => {
    const sizeId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    setFormData((prevFormData) => {
      if (isChecked) {
        return {
          ...prevFormData,
          selectedSizes: [...prevFormData.selectedSizes, sizeId],
        };
      } else {
        return {
          ...prevFormData,
          selectedSizes: prevFormData.selectedSizes.filter((id) => id !== sizeId),
        };
      }
    });
  };

  const handleColorChange = (e) => {
    const colorId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    setFormData((prevFormData) => {
      if (isChecked) {
        return {
          ...prevFormData,
          selectedColors: [...prevFormData.selectedColors, colorId],
          images: {
            ...prevFormData.images,
            [colorId]: '', // Initialize the image URL for the new color
          },
        };
      } else {
        const { [colorId]: _, ...updatedImages } = prevFormData.images; // Remove the image URL for the deselected color

        return {
          ...prevFormData,
          selectedColors: prevFormData.selectedColors.filter((id) => id !== colorId),
          images: updatedImages,
        };
      }
    });
  };



const handleImageChange = (e, colorId) => {
  const imageURL = e.target.value;

  setFormData((prevFormData) => {
    const updatedImages = {
      ...prevFormData.images,
      [colorId]: imageURL,
    };

    // Remove duplicate image URLs and keep only unique URLs
    const uniqueImages = {};
    for (const color in updatedImages) {
      const url = updatedImages[color];
      if (url && !Object.values(uniqueImages).includes(url)) {
        uniqueImages[color] = url;
      }
    }

    return {
      ...prevFormData,
      images: uniqueImages,
    };
  });
};



  const handleSubmit = (e) => {
    e.preventDefault();
    const { type, name, genre, quantity, price, images } = formData;

    const products = formData.selectedSizes.flatMap((selectedSizeId) =>
      formData.selectedColors.map((selectedColorId) => ({
        type,
        name,
        size: selectedSizeId,
        color: selectedColorId,
        genre,
        quantity,
        price,
        image: images[selectedColorId],
      }))
    );

    // Insert each product into the database
    Promise.all(
      products.map((product) =>
        fetch('http://localhost:3308/api/newproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        })
      )
    )
      .then((responses) => Promise.all(responses.map((response) => response.json())))
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

        <label htmlFor="sizes">Sizes:</label>
        {formData.sizes.map((size) => (
          <div key={size.id_size}>
            <input
              type="checkbox"
              id={`size-${size.id_size}`}
              name="sizes"
              value={size.id_size}
              checked={formData.selectedSizes.includes(size.id_size)}
              onChange={handleSizeChange}
            />
            <label htmlFor={`size-${size.id_size}`}>{size.size}</label>
          </div>
        ))}
        <br />

        <label htmlFor="colors">Colors:</label>
        {formData.colors.map((color) => (
          <div key={color.id_color}>
            <input
              type="checkbox"
              id={`color-${color.id_color}`}
              name="colors"
              value={color.id_color}
              checked={formData.selectedColors.includes(color.id_color)}
              onChange={handleColorChange}
            />
            <label htmlFor={`color-${color.id_color}`}>{color.color}</label>

            {formData.selectedColors.includes(color.id_color) && (
              <input
                type="text"
                id={`image-${color.id_color}`}
                name={`image-${color.id_color}`}
                value={formData.images[color.id_color]}
                onChange={(e) => handleImageChange(e, color.id_color)}
                required
                placeholder="Image URL"
              />
            )}
          </div>
        ))}
        <br />

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

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProductForm;
