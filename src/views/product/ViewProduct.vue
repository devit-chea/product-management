<template>
    <div>
        <h3>Product detail</h3>
        <v-container>
            <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="8">
                    <ProductDetail :product="product" :callback="goToProduct" back_title="Go Back"/>
                </v-col>
                <v-col cols="2"></v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import ProductDetail from '@/components/products/ProductDetail.vue';

export default {
    name: "ViewProduct",
    components: {
        ProductDetail,
    },
    data: () => ({
        product: {}
    }),
    methods: {
        goToProduct() {
            this.$router.push('/products');
        }
    },
    mounted() {
        if(this.$route.query?.id) {
            const product = this.$store.getters.getSingleProduct(this.$route.query.id);
            if (product !== undefined || product !== null) {
                this.product = product;
            } else {
                this.goToProduct()
            }
        } else {
            this.goToProduct()
        }
    },
}
</script>