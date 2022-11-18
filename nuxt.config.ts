import glsl from "vite-plugin-glsl"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [glsl()],
  },
  css: [
    // "normalize.css",
    // "~/assets/fonts/graphik/stylesheet.css",
    // "~/assets/styles/mixins.scss",
  ],
});
