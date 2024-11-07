// preload.js
const { contextBridge } = require('electron');
const axios = require('axios');

contextBridge.exposeInMainWorld('api', {
  test: () => console.log('Preload script loaded successfully'),

  fetchUsers: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      console.log('=======users=============================');
      console.log(response.data);
      console.log('====================================');
      return response.data; // Returns user data from the API
      
    } catch (error) {
      console.error('Error fetching users:', error);
      return null; // Return null if fetching fails
    }
  },


  //Familles
  fetchFamilles: async () => {
    try {
      // Fetch the famille data from the backend API
      const response = await axios.get('http://localhost:5000/api/familles'); // Adjust the endpoint if necessary
      console.log('=======familles=============================');
      console.log(response.data);  // Check the structure of the response data
      console.log('====================================');
      return response.data; // Return famille data from the API
    } catch (error) {
      console.error('Error fetching familles:', error);
      return null;  // Return null if fetching fails
    }
  },
  

  fetchArticles: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/articles'); // Adjust the endpoint as needed
      console.log('=======articles=============================');
      console.log(response.data);
      console.log('====================================');
      return response.data; // Returns article data from the API
    } catch (error) {
      console.error('Error fetching articles:', error);
      return null; // Return null if fetching fails
    }
  },
  
// //marques*
fetchMarques: async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/marques'); // Adjust the endpoint as needed

    return response.data; // Returns famille data from the API
  } catch (error) {
    console.error('Error fetching marques:', error);
    return null; // Return null if fetching fails
  }
},
// Function to fetch user data




});
