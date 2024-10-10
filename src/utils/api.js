// src/utils/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);

export const fetchProperties = async () => {
  try {
    // 使用环境变量中的 API URL
    const response = await axios.get(`${API_URL}/api/properties`);
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};
