<template>
  <div>
    <v-hover>
      <template v-slot="{ hover }">
        <v-card 
          class="mx-auto card pa-2 d-flex flex-column" 
          max-width="300"
          :elevation="hover ? 24 : 6"
        >
          <v-img
            :src="product.image"
            height="160px"
          ></v-img>
          <v-card-title> {{ product.name }} </v-card-title>
          <v-card-subtitle>
            Price: ${{ product.price }} | 
            <span v-if="product.quantity > 0">Qty: {{ product.quantity }} units</span>
            <span v-else class="outOfStock">Out Of Stock</span>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn small color="error" @click="dialog = true"> Delete </v-btn>
            <v-btn small color="cyan" @click="editProduct(product.id)"> Edit </v-btn> 
            <v-btn small color="primary" @click="viewProduct(product.id)"> view </v-btn> 
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>
                {{ product.description }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </template>
    </v-hover>
    <!-- Dialog Box -->
    <v-row justify="center">
    <v-dialog v-model="dialog" max-width="390">
      <v-card>
        <v-card-title class="headline">Delete Product</v-card-title>
        <v-card-text>Are you sure you want to delete the product?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text  @click="removeProduct(product.id)">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {

  name: "Product",

  props: {
    product: {
      type: Object,
      default: () => ({
        id: 0,
        name: '',
        price: '',
        quantity: '',
        description: '',
        image: '',
      })
    }
  },

  data: () => ({
    dialog: false,
    show: false,

    id: '',
    name: '',
    price: '',
    quantity: '',
    description: '',
    image: '',
  }),

  methods: {
    removeProduct(id) {
      this.$store.dispatch('removeProduct', id)
    },
    editProduct(id) {
      this.$router.push({ path: '/edit/product', query: { id } })
    },
    viewProduct(id) {
      this.$router.push({ path: '/view/product', query: { id }})
    }
  },
};

</script>

<style scoped>
.outOfStock {
  color: red;
  font-weight: 600;
}
</style>
