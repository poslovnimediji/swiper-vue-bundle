# Swiper Vue CDN bundle

bundle for CDN use of Swiper Vue component
https://swiperjs.com/vue

* Project for missing CDN version of official library
* Import `dist/swiper_vue.bundle.js` script after cdn for Vue 3.x

## Requirements

* Vue 3.x CDN

## Update version

* change version in `package.json` file
* run `npm install`
* compile new code:
  * copy code from `node_modules/swiper/vue` to `/src` folder
  * delete all Vue imports. E.g. `import { h, ref, onMounted, onUpdated, onBeforeUnmount, watch, nextTick } from 'vue';`
  * add prefix `Vue.` to all functions deleted in previous step. E.g. from `ref(null)` to `Vue.ref(null)`
* run webpack with `npx webpack`
