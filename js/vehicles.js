import { getVehicles, addVehicle, updateVehicle, deleteVehicle } from './supabase.js';

export async function displayVehicles(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const vehicles = await getVehicles();
    
    if (vehicles.length === 0) {
      container.innerHTML = '<p>No vehicles available.</p>';
      return;
    }

    const table = document.createElement('table');
    table.className = 'data-table';
    
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Capacity</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${vehicles.map(vehicle => `
          <tr>
            <td>${vehicle.name}</td>
            <td>${vehicle.type}</td>
            <td>${vehicle.capacity} passengers</td>
            <td>${vehicle.available ? 'Available' : 'Not Available'}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
  } catch (error) {
    console.error('Error displaying vehicles:', error);
    container.innerHTML = '<p>Error loading vehicles.</p>';
  }
}

export async function displayVehiclesAdmin(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const vehicles = await getVehicles();
    
    const table = document.createElement('table');
    table.className = 'data-table';
    
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Capacity</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${vehicles.map(vehicle => `
          <tr data-id="${vehicle.id}">
            <td>${vehicle.name}</td>
            <td>${vehicle.type}</td>
            <td>${vehicle.capacity} passengers</td>
            <td>${vehicle.available ? 'Available' : 'Not Available'}</td>
            <td>
              <button onclick="editVehicle('${vehicle.id}')" class="btn-edit">Edit</button>
              <button onclick="removeVehicle('${vehicle.id}')" class="btn-delete">Delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
  } catch (error) {
    console.error('Error displaying vehicles:', error);
    container.innerHTML = '<p>Error loading vehicles.</p>';
  }
}

window.editVehicle = function(id) {
  const name = prompt('Enter vehicle name:');
  const type = prompt('Enter vehicle type:');
  const capacity = prompt('Enter capacity:');
  const available = confirm('Is vehicle available?');
  
  if (name && type && capacity) {
    updateVehicle(id, { name, type, capacity: parseInt(capacity), available })
      .then(() => {
        displayVehiclesAdmin('vehicles-container');
      })
      .catch(error => {
        alert('Error updating vehicle: ' + error.message);
      });
  }
};

window.removeVehicle = function(id) {
  if (confirm('Are you sure you want to delete this vehicle?')) {
    deleteVehicle(id)
      .then(() => {
        displayVehiclesAdmin('vehicles-container');
      })
      .catch(error => {
        alert('Error deleting vehicle: ' + error.message);
      });
  }
};