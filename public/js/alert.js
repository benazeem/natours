// type sucess or error


export const hideAlert = ()=>{
  if(document.querySelector('.alert') ) el.parentElement.removeChild(document.querySelector('.alert'))
}

export const showAlert = (type,msg)=>{
    hideAlert()
    const markup = `<div class="alert alert--${type}"> ${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup)
  window.setTimeout(hideAlert, 5000)
}