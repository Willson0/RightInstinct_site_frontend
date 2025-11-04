<script>
import {complain, copy, favourite, notify, toLink} from "@/utils.js";
import config from "@/config.json";
import RatingBlock from "@/components/RatingBlock.vue";
import axios from "axios";
import PhotoSlider from "@/components/PhotoSlider.vue";

export default {
    name: "PostBlock",
    components: {PhotoSlider, RatingBlock},
    emits: ['freeze', 'unfreeze', 'delete'],
    methods: {
        favourite,
        async deletePost (id) {
            const enums = {
                "post": {translate: 'объявление', my: 'posts'},
                "service": {translate: 'услугу', my: 'services'},
            }

            const name = this.user.my[enums[this.type].my].find(el => el.id === id).title;
            if (confirm(`Вы уверены, что хотите удалить ${enums[this.type].translate} \"${name}\"?`)) {
                await axios.post(config.backend + this.type + "/" + id + "/delete")
                .then((response) => {
                    this.$emit("delete");
                    notify("Удаление успешно завершено!");
                    this.user.my[enums[this.type].my] =
                        this.user.my[enums[this.type].my].filter(el => el.id !== id);
                }).catch((error) => {
                    if (error.response) {
                        return alert (`An error occurred: ${error.message}`);
                    }
                });
            }
        },
    },
    data () {
        return {
            selectedID: null,
            overlay: false,
            config: config,
            isLoading: {status: false},
            overlayImage: null,
            startIndex: null,
        }
    },
    props: {
        object: {
            type: Object,
            required: true
        },
        clickable: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: "post",
        },
        // my: {
        //     type: Boolean,
        //     default: false,
        // },
        isDragging: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        beautifullyPrice () {
            if (this.object.price === -1) return "Договорная";
            return this.object.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + " ₽";
        },
        user () {
            return this.$store.state.user;
        },
        my () {
            if (!this.user.id) return;

            if (this.type === 'service') this.list = this.user.my.services;
            else this.list = this.user.my.posts;

            if (this.list.find(l => l.id === this.object.id)) return true;
            return false;
        }
    }
}
</script>

<template>
    <div :class="{'my': my}" class="block_post" @click="isDragging ? null : $router.push('/show/' + type + '/' + object.id)">
        <div class="block_post_img">
            <img :src="config.storage + object.pictures[0]?.url" alt="">
            <div v-if="my" class="green-bgc">
                <img src="/star.svg" alt="">
                <div class="grey-light">{{ object.rating }}</div>
            </div>
            <rating-block v-else :id="object.id" @unfreeze="$emit('unfreeze')"
                          @freeze="$emit('freeze')" :rating="object.rating" :type="type"/>
        </div>
        <div class="block_post_info">
            <div class="sign">{{ object.title }}</div>
            <div class="grey sign">{{ object.category.name }}</div>
        </div>
        <div class="block_post_location">
            <img src="/location.svg" alt="">
            <div class="sign">{{ object.city.name }}</div>
        </div>
        <div class="block_post_footer">
            <div class="block_post_price h3">
                <div>
                    {{ beautifullyPrice }}
                </div>
            </div>
            <div v-if="user && user.favourites && !my" class="button" @click.stop="favourite(!user?.favourites[type]?.includes(object.id), type, object.id, isLoading, user)">
                <img v-if="user?.favourites[type]?.includes(object.id)"
                     src="/like_active.svg" style="width:24px; height: 24px;" alt="">
                <img v-else src="/like.svg" alt="">
            </div>
            <template v-else-if="user && user.favourites">
                <button class="button" @click.stop="$router.push('/update/' + type + '/' + object.id)"><img style="width: 24px;" src="/edit.svg" alt=""></button>
                <button class="button" @click.stop="deletePost(object.id)"><img style="width: 24px;" src="/trash.svg" alt=""></button>
            </template>
        </div>
    </div>
</template>

<style scoped>

</style>