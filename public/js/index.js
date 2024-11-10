import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout')
const updateDataForm = document.querySelector('.form-user-data')
const updatePasswordForm = document.querySelector('.form-user-password')


if(mapBox){
const locations = JSON.parse(mapBox.dataset.locations);
displayMap(locations);}

if(loginForm){
  loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
})}

if(logOutBtn) logOutBtn.addEventListener('click', logout)


  if (updateDataForm) {
    updateDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name',document.getElementById('name').value)
    form.append('email',document.getElementById('email').value)
    form.append('photo', document.getElementById('photo').files[0])

    updateSettings(form, 'data');
    });
  }

  if (updatePasswordForm) {
    updatePasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const passwordUpdate = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    document.querySelector('.btn--save-password').textContent = 'Updating...'
    
    updateSettings({passwordCurrent, passwordUpdate,passwordConfirm}, 'password');

    document.querySelector('.btn--save-password').textContent = 'Save Password'
    passwordCurrent = '';
    passwordUpdate='';
    passwordConfirm=''
  });
  }