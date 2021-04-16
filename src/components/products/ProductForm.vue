<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <h3>{{ !edit ? title : 'Edit Product' }}</h3>
          <v-divider></v-divider>

          <v-form>
            <custom-input-field
              label="Product Name"
              placeholder="Enter Product Name"
              v-model="name"
              :error-messages="nameErrors"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()" 
            />
            <custom-input-field
              v-model="price"
              label="Price"
              type="number"
              placeholder="Enter Product Price"
              :error-messages="priceErrors"
              @input="$v.price.$touch()"
              @blur="$v.price.$touch()"
            />
            <custom-input-field
              v-model="quantity"
              label="Quantity"
              type="number"
              placeholder="Enter Product Quantity"
              :error-messages="quantityErrors"
              @input="$v.quantity.$touch()"
              @blur="$v.quantity.$touch()"
            />
            <input 
              type="file"
              @change="onFileChange">
            <br>
            <div id="preview">
              <img v-if="image" :src="image" />
            </div>
            <v-textarea
              name="description"
              label="Description"
              v-model="description"
              value=""
              :error-messages="descriptionErrors"
              required
              @input="$v.description.$touch()"
              @blur="$v.description.$touch()"
            ></v-textarea>

            <v-btn
              tile
              color="red"
              @click="goToProduct"
            >
              <v-icon left>
                mdi-arrow-left
              </v-icon>
              Cancel
            </v-btn>
            <v-btn v-if="!edit"
              tile
              color="success"
              @click="createProduct"
            >
              <v-icon left>
                mdi-plus
              </v-icon>
              Create
            </v-btn>
            <v-btn v-else
              tile
              color="success"
              @click="saveProduct"
            >
              <v-icon left>
                mdi-pencil
              </v-icon>
              Edit
            </v-btn>
          </v-form>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { required, decimal, numeric } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import short from 'short-uuid';
import CustomInputField from '@/components/customeComponents/CustomInputField.vue';

export default {
  name: "ProductForm",
  components: {
    CustomInputField
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: () => ({
        id: '',
        name: '',
        price: '',
        quantity: '',
        description: '',
        image: '',
      }),
    }
  },

  data() {
    return {
      title: "Create Product",
      submitStatus: '',

      name: '',
      price: '',
      quantity: '',
      description: '',
      image: '',
    }
  },
  created() {
    this.assignValues()
  },
  mixins: [validationMixin],
  validations: {
    name: {
      required,
    },
    price: {
      required,
      decimal,
    },
    quantity: {
      required,
      numeric,
    },
    description: {
      required,
    },
  },
  methods: {
    goToProduct() {
        this.$router.push('/products');
    },
    /* Create product dispatch to store */
    createProduct() {
      console.log(this.name);
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$store.dispatch('createProduct', {
            id: short.generate(),
            name: this.name,
            price: this.price,
            quantity: this.quantity,
            description: this.description,
            image: this.image,
          });
          this.$router.push('/products');
        }, 500)
      }
    },
    /* Update product dispatch to store */
    saveProduct() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$store.dispatch('removeProduct', this.product.id);
          this.$store.dispatch('createProduct', {
            id: this.product.id,
            name: this.name,
            price: this.price,
            quantity: this.quantity,
            description: this.description,
            image: this.image,
          });
          this.$router.push('/products');
        }, 500)
      }
    },
     /* Assign value for form edit */
    async assignValues() {
      await this.$nextTick
      this.name = this.product.name
      this.price = this.product.price
      this.quantity = this.product.quantity
      this.description = this.product.description
    },
    /* File upload funtion */
    onFileChange(e) {
      const allowedType = ["image/png", "image/jpg", "image/jpeg"];
      const file = e.target.files[0];
      if (!allowedType.includes(file.type)) {
        alert("Only images are required!!!");
      }
      this.image = URL.createObjectURL(file);
    }
  },
  computed: {
    /* Validation Create/Update form */
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Product Name is required.')
      return errors
    },
    priceErrors () {
      const errors = []
      if (!this.$v.price.$dirty) return errors
      !this.$v.price.required && errors.push('Price is required.')
      !this.$v.price.decimal && errors.push('Price must be decimal.')
      return errors
    },
    quantityErrors () {
      const errors = []
      if (!this.$v.quantity.$dirty) return errors
      !this.$v.quantity.required && errors.push('Quantity is required.')
      !this.$v.quantity.numeric && errors.push('Quantity must be numerric.')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.required && errors.push('Description is required.')
      return errors
    }
    /* End vlidation Create/Update form */
  },
};
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
