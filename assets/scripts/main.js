import popper from "popper.js";
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';

//hack for popper 
window.popper = popper;

//import local dependencies
import Router from './util/Router.js';
import common from './routes/common';
//import home from './routes/home';
//import aboutUs from './routes/aboutUs';

console.log("test");


/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
 // home,
  // About Us page, note the change from about-us to aboutUs.
 // aboutUs
});

document.addEventListener("DOMContentLoaded", () => routes.loadEvents());