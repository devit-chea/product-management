<template>
  <div>
    <ProductForm />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductForm from "@/components/products/ProductForm.vue";

export default {
  name: "CreateProduct",
  components: {
    ProductForm,
  },
  data() {
    return {

    };
  },
};
</script>
