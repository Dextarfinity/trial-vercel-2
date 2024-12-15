import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router'; // Import your router

const app = createApp(App);

app.use(router);  // Use the router
app.use(vuetify); // Use Vuetify
loadFonts();      // Load fonts

app.mount('#app'); // Mount the app


router.beforeEach((to, from, next) => {
    // Show the loader
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.remove('hidden', 'fade-out');
    }
    next();
  });
  
  router.afterEach(() => {
    // Hide the loader with a delay
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.classList.add('fade-out');
        loader.addEventListener('animationend', () => {
          loader.classList.add('hidden');
        });
      }
    }, 5000); // Adjust delay if necessary
  });