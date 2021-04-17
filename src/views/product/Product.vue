<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col>
              <h3>{{ title }}</h3>
            </v-col>
            <v-col cols="auto">
              <router-link to="/create/product">
                <v-btn
                  tile
                  color="success"
                >
                  <v-icon left>
                    mdi-plus
                  </v-icon>
                  Create
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-row>
            <v-col>
              <v-text-field
                  v-model.trim="input"
                  label="Search Product"
                  placeholder="Enter Product Name"
                  clearable
                >
              </v-text-field>
            </v-col>
            <v-col>
              <FilterProduct 
                label="Price"
                :items="items_price" 
                :callback="onFilterPrice"
              />
            </v-col>
            <v-col>
              <FilterProduct 
                label="Quantity"
                :items="items_qty" 
                :callback="onFilterQty"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3" 
              v-for="product in searchAndFilterProducts()" 
              :key="product.id" 
              :class="[product.quantity < 10 && product.quantity != 0 ? 'itmeWaring' : '']">
              <Product :product="product"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <h4 class="text-center msg-no-product" v-show="!this.item_length">Product Not Found!</h4>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// @ is an alias to /src
import Product from "@/components/products/Product.vue";
import FilterProduct from '@/components/FilterProduct.vue';
import Dialog from '@/components/customeComponents/Dialog.vue';

export default {
  name: "Home",
  components: {
    Product,
    FilterProduct,
    Dialog,
  },
  data() {
    return {
      title: 'Products List',

      input: '',
      filter_price: '',
      filter_qty: '',
      items_price: [],
      items_qty: [],
      item_length: '',
    };
  },
  created() {
    this.checkUniquesPriceArray();
    this.checkUniquesQtyArray();
  },
  methods: {
    /* Check uniques for Price and assign value to items_qty variable */
    checkUniquesPriceArray() {
      const newArray = this.allProducts.map(element => element.price);
      const unique = [...new Set(newArray), 'All'];
      this.items_price = unique.reverse();
      console.log(this.items_price);
    },
    /* Check uniques for Qty and assign value to items_qty variable */
    checkUniquesQtyArray() {
      const newArray = this.allProducts.map(element => element.quantity);
      const unique = [...new Set(newArray), 'All'];
      this.items_qty = unique.reverse();
      console.log(this.items_qty);
    },
    /* Assign value to filter_price variable */
    onFilterPrice(value) {
      this.filter_price = value;
    },
    /* Assign value to filter_qty variable */
    onFilterQty(value) {
      this.filter_qty = value;
    },
    /* Search Something Fun*/
    searchAndFilterProducts() {
      let productLists = this.allProducts
      console.log('0 => ', this.filter_qty);
      // Process search input
      if (this.input != '' && this.input) {
        productLists = productLists.filter((item) => {
          return item.name
            .toLowerCase()
            .includes(this.input.toLowerCase()) ||
            item.description
            .toLowerCase()
            .includes(this.input.toLowerCase())
        })
      }

      // Process filter Price
      else if (this.filter_price != '' && this.filter_price && this.filter_price !== 'All') {
        productLists = productLists.filter(product => {
          return(product.price == this.filter_price);
        });
      }
      // Process filter Qty
      else if (this.filter_qty === 0 || this.filter_qty !== '' && this.filter_qty !== 'All') {
        console.log('0 => ', this.filter_qty);
        productLists = productLists.filter(product => {
          console.log(product.quantity+'- '+ this.filter_qty);
          return(product.quantity === this.filter_qty);
        });
      }
      this.item_length = productLists.length;
      return productLists;

      // this.$store.dispatch('searchingProducts', this.input);
      // filterProducts(e) {
      //   this.$store.dispatch('filterProducts', e)
      // },
    }
  },
  computed: {
    /* Access to store to get all products */
    ...mapGetters(['allProducts']),
  },
};
</script>

<style scoped>
.itmeWaring {
  background-color: rgb(231, 72, 72);
  opacity: 0.5;
}
.msg-no-product {
  margin-top: 200px;
}
</style>
