// renderer.js
window.onload = () => {
  fetchUsers();
  fetchFamilles();
  fetchMarques();
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


        </div>
    `;
    // Column for job title and organization
    const jobCell1 = row.insertCell();
    jobCell1.innerHTML = `
             <div class="d-flex flex-column  justify-content-cente ">
                <h6 class="mb-0 text-sm text-secondary  ">${user.nom} ${user.prenom}</h6>
            </div>`
    const jobCell = row.insertCell();
    jobCell.innerHTML = `
                       <h6 class="text-xs text-secondary ">${user.email}</h6>

    `;

    // Column for status
    const statusCell = row.insertCell();
    const badgeClass = user.cin ? 'bg-gradient-secondary' : 'bg-gradient-secondary';
    statusCell.className = "align-middle text-center text-sm";
    statusCell.innerHTML = `<span  style=" margin-right: 10px;  " class="badge badge-sm ${badgeClass}">${user.cin}</span>`;

    // Column for joining date
    const dateCell = row.insertCell();
    dateCell.className = "align-middle text-center";
    dateCell.innerHTML = `<span class="text-secondary text-xs font-weight-bold">${user.adresse || 'N/A'}</span>`;
    const dateCell2 = row.insertCell();
    dateCell2.className = "align-middle text-center";
    dateCell2.innerHTML = `<span class="text-secondary text-xs font-weight-bold">${user.ville || 'N/A'}</span>`;

    const dateCelltel1 = row.insertCell();
    dateCelltel1.className = "align-middle text-center";
    dateCelltel1.innerHTML = `<span class="text-secondary text-xs font-weight-bold">${user.tel1 || 'N/A'}</span>`;

    const dateCelltel2 = row.insertCell();
    dateCelltel2.className = "align-middle text-center";
    dateCelltel2.innerHTML = `<span class="text-secondary text-xs font-weight-bold">${user.tel2 || 'N/A'}</span>`;
    // Column for edit link

  });

}


//Familles

async function fetchFamilles() {
  const familles = await window.api.fetchFamilles(); // Call the fetchFamilles function from preload
  if (familles) {
    displayFamilles(familles); // Pass familles data to display function
  } else {
    console.error('Failed to load familles.'); // Log error if fetching fails
  }
}



//ADD famille ================== START 
const addFamilleBtn = document.getElementById('addFamilleBtn');
if (addFamilleBtn) {
  addFamilleBtn.addEventListener('click', function() {
    const form = document.getElementById('addFamilleForm');
    if (form) {
      form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
  });
}

// Check if the familleForm exists and add submit event listener
const familleForm = document.getElementById('familleForm');
if (familleForm) {
  familleForm.addEventListener('submit', async function(event) {
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
  cancelBtn.addEventListener('click', function() {
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
      }    }); // Use GET to fetch data

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
    familleForm.onsubmit = async function(event) {
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
  addMarqueBtn.addEventListener('click', function() {
    const form = document.getElementById('addMarqueForm');
    if (form) {
      form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
  });
}

// Check if the marqueForm exists and add submit event listener
const marqueForm = document.getElementById('marqueForm');
if (marqueForm) {
  marqueForm.addEventListener('submit', async function(event) {
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
  cancelBtnn.addEventListener('click', function() {
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

  marques.forEach(marque => {
    const row = tbody.insertRow();

    const codeCell = row.insertCell();
    codeCell.innerHTML = `<span style="padding-right: 5px; margin-left: 20px; text-align: right;" class="text-secondary text-xs font-weight-bold">${marque.code}</span>`;
    
    const libelleCell = row.insertCell();
    libelleCell.innerHTML = `<span style="padding-right: 5px; margin-left: 20px; text-align: right;" class="text-secondary text-xs font-weight-bold">${marque.libelle}</span>`;

    const designationCell = row.insertCell();
    designationCell.innerHTML = `<span style="padding-right: 5px; margin-left: 20px; text-align: right;" class="text-secondary text-xs font-weight-bold">${marque.designation}</span>`;

    const actionCell = row.insertCell();
    actionCell.innerHTML = `
      <button onclick="editMarque('${marque.id}')" style="border: none; background: none; cursor: pointer;">
        <i class="fas fa-edit" style="color: #6a53d2; margin-left: 12px;"></i> 
      </button>
      <button onclick="deleteMarque('${marque.id}')" style="border: none; background: none; cursor: pointer;">
        <i class="fas fa-trash" style="color: #e74c3c; margin-left: 12px;"></i>
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
    marqueForm.onsubmit = async function(event) {
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
