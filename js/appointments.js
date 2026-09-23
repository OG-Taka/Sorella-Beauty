async function loadInitialAppointments() {
  try {
    const response = await fetch('../data/appointments.json');
    const data = await response.json();
    return data.appointments || [];
  } catch (error) {
    return [];
  }
}

async function getStoredAppointments() {
  const local = localStorage.getItem('appointments');
  if (local) return JSON.parse(local);

  const appointments = await loadInitialAppointments();
  return appointments;
}

function setStoredAppointments(appointments) {
  localStorage.setItem('appointments', JSON.stringify(appointments));
}

const appointmentsTableBody = document.getElementById('appointmentsTableBody');

async function renderAppointmentsTable() {
  if (!appointmentsTableBody) return;
  const appointments = await getStoredAppointments();
  appointmentsTableBody.innerHTML = '';

  if (appointments.length === 0) {
    appointmentsTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted">No hay turnos solicitados.</td>
      </tr>
    `;
    return;
  }

  appointments.forEach((app, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${app.date}</td>
      <td class="fw-bold">${app.name}</td>
      <td>${app.phone}</td>
      <td>${app.service}</td>
      <td>
        <button type="button" class="btn btn-sm btn-danger" data-action="delete-appointment" data-index="${index}">Eliminar</button>
      </td>
    `;

    appointmentsTableBody.appendChild(tr);
  });
}

if (appointmentsTableBody) {
  appointmentsTableBody.addEventListener('click', async (e) => {
    const button = e.target.closest('button');
    if (!button) return;

    const action = button.dataset.action;
    const index = parseInt(button.dataset.index, 10);

    if (action === 'delete-appointment') {
      if (
        confirm('¿Estás seguro de que deseas eliminar este registro de turno?')
      ) {
        const appointments = await getStoredAppointments();
        appointments.splice(index, 1);
        setStoredAppointments(appointments);
        renderAppointmentsTable();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderAppointmentsTable();
});
