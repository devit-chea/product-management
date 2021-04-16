<template>
    <v-select
          @change="callback"
          :items="items"
          :label="label"
    ></v-select>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "FilterProduct",
    props: {
        items: {
            type: Array,
            default: ['5', '10', '20', '30']
        },
        callback: {
            type: Function,
            default: () => 1
        },
        label: {
            type: String,
            default: "Price"
        }
    },
    data() {
        return {}
    },
    methods: {
    },
}
</script>

<style scoped>

</style>