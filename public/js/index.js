import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { login } from './login';
import { displayMap } from './mapbox';

const locations = JSON.parse(document.getElementById('map').dataset.locations);
displayMap(locations);

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});