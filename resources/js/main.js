import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MathJax, { initMathJax, renderByMathjax } from "mathjax-vue3";

function onMathJaxReady() {
  const el = document.getElementById("elementId");
  renderByMathjax(el);
}
initMathJax({
  url: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.min.js',
}, onMathJaxReady);

const app = createApp(App)
app.use(router)
app.use(store)
app.use(MathJax)
app.mount('#app')
