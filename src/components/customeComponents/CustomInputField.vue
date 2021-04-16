<template>
    <v-text-field
        :value="value"
        v-bind="$attrs"
        @input="update"
        v-on="$listeners"
        :label="label"
        :type="type"
        :placeholder="placeholder"
        clearable
    />
</template>

<script>
export default {
    inheritAttrs: true,
    name: "CustomInputField",
    props: {
        value: {
            type: [String, Boolean, Number],
            default: null,
            required: false
        },
        label: {
            type: String,
            default: ""
        }, 
        type: {
            type: String,
            default: "text"
        },
        placeholder: {
            type: String,
            default: ""
        },
    },
    
    methods: {
        update(value) {
            console.log(value);
            this.$emit('input', value);
        },
    },
}
</script>