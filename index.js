import App from './src/App.js';

window.addEventListener('DOMContentLoaded',() => {
    new App(document.getElementsByClassName('App')[0]);
})

window.addEventListener('historyChange',() => {
    new App(document.getElementsByClassName('App')[0]);
})

window.addEventListener('popstate',() => {
    new App(document.getElementsByClassName('App')[0]);
})