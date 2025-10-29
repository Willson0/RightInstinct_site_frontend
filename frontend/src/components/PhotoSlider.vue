<script>
import config from '@/config';
import router from "@/router.js";
export default {
    name: "PhotoSlider",
    props: {
        images: { type: Array, required: true },
        startIndex: { type: Number, default: 0 },
    },
    emits: ['close'],
    data() {
        return {
            config,
            index: 0,
            dragging: false,
            dragStartX: 0,
            dragOffset: 0,

            slideWidth: window.innerWidth * 0.9,
        };
    },
    mounted () {
        this.index = this.startIndex;
        document.body.style.overflow = "hidden";
    },
    unmounted () {
        document.body.style.overflow = "";
    },
    computed: {
        // Сдвигаем track на нужное количество картинок + drag offset
        trackStyle() {
            const base = -this.index * this.slideWidth;
            return {
                transform: `translateX(${base + this.dragOffset}px)`
            }
        },
    },
    methods: {
        onDragStart(e) {
            this.dragging = true;
            this.dragStartX = e.clientX;
            this.dragOffset = 0;
            // убираем transition для плавного drag
            this.$refs.el.querySelector('.slider-track').style.transition = 'none';
        },
        onDragMove(e) {
            if (!this.dragging) return;
            this.dragOffset = e.clientX - this.dragStartX;
        },
        onDragEnd(e) {
            if (!this.dragging) return;
            this.finishDrag(this.dragOffset);
            this.dragging = false;
        },
        onTouchStart(e) {
            this.dragging = true;
            this.dragStartX = e.touches[0].clientX;
            this.dragOffset = 0;
            this.$refs.el.querySelector('.slider-track').style.transition = 'none';
        },
        onTouchMove(e) {
            if (!this.dragging) return;
            this.dragOffset = e.touches[0].clientX - this.dragStartX;
        },
        onTouchEnd(e) {
            if (!this.dragging) return;
            this.finishDrag(this.dragOffset);
            this.dragging = false;
        },
        finishDrag(offset) {
            // вернем transition, чтобы слайд возвращался/пролистывался плавно
            this.$refs.el.querySelector('.slider-track').style.transition = '';
            const threshold = this.slideWidth / 4; // сколько пикселей нужно потащить
            if (offset > threshold && this.index > 0) {
                this.index--;
            } else if (offset < -threshold && this.index < this.images.length - 1) {
                this.index++;
            }
            // анимация возвращения на место
            this.dragOffset = 0;
        }
    },
};
</script>

<template>
    <div class="background" @click="this.$emit('close');"></div>
    <div ref="el" class="photo_slider"
         @touchstart.prevent="onTouchStart"
         @touchmove.prevent="onTouchMove"
         @touchend.prevent="onTouchEnd"
         @mousedown.prevent="onDragStart"
         @mousemove.prevent="onDragMove"
         @mouseup.prevent="onDragEnd"
         @mouseleave.prevent="onDragEnd">
        <div
            class="slider-track"
            :style="trackStyle">
            <img
                v-for="(image, i) in images"
                :key="i"
                :src="config.storage + image"
                alt="">
        </div>
        <div class="photo_slider_counter">
            {{ index + 1 }} из {{ images.length }}
        </div>
        <button class="photo_slider_close" @click="this.$emit('close');">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L20 20" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 20L20 4" stroke="#F1EBD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
</template>

<style scoped>

</style>