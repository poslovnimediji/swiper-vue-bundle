# Swiper Vue CDN bundle

bundle for CDN use of Swiper Vue component
https://swiperjs.com/vue

* Project for missing CDN version of official library
* Import `dist/swiper_vue.bundle.js` script after cdn for Vue 3.x

## Requirements

* Vue 3.x CDN
* swiper css CDN

## Update version

* change version in `package.json` file
* run `npm install`
* compile new code (example https://github.com/poslovnimediji/swiper-vue-bundle/commit/12dfe1ba5ada85db6b3f5b65f414ec7c7a22e5c1):
  * copy code from `node_modules/swiper/vue` to `/src` folder
  * delete all Vue imports. E.g. `import { h, ref, onMounted, onUpdated, onBeforeUnmount, watch, nextTick } from 'vue';`
  * add prefix `Vue.` to all functions deleted in previous step. E.g. from `ref(null)` to `Vue.ref(null)`
* run webpack with `npx webpack`
