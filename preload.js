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
      const response = await axios.get('http://localhost:5000/api/familles'); // Adjust the endpoint as needed
      console.log('=======familles=============================');
      console.log(response.data);
      console.log('====================================');
      return response.data; // Returns famille data from the API
    } catch (error) {
      console.error('Error fetching familles:', error);
      return null; // Return null if fetching fails
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
  

//   addFamille: async (familleData) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/familles/add', familleData);
//       console.log('Added famille:', response.data);
//       return response.data; // Returns the added famille data
//     } catch (error) {
//       console.error('Error adding famille:', error);
//       return null; // Return null if adding fails
//     }
//   },

//   updateFamille: async (id, familleData) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/familles/update/${id}`, familleData);
//       console.log('Updated famille:', response.data);
//       return response.data; // Returns the updated famille data
//     } catch (error) {
//       console.error('Error updating famille:', error);
//       return null; // Return null if updating fails
//     }
//   },

//   deleteFamille: async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/familles/delete/${id}`);
//       console.log(`Famille with ID ${id} deleted successfully.`);
//       return true; // Indicates successful deletion
//     } catch (error) {
//       console.error('Error deleting famille:', error);
//       return false; // Indicates deletion failure
//     }
//   },
// //marques*
// fetchMarques: async () => {
//   try {
//     const response = await axios.get('http://localhost:5000/api/marques'); // Adjust the endpoint as needed

//     return response.data; // Returns famille data from the API
//   } catch (error) {
//     console.error('Error fetching marques:', error);
//     return null; // Return null if fetching fails
//   }
// },
});
