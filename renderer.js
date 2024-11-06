// renderer.js
window.onload = () => {
  fetchUsers();
  fetchFamilles();
  fetchMarques();
  fetchLoggedInUser();
};
//users

async function fetchUsers() {
  const users = await window.api.fetchUsers(); // Call the fetchUsers function from preload
  if (users) {
    displayUsers(users); // Pass users data to display function
  } else {
    console.error('Failed to load users.'); // Log error if fetching fails
  }
}

function displayUsers(users) {
  const table = document.getElementById('usersTable'); // Ensure you have a table in your HTML with this ID

  // Check if the table is found
  if (!table) {
    console.error('Table element not found!');
    return; // Exit if the table is not found
  }

  users.forEach(user => {
    const row = table.insertRow();
    console.log(user.profileImage); // Make sure this is a valid URL

    // Column for user profile image and name/email details
    const userCell = row.insertCell();
    userCell.innerHTML = `
      <div class="d-flex px-2 py-1">
        <div>
          <img 
            src="${user.profileImage}" 
            class="me-3" 
            alt="${user.nom}" 
            style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;">
        </div>
      </div>
    `;

    // Column for user name
    const jobCell1 = row.insertCell();
    jobCell1.innerHTML = `
      <div class="d-flex flex-column justify-content-center">
        <h6 class="mb-0 text-sm text-secondary">${user.nom} ${user.prenom}</h6>
      </div>
    `;

    // Column for user email
    const jobCell = row.insertCell();
    jobCell.innerHTML = `
      <h6 class="text-xs text-secondary">${user.email}</h6>
    `;

    // Column for status
    const statusCell = row.insertCell();
    const badgeClass = user.cin ? 'bg-gradient-secondary' : 'bg-gradient-secondary';
    statusCell.className = "align-middle text-center text-sm";
    statusCell.innerHTML = `<span style="margin-right: 10px;" class="badge badge-sm ${badgeClass}">${user.cin}</span>`;

    // Column for address
    const dateCell = row.insertCell();
    dateCell.className = "align-middle text-center";
    dateCell.innerHTML = `<span class="text-secondary text-xs font-weight-bold">${user.adresse || 'N/A'}</span>`;

    // Column for city
    const dateCell2 = row.insertCell();
    dateCell2.className = "align-middle text-center";
    dateCell2.innerHTML = `<span class="text-secondary text-xs font-weight-bold">${user.ville || 'N/A'}</span>`;

    // Column for phone 1
    const dateCelltel1 = row.insertCell();
    dateCelltel1.className = "align-middle text-center";
    dateCelltel1.innerHTML = `<span class="text-secondary text-xs font-weight-bold">${user.tel1 || 'N/A'}</span>`;

    // Column for phone 2
    const dateCelltel2 = row.insertCell();
    dateCelltel2.className = "align-middle text-center";
    dateCelltel2.innerHTML = `<span class="text-secondary text-xs font-weight-bold">${user.tel2 || 'N/A'}</span>`;
  });
}





