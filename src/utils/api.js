import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_DEVELOPMENT
    : process.env.REACT_APP_API_URL_PRODUCTION;

export const fetchProperties = async () => {
  try {
    // Fetch properties from the API
    const response = await axios.get(`${API_URL}/api/properties`);

    // Construct the full image URLs in the response
    const propertiesWithFullImageURLs = response.data.map((property) => {
      console.log(property.images);
      if (property.images && Array.isArray(property.images)) {
        const imageArray = property.images.map(image => {
          const fullImageUrl = image.startsWith('http') ? image : `${API_URL}${image.startsWith('/') ? '' : '/'}${image}`;
          console.log('Constructed Image URL:', fullImageUrl);  // Debug: Log constructed image URL
          return fullImageUrl;
        });
        property.images = imageArray;  // Replace the image field with the full URLs
      }
      return property;
    });

    // Return the modified properties data with full image URLs
    return propertiesWithFullImageURLs;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const fetchPropertyById = async (id) => {
  try {
    // Fetch specific property details by ID from the API
    const response = await axios.get(`${API_URL}/api/properties/${id}`);
    const property = response.data;

    // Ensure images is an array even if no images are provided
    if (!property.images) {
      property.images = [];
      console.log('moved herer');
    }

    // Return the property data
    return property;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
};