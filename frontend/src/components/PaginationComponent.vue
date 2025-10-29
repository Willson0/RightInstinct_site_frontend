<script>
export default {
    name: "PaginationComponent",
    data () {
        return {
            selected: 1,
        }
    },
    props: {
        count: {
            type: Number,
            default: 1,
        },
        page: {
            type: Number,
            default: 1,
        },
    },
    watch: {
        selected () {
            this.$emit('selected', this.selected);
        },
        page () {
            this.selected = this.page;
        }
    }
}
</script>

<template>
    <div class="pagination">
        <button :class="{'inactive': selected === 1}" @click="selected = Math.max(1, selected-1)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.1602 7.41L10.5802 12L15.1602 16.59L13.7502 18L7.75016 12L13.7502 6L15.1602 7.41Z" fill="#A2A2A2"/>
            </svg>
        </button>
        <button @click="selected = page" :class="{'active': selected === page}" v-for="page in count">
            <div>{{page}}</div>
        </button>
        <button :class="{'inactive': selected === count}" @click="selected = Math.min(count, selected+1)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.83984 7.41L13.4198 12L8.83984 16.59L10.2498 18L16.2498 12L10.2498 6L8.83984 7.41Z" fill="#E4BA6A"/>
            </svg>
        </button>
    </div>
</template>

<style scoped>

</style>