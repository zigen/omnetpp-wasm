import App from './App.svelte';

const root = document.createElement("DIV");
document.body.appendChild(root);
setTimeout(() => {

const app = new App({ target: root })
},1000)

