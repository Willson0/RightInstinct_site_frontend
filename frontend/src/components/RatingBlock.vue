<script>
import config from "@/config.json";
import axios from "axios";
import {hideOverlay, showOverlay} from "@/utils.js";
export default {
    name: "RatingBlock",
    data () {
        return {
            overlay: false,
            isLoading: false,
            ratingNow: 0,
        }
    },
    mounted () {
        this.ratingNow = this.rating;
    },
    methods: {
        showOverlay (cl) {
            this.overlay = true;
            requestAnimationFrame(() => {
                showOverlay(cl);
            })
        },
        hideOverlay (cl) {
            this.$emit("unfreeze");
            hideOverlay(cl);
        },
        async rate (rating) {
            if (this.isLoading) return;

            this.ratingNow = rating;
            this.isLoading = true;
            await axios.post(config.backend + "rating/rate", {
                type: this.type,
                object_id: this.id,
                rating: rating,
            }).then((response) => {
                this.$emit("rated", rating);
            }).catch((error) => {
                if (error.response) {
                    return alert (`An error occurred: ${error.message}`);
                }
            }).finally(() => {
                this.isLoading = false;
            });
        },
        nothing () {},
    },
    props: {
        rating: {
            type: Number,
            default: 0,
        },
        type: {
            type: String,
            default: "post"
        },
        id: {
            type: Number,
            required: true,
        },
        zid: {
            type: Boolean,
            default: false
        },
        clickable: {
            type: Boolean,
            default: true,
        }
    },
    watch: {
        rating () {
            this.ratingNow = this.rating;
        }
    },
    computed: {
        user () {
            return this.$store.state.user;
        },
    }
}
</script>

<template>
    <div style="background-color:transparent; padding: 0;">
        <div v-if="overlay" style="display:none" @click.stop="hideOverlay('ratingOverlay')" class="background ratingOverlay"></div>
        <div v-if="overlay" @click.stop="nothing" style="display:none" class="overlay ratingOverlay">
            <div @click.stop="hideOverlay('ratingOverlay')" class="overlay_button"><div></div></div>
            <div @click.stop="nothing" class="ratingOverlay_main">
                <div class="ratingOverlay_main_title">Оценить</div>
                <div class="ratingOverlay_main_stars">
                    <img @click.stop="rate(star)" v-for="star in ratingNow" src="/star.svg" alt="">
                    <img @click.stop="rate(star + ratingNow)" v-for="star in (5 - ratingNow)" src="/star_disabled.svg" alt="">
                </div>
            </div>
        </div>
    </div>
    <div :style="zid ? 'z-index: 99999' : ''" @click.stop="(user !== false && clickable) ? showOverlay('ratingOverlay') : null" class="rating green-bgc">
        <img src="/star.svg" alt="">
        <div class="grey-light">{{ rating }}</div>
    </div>
</template>

<style scoped>

</style>