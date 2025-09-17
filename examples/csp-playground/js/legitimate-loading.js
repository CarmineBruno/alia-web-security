console.log('Legitimate script is running ...');
console.log('Legitimate script is loading another script ...');

let s = document.createElement('script');
s.src = 'http://localhost:4004/js/legitimate-level2.js';
document.body.appendChild(s);