//ADD famille ================== START 
const addFamilleBtn = document.getElementById('addFamilleBtn');
if (addFamilleBtn) {
  addFamilleBtn.addEventListener('click', function () {
    const form = document.getElementById('addFamilleForm');
    if (form) {
      form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
  });
}

// Check if the familleForm exists and add submit event listener
const familleForm = document.getElementById('familleForm');
if (familleForm) {
  familleForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Gather input values
    const code = document.getElementById('code').value;
    const libelle = document.getElementById('libelle').value;
    const designation = document.getElementById('designation').value;

    // Create a new famille object
    const newFamille = {
      code: code,
      libelle: libelle,
      designation: designation
    };

    // Send a POST request to the backend to save the new famille
    try {
      const response = await fetch('http://localhost:5000/api/familles/add', { // Update the URL to match your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFamille)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Add the new famille to the table
      addFamilleToTable(data);

      // Clear the form inputs
      familleForm.reset();
      document.getElementById('addFamilleForm').style.display = 'none';

      window.location.reload();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  });
}

// Check if the cancel button exists and add click event listener
const cancelBtn = document.getElementById('cancelBtn');
if (cancelBtn) {
  cancelBtn.addEventListener('click', function () {
    const form = document.getElementById('addFamilleForm');
    if (form) {
      form.style.display = 'none';
    }
  });
}

//ADD famille ================== END

// Display Familles in the table ==========START
function displayFamilles(familles) {
  const table = document.getElementById('famillesTable');
  const tbody = table.querySelector('tbody') || table.createTBody();
  tbody.innerHTML = ''; // Clear existing rows

  familles.forEach(famille => {
    const row = tbody.insertRow();

    const codeCell = row.insertCell();


    codeCell.innerHTML = `<span style="padding-right: 5px; margin-left: 20px; text-align: right;" class="text-secondary text-xs font-weight-bold">${famille.code}</span>`;

    const libelleCell = row.insertCell();
    libelleCell.innerHTML = `<span style="padding-right: 5px; margin-left: 20px;  text-align: right;" class="text-secondary text-xs font-weight-bold">${famille.libelle}</span>`;

    const designationCell = row.insertCell();
    designationCell.innerHTML = `<span style="padding-right: 5px; margin-left: 20px; text-align: right;" class="text-secondary text-xs font-weight-bold">${famille.designation}</span>`;

    const actionCell = row.insertCell();
    actionCell.innerHTML = `
      <button onclick="editFamille('${famille.id}')" style="border: none; background: none; cursor: pointer;">
        <i class="fas fa-edit" style="color: #6a53d2 ; margin-left: 12px;"></i> 
      </button>
      <button onclick="deleteFamille('${famille.id}')" style="border: none; background: none; cursor: pointer;">
        <i class="fas fa-trash" style="color: #dc3545; margin-right: 5px;"></i> 
      </button>
    `;
  });
}


// Call fetchFamilles on page load to populate the table
document.addEventListener('DOMContentLoaded', fetchFamilles);

// Function to add new famille to the table (existing code)
function addFamilleToTable(famille) {
  const table = document.getElementById('famillesTable').getElementsByTagName('tbody')[0];

  // Create a new row
  const newRow = table.insertRow();

  // Insert cells for each property
  const codeCell = newRow.insertCell(0);
  const libelleCell = newRow.insertCell(1);
  const designationCell = newRow.insertCell(2);

  // Set cell values
  codeCell.textContent = famille.code;
  libelleCell.textContent = famille.libelle;
  designationCell.textContent = famille.designation;

  // Column for edit and delete buttons
  const actionCell = newRow.insertCell(3);
  actionCell.innerHTML = `
    <button onclick="editFamille('${famille.id}')" style="border: none; background: none; cursor: pointer;">
      <i class="fas fa-edit" style="color: #007bff; margin-right: 5px;"></i> 
    </button>
    <button onclick="deleteFamille('${famille.id}')" style="border: none; background: none; cursor: pointer;">
      <i class="fas fa-trash" style="color: #dc3545; margin-right: 5px;"></i> 
    </button>
  `;
}


async function editFamille(familleId) {
  try {
    // Fetch the famille data from the server using a GET request
    const response = await fetch(`http://localhost:5000/api/familles/find/${familleId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }); // Use GET to fetch data

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const familleData = await response.json();

    // Check if familleData contains the expected fields
    console.log(familleData); // Log the data for debugging

    // Populate the form fields with existing famille data
    document.getElementById('code').value = familleData.code || ''; // Provide default values if undefined
    document.getElementById('libelle').value = familleData.libelle || '';
    document.getElementById('designation').value = familleData.designation || '';

    // Show the form to allow editing
    const form = document.getElementById('addFamilleForm');
    if (form) {
      form.style.display = 'block';
    }

    // Optional: Change the button action to update instead of add
    const familleForm = document.getElementById('familleForm');
    familleForm.onsubmit = async function (event) {
      event.preventDefault();

      // Gather input values for update
      const updatedFamille = {
        code: document.getElementById('code').value,
        libelle: document.getElementById('libelle').value,
        designation: document.getElementById('designation').value,
      };

      // Send a PUT request to update the famille
      try {
        const updateResponse = await fetch(`http://localhost:5000/api/familles/update/${familleId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFamille)
        });

        if (!updateResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const updatedData = await updateResponse.json();

        // Update the table with new famille data
        updateFamilleInTable(updatedData);

        // Clear and hide the form
        familleForm.reset();
        form.style.display = 'none';
        window.location.reload();

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  } catch (error) {
    console.error('Error fetching famille data:', error);
  }
}


// Function to update the famille in the table
function updateFamilleInTable(updatedFamille) {
  const rows = document.querySelectorAll('#famillesTable tbody tr');
  rows.forEach(row => {
    const codeCell = row.cells[0].innerText; // Assuming code is in the first cell
    if (codeCell === updatedFamille.code) {
      row.cells[0].innerText = updatedFamille.code;
      row.cells[1].innerText = updatedFamille.libelle;
      row.cells[2].innerText = updatedFamille.designation;
    }
  });
}


async function deleteFamille(familleId) {
  try {
    console.log(`Deleting famille with ID: ${familleId}`); // Debug: Log familleId being deleted

    const response = await fetch(`http://localhost:5000/api/familles/delete/${familleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Response Status:', response.status); // Debug: Log response status
    const responseData = await response.json();
    console.log('Response Data:', responseData); // Debug: Log response data

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Remove the deleted famille from the table
    removeFamilleFromTable(familleId);
    window.location.reload();

  } catch (error) {
    console.error('Error deleting famille:', error);
  }
}

// Function to remove the deleted famille from the table
function removeFamilleFromTable(familleId) {
  const table = document.getElementById('famillesTable').getElementsByTagName('tbody')[0];
  const rows = Array.from(table.rows);

  // Loop through rows to find the one matching the deleted famille ID
  rows.forEach(row => {
    // Check if the edit/delete button contains the familleId
    const deleteButton = row.querySelector(`button[onclick*="${familleId}"]`);
    if (deleteButton) {
      table.deleteRow(row.rowIndex - 1); // Remove the row from the table
    }
  });
  window.location.reload();

}


// Function to remove famille from the table (optional if you want to avoid page reload)
function removeFamilleFromTable(familleId) {
  const rows = document.querySelectorAll('#famillesTable tbody tr');
  rows.forEach(row => {
    const codeCell = row.cells[0].innerText; // Assuming the code or id is in the first cell
    if (codeCell === familleId) {
      row.remove();
    }
  });
}


//Fetch Marques

// Fetch all Marques
async function fetchMarques() {
  const marques = await window.api.fetchMarques(); // Call the fetchMarques function from preload
  if (marques) {
    displayMarques(marques); // Pass marques data to display function
  } else {
    console.error('Failed to load marques.'); // Log error if fetching fails
  }
}

// Call fetchMarques on page load to populate the table
document.addEventListener('DOMContentLoaded', fetchMarques);


//Add Marque
// Add Marque ================== START 
const addMarqueBtn = document.getElementById('addMarqueBtn');
if (addMarqueBtn) {
  addMarqueBtn.addEventListener('click', function () {
    const form = document.getElementById('addMarqueForm');
    if (form) {
      form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
  });
}

// Check if the marqueForm exists and add submit event listener
const marqueForm = document.getElementById('marqueForm');
if (marqueForm) {
  marqueForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Gather input values
    const code = document.getElementById('code').value;
    const libelle = document.getElementById('libelle').value;
    const designation = document.getElementById('designation').value;

    // Create a new marque object
    const newMarque = {
      code: code,
      libelle: libelle,
      designation: designation
    };

    // Send a POST request to the backend to save the new marque
    try {
      const response = await fetch('http://localhost:5000/api/marques/add', { // Update the URL to match your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMarque)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Add the new marque to the table
      addMarqueToTable(data);

      // Clear the form inputs
      marqueForm.reset();
      document.getElementById('addMarqueForm').style.display = 'none';

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  });
}

// Check if the cancel button exists and add click event listener
const cancelBtnn = document.getElementById('cancelBtn');
if (cancelBtnn) {
  cancelBtnn.addEventListener('click', function () {
    const form = document.getElementById('addMarqueForm');
    if (form) {
      form.style.display = 'none';
    }
  });
}

// Add Marque ================== END
// Display Marques in the table ==========START
function displayMarques(marques) {
  const table = document.getElementById('marquesTable');
  const tbody = table.querySelector('tbody') || table.createTBody();
  tbody.innerHTML = ''; // Clear existing rows

  if (marques.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center">No marques available</td></tr>'; // Show a message if no data
  }

  marques.forEach(marque => {
    const row = tbody.insertRow();

    const codeCell = row.insertCell();
    codeCell.innerHTML = `<span class="text-secondary text-xs font-weight-bold" style="padding-left: 20px;">${marque.code}</span>`;

    const libelleCell = row.insertCell();
    libelleCell.innerHTML = `<span class="text-secondary text-xs font-weight-bold" style="padding-left: 20px;">${marque.libelle}</span>`;

    const designationCell = row.insertCell();
    designationCell.innerHTML = `<span class="text-secondary text-xs font-weight-bold" style="padding-left: 20px;">${marque.designation}</span>`;

    const actionCell = row.insertCell();
    actionCell.innerHTML = `
          <button onclick="editMarque('${marque.id}')" style="border: none; background: none; cursor: pointer;">
              <i class="fas fa-edit" style="color: #6a53d2;"></i>
          </button>
          <button onclick="deleteMarque('${marque.id}')" style="border: none; background: none; cursor: pointer;">
              <i class="fas fa-trash" style="color: #e74c3c;"></i>
          </button>
      `;
  });
}

// ==========END
async function editMarque(marqueId) {
  try {
    // Fetch the marque data from the server
    const response = await fetch(`http://localhost:5000/api/marques/find/${marqueId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const marqueData = await response.json();
    console.log(marqueData); // Log the data for debugging

    // Populate the form fields with existing marque data
    document.getElementById('code').value = marqueData.code || '';
    document.getElementById('libelle').value = marqueData.libelle || '';
    document.getElementById('designation').value = marqueData.designation || '';

    // Show the form to allow editing
    const form = document.getElementById('addMarqueForm');
    if (form) {
      form.style.display = 'block';
    }

    // Change the button action to update instead of add
    const marqueForm = document.getElementById('marqueForm');
    marqueForm.onsubmit = async function (event) {
      event.preventDefault();

      // Gather input values for update
      const updatedMarque = {
        code: document.getElementById('code').value,
        libelle: document.getElementById('libelle').value,
        designation: document.getElementById('designation').value,
      };

      // Send a PUT request to update the marque
      try {
        const updateResponse = await fetch(`http://localhost:5000/api/marques/update/${marqueId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedMarque)
        });

        if (!updateResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const updatedData = await updateResponse.json();

        // Update the table with new marque data
        updateMarqueInTable(updatedData);

        // Clear and hide the form
        marqueForm.reset();
        form.style.display = 'none';
        window.location.reload(); // Reload the page to see the updated list

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  } catch (error) {
    console.error('Error fetching marque data:', error);
  }
}

// Function to update the marque in the table
function updateMarqueInTable(updatedMarque) {
  const rows = document.querySelectorAll('#marquesTable tbody tr');
  rows.forEach(row => {
    const codeCell = row.cells[0].innerText; // Assuming code is in the first cell
    if (codeCell === updatedMarque.code) {
      row.cells[0].innerText = updatedMarque.code;
      row.cells[1].innerText = updatedMarque.libelle;
      row.cells[2].innerText = updatedMarque.designation;
    }
  });
}
async function deleteMarque(marqueId) {
  try {
    console.log(`Deleting marque with ID: ${marqueId}`); // Debug: Log marqueId being deleted

    const response = await fetch(`http://localhost:5000/api/marques/delete/${marqueId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Response Status:', response.status); // Debug: Log response status
    const responseData = await response.json();
    console.log('Response Data:', responseData); // Debug: Log response data

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Remove the deleted marque from the table
    removeMarqueFromTable(marqueId);
    window.location.reload(); // Reload to refresh the list

  } catch (error) {
    console.error('Error deleting marque:', error);
  }
}

// Function to remove the deleted marque from the table
function removeMarqueFromTable(marqueId) {
  const table = document.getElementById('marquesTable').getElementsByTagName('tbody')[0];
  const rows = Array.from(table.rows);

  // Loop through rows to find the one matching the deleted marque ID
  rows.forEach(row => {
    const deleteButton = row.querySelector(`button[onclick*="${marqueId}"]`);
    if (deleteButton) {
      table.deleteRow(row.rowIndex - 1); // Remove the row from the table
    }
  });
}
//articles

// Fetch Articles

// Fetch Articles
async function fetchArticles() {
  const articles = await window.api.fetchArticles(); // Call the fetchArticles function from preload
  if (articles) {
    displayArticles(articles); // Pass articles data to display function
  } else {
    console.error('Failed to load articles.'); // Log error if fetching fails
  }
}

// Call fetchArticles on page load to populate the table
document.addEventListener('DOMContentLoaded', async () => {
  await fetchArticles(); // Fetch articles on page load
  await fetchFamillesAndMarques(); // Fetch dropdown data on page load
});

// Check if the articleForm exists and add submit event listener
const articleForm = document.getElementById('articleForm');
if (articleForm) {
  // Submit event listener for adding a new article
  articleForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Gather input values
    const codeABar = document.getElementById('codeABar').value;
    const designation = document.getElementById('designation').value;
    const prixDeVenteTTC = parseFloat(document.getElementById('prixDeVenteTTC').value);
    const familleId = parseInt(document.getElementById('familleId').value, 10);
    const marqueId = parseInt(document.getElementById('marqueId').value, 10);
    const Image = document.getElementById('Image').files[0]; // Get the selected image file

    console.log('codeABar:', codeABar);
    console.log('designation:', designation);
    console.log('prixDeVenteTTC:', prixDeVenteTTC);
    console.log('familleId:', familleId);
    console.log('marqueId:', marqueId);
    console.log('Image:', Image);

    // Create a new FormData object
    const formData = new FormData();
    formData.append('codeABar', codeABar);
    formData.append('designation', designation);
    formData.append('prixDeVenteTTC', prixDeVenteTTC);
    formData.append('familleId', familleId);
    formData.append('marqueId', marqueId);

    if (Image) {
      formData.append('Image', Image); // Append the image file
    }

    // Send a POST request to the backend to save the new article
    try {
      const response = await fetch('http://localhost:5000/api/articles/add', {
        method: 'POST',
        body: formData // Send the FormData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Clear the form inputs
      articleForm.reset();
      document.getElementById('addArticleForm').style.display = 'none';

      // Fetch articles after successfully adding
      await fetchArticles(); // Fetch articles here

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  });

}

// Function to fetch familles and marques
// Fetch familles and marques from the backend
async function fetchFamillesAndMarques() {
  try {
    const [famillesResponse, marquesResponse] = await Promise.all([
      fetch('http://localhost:5000/api/familles'), // Update the endpoint as needed
      fetch('http://localhost:5000/api/marques'), // Update the endpoint as needed
    ]);

    const familles = await famillesResponse.json();
    const marques = await marquesResponse.json();

    populateFamilleDropdown(familles);
    populateMarqueDropdown(marques);
  } catch (error) {
    console.error('Error fetching familles or marques:', error);
  }
}

// Populate the Famille dropdown
function populateFamilleDropdown(familles) {
  const familleSelect = document.getElementById('familleId');
  familles.forEach(famille => {
    const option = document.createElement('option');
    option.value = famille.id; // Assuming each famille has an id
    option.textContent = famille.libelle; // Assuming each famille has a name
    familleSelect.appendChild(option);
  });
}

// Populate the Marque dropdown
function populateMarqueDropdown(marques) {
  const marqueSelect = document.getElementById('marqueId');
  marques.forEach(marque => {
    const option = document.createElement('option');
    option.value = marque.id; // Assuming each marque has an id
    option.textContent = marque.libelle; // Assuming each marque has a name
    marqueSelect.appendChild(option);
  });
}

// Call this function on page load to populate the dropdowns
document.addEventListener('DOMContentLoaded', async () => {
  await fetchArticles();
  await fetchFamillesAndMarques();
});


// Update the event listener for the addArticleBtn
if (addArticleBtn) {
  addArticleBtn.addEventListener('click', function () {
    const form = document.getElementById('addArticleForm');
    if (form) {
      form.style.display = form.style.display === 'none' ? 'block' : 'none';
      fetchFamillesAndMarques(); // Fetch options when the form is displayed

    }
  });
}



// Check if the cancel button exists and add click event listener
const cancelBtna = document.getElementById('cancelBtn');
if (cancelBtna) {
  cancelBtna.addEventListener('click', function () {
    const form = document.getElementById('addArticleForm');
    if (form) {
      form.style.display = 'none';
    }
  });
}

// Display Articles in the table ==========START
function displayArticles(articles) {
  const table = document.getElementById('articlesTable');
  const tbody = table.querySelector('tbody') || table.createTBody();
  tbody.innerHTML = ''; // Clear existing rows

  articles.forEach(article => {
    const row = tbody.insertRow();
    // Code à bar cell
    const imageCell = row.insertCell();
    if (article.Image) {
      imageCell.innerHTML = `<img src="${article.Image}" alt="${article.designation}" style="width: 50px; height: auto;">`;
    } else {
      // Optional: Display a placeholder image or a message if the image is null
      imageCell.innerHTML = '<span>No image available</span>'; // or set a default placeholder image
    }

    // Code à bar cell
    const codeCell = row.insertCell();
    codeCell.innerHTML = `<span class="text-secondary text-xs font-weight-bold" style="padding-left: 20px;">${article.codeABar}</span>`;

    // Designation cell
    const designationCell = row.insertCell();
    designationCell.innerHTML = `<span class="text-secondary text-xs font-weight-bold" style="padding-left: 20px;">${article.designation}</span>`;

    // Prix de Vente TTC cell
    const prixCell = row.insertCell();
    prixCell.innerHTML = `<span class="text-secondary text-xs font-weight-bold" style="padding-left: 20px;">${article.prixDeVenteTTC}</span>`;

    // Famille cell
    const familleCell = row.insertCell();
    familleCell.innerHTML = `<span class="text-secondary text-xs font-weight-bold" style="padding-left: 20px;">${article.famille ? article.famille.libelle : 'N/A'}</span>`; // Ensure famille has a name field

    // Marque cell
    const marqueCell = row.insertCell();
    marqueCell.innerHTML = `<span class="text-secondary text-xs font-weight-bold " style="padding-left: 20px;">${article.marque ? article.marque.libelle : 'N/A'}</span>`; // Ensure marque has a name field

    // Action buttons cell
    const actionCell = row.insertCell();
    actionCell.innerHTML = `
        <button onclick="editArticle('${article.id}')" style="border: none; background: none; cursor: pointer;">
          <i class="fas fa-edit" style="color: #6a53d2; margin-left: 12px;"></i> 
        </button>
        <button onclick="deleteArticle('${article.id}')" style="border: none; background: none; cursor: pointer;">
          <i class="fas fa-trash" style="color: #e74c3c; margin-left: 12px;"></i>
        </button>
      `;
  });
}


// Edit Article Function
// Edit Article Function
async function editArticle(articleId) {
  try {
    const response = await fetch(`http://localhost:5000/api/articles/find/${articleId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const articleData = await response.json();

    // Populate the form fields with existing article data
    document.getElementById('codeABar').value = articleData.codeABar || '';
    document.getElementById('designation').value = articleData.designation || '';
    document.getElementById('prixDeVenteTTC').value = articleData.prixDeVenteTTC || '';
    document.getElementById('familleId').value = articleData.familleId || '';
    document.getElementById('marqueId').value = articleData.marqueId || '';

    const form = document.getElementById('addArticleForm');
    if (form) {
      form.style.display = 'block';
    }

    const articleForm = document.getElementById('articleForm');
    articleForm.onsubmit = async function (event) {
      event.preventDefault();

      const updatedArticle = new FormData(); // Use FormData for updating as well
      updatedArticle.append('codeABar', document.getElementById('codeABar').value);
      updatedArticle.append('designation', document.getElementById('designation').value);
      updatedArticle.append('prixDeVenteTTC', parseFloat(document.getElementById('prixDeVenteTTC').value));
      updatedArticle.append('familleId', parseInt(document.getElementById('familleId').value, 10));
      updatedArticle.append('marqueId', parseInt(document.getElementById('marqueId').value, 10));

      const imageFile = document.getElementById('image').files[0]; // Get the selected image file
      if (imageFile) {
        updatedArticle.append('image', imageFile); // Append the image file
      }

      try {
        const updateResponse = await fetch(`http://localhost:5000/api/articles/update/${articleId}`, {
          method: 'PUT',
          body: updatedArticle // Send the FormData for update
        });

        if (!updateResponse.ok) {
          throw new Error('Failed to update article');
        }

        await fetchArticles(); // Refresh articles after updating

        // Clear the form inputs
        articleForm.reset();
        form.style.display = 'none'; // Hide form after submission

      } catch (error) {
        console.error('Error updating article:', error);
      }
    };

  } catch (error) {
    console.error('Error fetching article for editing:', error);
  }
}

// Function to update the article in the table
function updateArticleInTable(updatedArticle) {
  const rows = document.querySelectorAll('#articlesTable tbody tr');
  rows.forEach(row => {
    const codeCell = row.cells[0].innerText;

    // Identify the correct row based on the codeABar
    if (codeCell === updatedArticle.codeABar) {
      row.cells[0].innerText = updatedArticle.codeABar;
      row.cells[1].innerText = updatedArticle.designation;
      row.cells[2].innerText = updatedArticle.prixDeVenteTTC;
      row.cells[3].innerText = updatedArticle.familleId;
      row.cells[4].innerText = updatedArticle.marqueId;

      // Update the image if a new one is provided
      if (updatedArticle.Image) {
        const imageCell = row.cells[5]; // Assuming the image is in the 6th column
        const imgElement = imageCell.querySelector('img');
        
        if (imgElement) {
          imgElement.src = updatedArticle.Image; // Update the src with the new image URL
          imgElement.alt = updatedArticle.designation; // Update alt text as well
        } else {
          // If there's no img element, create one
          imageCell.innerHTML = `<img src="${updatedArticle.Image}" alt="${updatedArticle.designation}" style="width: 50px; height: auto;">`;
        }
      }
    }
  });
}



async function deleteArticle(articleId) {
  try {
    const response = await fetch(`http://localhost:5000/api/articles/delete/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    removeArticleFromTable(articleId);
    window.location.reload();

  } catch (error) {
    console.error('Error deleting article:', error);
  }
}

// Function to remove the deleted article from the table
function removeArticleFromTable(articleId) {
  const table = document.getElementById('articlesTable').getElementsByTagName('tbody')[0];
  const rows = Array.from(table.rows);

  rows.forEach(row => {
    const deleteButton = row.querySelector(`button[onclick*="${articleId}"]`);
    if (deleteButton) {
      table.deleteRow(row.rowIndex - 1);
    }
  });
}
