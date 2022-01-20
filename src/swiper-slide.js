import { uniqueClasses } from './utils.js';
const SwiperSlide = {
  name: 'SwiperSlide',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    swiperRef: {
      type: Object,
      required: false
    },
    zoom: {
      type: Boolean,
      default: undefined
    },
    virtualIndex: {
      type: [String, Number],
      default: undefined
    }
  },

  setup(props, {
    slots
  }) {
    let eventAttached = false;
    const {
      swiperRef
    } = props;
    const slideElRef = Vue.ref(null);
    const slideClasses = Vue.ref('swiper-slide');

    function updateClasses(swiper, el, classNames) {
      if (el === slideElRef.value) {
        slideClasses.value = classNames;
      }
    }

    Vue.onMounted(() => {
      if (!swiperRef.value) return;
      swiperRef.value.on('_slideClass', updateClasses);
      eventAttached = true;
    });
    Vue.onBeforeUpdate(() => {
      if (eventAttached || !swiperRef || !swiperRef.value) return;
      swiperRef.value.on('_slideClass', updateClasses);
      eventAttached = true;
    });
    Vue.onUpdated(() => {
      if (!slideElRef.value || !swiperRef || !swiperRef.value) return;

      if (swiperRef.value.destroyed) {
        if (slideClasses.value !== 'swiper-slide') {
          slideClasses.value = 'swiper-slide';
        }
      }
    });
    Vue.onBeforeUnmount(() => {
      if (!swiperRef || !swiperRef.value) return;
      swiperRef.value.off('_slideClass', updateClasses);
    });
    const slideData = Vue.computed(() => ({
      isActive: slideClasses.value.indexOf('swiper-slide-active') >= 0 || slideClasses.value.indexOf('swiper-slide-duplicate-active') >= 0,
      isVisible: slideClasses.value.indexOf('swiper-slide-visible') >= 0,
      isDuplicate: slideClasses.value.indexOf('swiper-slide-duplicate') >= 0,
      isPrev: slideClasses.value.indexOf('swiper-slide-prev') >= 0 || slideClasses.value.indexOf('swiper-slide-duplicate-prev') >= 0,
      isNext: slideClasses.value.indexOf('swiper-slide-next') >= 0 || slideClasses.value.indexOf('swiper-slide-duplicate-next') >= 0
    }));
    return () => {
      return Vue.h(props.tag, {
        class: uniqueClasses(`${slideClasses.value}`),
        ref: slideElRef,
        'data-swiper-slide-index': props.virtualIndex
      }, props.zoom ? Vue.h('div', {
        class: 'swiper-zoom-container',
        'data-swiper-zoom': typeof props.zoom === 'number' ? props.zoom : undefined
      }, slots.default && slots.default(slideData.value)) : slots.default && slots.default(slideData.value));
    };
  }

};
export { SwiperSlide };
