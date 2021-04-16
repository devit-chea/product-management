<template>
    <div>
        <label class="label">{{label}}
            <p class="control"><input type="file" @change="updateValue"></p>
            <div id="preview">
                <img v-if="url" :src="url" />
            </div>
        </label>
    </div>
</template>

<script>
export default {
    name: "InputFile",
    props: {
        label: {
            type: String,
            default: 'Image'
        }
    },
    data() {
        return {
            url: null,
        }
    },
    methods: {
        updateValue: function(event) {
            var  result = event.target.files;
            var array  = [].slice.call(result);
            this.$emit('input',  array);
            console.log(event);
            const file = event.target.files[0];
            this.url = URL.createObjectURL(file);
        }
    },
}
</script>

<style scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>