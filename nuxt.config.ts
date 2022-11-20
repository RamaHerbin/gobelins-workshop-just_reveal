import glsl from "vite-plugin-glsl"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr:false,
  vite: {
    plugins: [glsl()],
  },
  css: [
    "normalize.css",
    // "~/assets/styles/mixins.scss",
  ],
  app: {
    head: {
      title: 'Just Reveal - Gobelins / AFP',
      meta: [
        { name: 'description', content: 'Interactive cartography' }
      ],
       noscript: [
      // <noscript>Javascript is required</noscript>
      { children: 'Javascript is required' }
    ]
    }
  }
});
