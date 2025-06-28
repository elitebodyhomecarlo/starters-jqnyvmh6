import { getRoutes, addRoute, updateRoute, deleteRoute } from './supabase.js';

export async function displayRoutes(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const routes = await getRoutes();
    
    if (routes.length === 0) {
      container.innerHTML = '<p>No routes available.</p>';
      return;
    }

    const table = document.createElement('table');
    table.className = 'data-table';
    
    table.innerHTML = `
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Distance</th>
          <th>Time</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        ${routes.map(route => `
          <tr>
            <td>${route.title}</td>
            <td>${route.description}</td>
            <td>${route.distance}</td>
            <td>${route.time}</td>
            <td>$${parseFloat(route.price).toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
  } catch (error) {
    console.error('Error displaying routes:', error);
    container.innerHTML = '<p>Error loading routes.</p>';
  }
}

export async function displayRoutesAdmin(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const routes = await getRoutes();
    
    const table = document.createElement('table');
    table.className = 'data-table';
    
    table.innerHTML = `
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Distance</th>
          <th>Time</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${routes.map(route => `
          <tr data-id="${route.id}">
            <td>${route.title}</td>
            <td>${route.description}</td>
            <td>${route.distance}</td>
            <td>${route.time}</td>
            <td>$${parseFloat(route.price).toFixed(2)}</td>
            <td>
              <button onclick="editRoute('${route.id}')" class="btn-edit">Edit</button>
              <button onclick="removeRoute('${route.id}')" class="btn-delete">Delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
  } catch (error) {
    console.error('Error displaying routes:', error);
    container.innerHTML = '<p>Error loading routes.</p>';
  }
}

window.editRoute = function(id) {
  // Simple edit functionality - you can enhance this
  const title = prompt('Enter new title:');
  const description = prompt('Enter new description:');
  const distance = prompt('Enter new distance:');
  const time = prompt('Enter new time:');
  const price = prompt('Enter new price:');
  
  if (title && description && distance && time && price) {
    updateRoute(id, { title, description, distance, time, price: parseFloat(price) })
      .then(() => {
        displayRoutesAdmin('routes-container');
      })
      .catch(error => {
        alert('Error updating route: ' + error.message);
      });
  }
};

window.removeRoute = function(id) {
  if (confirm('Are you sure you want to delete this route?')) {
    deleteRoute(id)
      .then(() => {
        displayRoutesAdmin('routes-container');
      })
      .catch(error => {
        alert('Error deleting route: ' + error.message);
      });
  }
};