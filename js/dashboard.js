async function loadInitialData() {
  try {
    const response = await fetch('../data/content.json');
    return await response.json();
  } catch (error) {
    return null;
  }
}

async function getStoredAbout() {
  const local = localStorage.getItem('aboutText');
  if (local) return local;

  const data = await loadInitialData();
  return data ? data.aboutText : '';
}

function setStoredAbout(text) {
  localStorage.setItem('aboutText', text);
}

async function getStoredServices() {
  const local = localStorage.getItem('services');
  if (local) return JSON.parse(local);

  const data = await loadInitialData();
  return data ? data.services : [];
}

function setStoredServices(services) {
  localStorage.setItem('services', JSON.stringify(services));
}

const aboutForm = document.getElementById('aboutForm');
const aboutText = document.getElementById('aboutText');
const servicesTableBody = document.getElementById('servicesTableBody');
const serviceForm = document.getElementById('serviceForm');
const serviceIndex = document.getElementById('serviceIndex');
const serviceTitle = document.getElementById('serviceTitle');
const serviceDescription = document.getElementById('serviceDescription');
const serviceImage = document.getElementById('serviceImage');
const serviceModalEl = document.getElementById('serviceModal');
const addServiceButton = document.getElementById('addServiceButton');
let serviceModal = null;

if (serviceModalEl) {
  serviceModal = new bootstrap.Modal(serviceModalEl);
}

async function initAbout() {
  if (!aboutForm || !aboutText) return;
  aboutText.value = await getStoredAbout();

  aboutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    setStoredAbout(aboutText.value);
    alert('Sección Nosotros actualizada correctamente');
  });
}

async function renderServicesTable() {
  if (!servicesTableBody) return;
  const services = await getStoredServices();
  servicesTableBody.innerHTML = '';

  services.forEach((service, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>
        <img src="${service.image}" alt="${service.title}" class="rounded" style="width: 60px; height: 60px; object-fit: cover;">
      </td>
      <td class="fw-bold">${service.title}</td>
      <td>${service.description}</td>
      <td>
        <button type="button" class="btn btn-sm btn-success me-2 mb-1" data-action="edit" data-index="${index}">Editar</button>
        <button type="button" class="btn btn-sm btn-danger mb-1" data-action="delete" data-index="${index}">Eliminar</button>
      </td>
    `;

    servicesTableBody.appendChild(tr);
  });
}

if (servicesTableBody) {
  servicesTableBody.addEventListener('click', async (e) => {
    const button = e.target.closest('button');
    if (!button) return;

    const action = button.dataset.action;
    const index = parseInt(button.dataset.index, 10);
    const services = await getStoredServices();

    if (action === 'edit') {
      const service = services[index];
      serviceIndex.value = index;
      serviceTitle.value = service.title;
      serviceDescription.value = service.description;
      serviceImage.value = service.image;

      if (serviceModal) {
        serviceModal.show();
      }
    }

    if (action === 'delete') {
      if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
        services.splice(index, 1);
        setStoredServices(services);
        renderServicesTable();
      }
    }
  });
}

if (addServiceButton) {
  addServiceButton.addEventListener('click', () => {
    serviceIndex.value = '';
    serviceTitle.value = '';
    serviceDescription.value = '';
    serviceImage.value = '';
  });
}

if (serviceForm) {
  serviceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const services = await getStoredServices();
    const index = serviceIndex.value;

    const newService = {
      title: serviceTitle.value,
      description: serviceDescription.value,
      image: serviceImage.value,
    };

    if (index === '' || index < 0) {
      services.push(newService);
    } else {
      services[index] = newService;
    }

    setStoredServices(services);
    renderServicesTable();

    if (serviceModal) {
      serviceModal.hide();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAbout();
  renderServicesTable();
});
