<script>
import config from "@/config.json"
import {complain, copy, favourite, notify, toLink} from "@/utils.js";
import axios from "axios";
import PhotoSlider from "@/components/PhotoSlider.vue";
export default {
    name: "EventBlock",
    components: {PhotoSlider},
    data () {
        return {
            config: config,
            overlay: false,
            isLoading: {status: false},
            overlayImage: null,
            startIndex: null,
        }
    },
    props: {
        event: {
            type: Object,
            required: true
        },
        my: {
            type: Boolean,
            default: 0,
        },
        isDragging: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        beautifullyDate () {
            let startDate = new Date(this.event.start_date);
            let endDate = new Date(this.event.end_date);

            const months = ["января","февраля","марта","апреля","мая","июня","июля","августа",
                "сентября","октября","ноября","декабря"]

            if (startDate.getYear() === endDate.getYear())
                return (String(startDate.getDate()).padStart(2, "0") + " "
                    + months[startDate.getMonth()] + " - "
                    + String(endDate.getDate()).padStart(2, "0")
                    + " " + months[startDate.getMonth()]
                    + " " + String(endDate.getFullYear()).padStart(2,"0")) + " г."
        },
        user () {
            return this.$store.state.user;
        },
    },
}
</script>

<template>
    <div @click="isDragging ? null : $router.push('/show/event/' + event.id)" class="event">
        <img v-if="event.pictures[0]" :src="config.storage + event?.pictures[0].url" alt="">
        <div class="event_info">
            <h4>{{ event.title }}</h4>
            <div class="event_description sign">{{ event.description }}</div>
        </div>
        <div class="event_location">
            <img src="/location.svg" alt="">
            <div class="sign">{{ event.city.name }}</div>
        </div>
        <div class="event_calendar">
            <img src="/calendar.svg" alt="">
            <div class="sign">{{ beautifullyDate }}</div>
        </div>
    </div>
</template>

<style scoped>

</style>