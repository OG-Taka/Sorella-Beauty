async function loadInitialData() {
  try {
    const response = await fetch('./data/content.json');
    return await response.json();
  } catch (error) {
    return null;
  }
}

async function loadInitialAppointments() {
  try {
    const response = await fetch('./data/appointments.json');
    const data = await response.json();
    return data.appointments || [];
  } catch (error) {
    return [];
  }
}

async function getStoredAppointments() {
  const local = localStorage.getItem('appointments');
  if (local) return JSON.parse(local);
  return await loadInitialAppointments();
}

function setStoredAppointments(appointments) {
  localStorage.setItem('appointments', JSON.stringify(appointments));
}

async function renderAboutSection() {
  const aboutElement = document.getElementById('aboutTextContent');
  if (!aboutElement) return;

  const localAbout = localStorage.getItem('aboutText');
  if (localAbout) {
    aboutElement.textContent = localAbout;
    return;
  }

  const data = await loadInitialData();
  if (data) {
    aboutElement.textContent = data.aboutText;
  }
}

async function renderServicesSection() {
  const servicesContainer = document.getElementById('servicesContainer');
  if (!servicesContainer) return;

  let services = [];
  const localServices = localStorage.getItem('services');

  if (localServices) {
    services = JSON.parse(localServices);
  } else {
    const data = await loadInitialData();
    services = data ? data.services : [];
  }

  servicesContainer.innerHTML = '';

  services.forEach((service) => {
    const col = document.createElement('div');
    col.className = 'col';

    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <img
          src="${service.image}"
          class="card-img-top"
          alt="${service.title}"
          style="height: 300px; object-fit: cover"
        />
        <div class="card-body d-flex flex-column">
          <h3 class="h5 card-title text-primary">
            ${service.title}
          </h3>
          <p class="card-text">
            ${service.description}
          </p>
        </div>
      </div>
    `;

    servicesContainer.appendChild(col);
  });
}

async function renderServiceSelect() {
  const serviceSelect = document.getElementById('servicio');
  if (!serviceSelect) return;

  let services = [];
  const localServices = localStorage.getItem('services');

  if (localServices) {
    services = JSON.parse(localServices);
  } else {
    const data = await loadInitialData();
    services = data ? data.services : [];
  }

  serviceSelect.innerHTML = '<option value="">Seleccioná un servicio</option>';

  services.forEach((service) => {
    const option = document.createElement('option');
    option.value = service.title;
    option.textContent = service.title;
    serviceSelect.appendChild(option);
  });
}

function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('nombre').value;
    const phone = document.getElementById('telefono').value;
    const service = document.getElementById('servicio').value;

    const now = new Date();
    const date = now.toLocaleDateString('es-AR');

    const newAppointment = {
      date,
      name,
      phone,
      service,
    };

    const appointments = await getStoredAppointments();
    appointments.push(newAppointment);
    setStoredAppointments(appointments);

    alert('¡Turno solicitado con éxito! Nos comunicaremos a la brevedad.');
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderAboutSection();
  renderServicesSection();
  renderServiceSelect();
  initAppointmentForm();
});
