<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col>
              <h3>Products List</h3>
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
            <FilterProduct :items="items" :callback="onFilterProducts"/>
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

export default {
  name: "Home",
  components: {
    Product,
    FilterProduct,
  },
  data() {
    return {
      // items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      input: '',
      filter: '',
      items: [],
      item_length: '',
    };
  },
  created() {
    this.checkUniquesArray();
  },
  methods: {
    checkUniquesArray() {
      const newArray = this.allProducts.map(element => element.price);
      const unique = [...new Set(newArray), 'All'];
      this.items = unique.reverse();
      console.log(this.items);
    },
    // ...mapActions(['filterProducts']),
    onFilterProducts(value) {
      this.filter = value;
    },

    searchAndFilterProducts() {
      console.log(this.allProducts);
      let productLists = this.allProducts
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

      // Process filter input
      else if (this.filter != '' && this.filter && this.filter !== 'All') {
        productLists = productLists.filter(product => {
          return(product.price == this.filter);
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
    ...mapGetters(['allProducts']),
  },
};
</script>

<style scoped>
.itmeWaring {
  background-color: rgb(231, 72, 72);
  opacity: 0.7;
}
.msg-no-product {
  margin-top: 200px;
}
</style>
