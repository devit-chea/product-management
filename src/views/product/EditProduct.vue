<template>
    <div>
        <EditProductForm edit :product="product"/>
    </div>
</template>

<script>
import EditProductForm from "@/components/products/ProductForm.vue";

export default {
  name: "ProductForm",
  components: {
    EditProductForm,
  },
  data() {
    return {
        product: {},
    };
  },
  methods: {
    goToProduct() {
        this.$router.push('/products');
    }
  },
  mounted() {
    if (this.$route.query?.id) {
        const product = this.$store.getters.getSingleProduct(this.$route.query.id);
        if (product !== undefined) {
            this.product = product;
            console.log('Here');
        } else {
            this.goToProduct()
        }
    } else {
        this.goToProduct()
    }
  },
};
</script>
