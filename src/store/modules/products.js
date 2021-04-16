import axios from 'axios';

const state = {
  products: [
    {
      id: 1,
      name: "Mouse",
      description: "This guide is primarily for users with prior Vue 2 experience who want to learn about the new features and changes in Vue 3.",
      price: "10",
      quantity: 20,
      image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
    },
    {
      id: 2,
      name: "Laptop stand",
      description: "This guide is primarily for users with prior Vue 2 experience who want to learn about the new features and changes in Vue 3.",
      price: "24",
      quantity: 10,
      image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
    },
    {
      id: 3,
      name: "Keyboard",
      description: "This guide is primarily for users with prior Vue 2 experience who want to learn about the new features and changes in Vue 3.",
      price: "32",
      quantity: 50,
      image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
    },
    {
      id: 4,
      name: "Keyboard RGB",
      description: "This guide is primarily for users with prior Vue 2 experience who want to learn about the new features and changes in Vue 3.",
      price: "32",
      quantity: 0,
      image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
    }
  ],
  keywords: "",
};
// Getters //
const getters = {
  allProducts: state => state.products.reverse(),
  getSingleProduct: state => id => state.products.find(product => product.id == id),
};
// Actions //
const actions = {
  async fetchProducts({ commit }) {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    commit('setProducts', response.data)
  },

  createProduct: ({ commit }, newProduct) => commit('createProduct', newProduct, /*console.log(newProduct)*/),
  removeProduct: ({ commit }, id) => commit('removingProduct', id),
  filterProducts: ({ commit }, payload) => commit('filteringProducts', payload),
  // searchProducts: ({ commit }, payload) => commit('searchingProducts', payload),
  searchingProducts({ commit }, payload) {
    let result = state.products.filter((product) => {
      return product.name.toLowerCase().includes(payload);
    });
    console.log(result);
    commit('setProducts', result);
  },
};
// Mutations //
const mutations = {
  setProducts: (state, products) => (state.products = products),
  createProduct: (state, newProduct) => state.products.push(newProduct),
  removingProduct: (state, id) =>
      (state.products = state.products.filter(product => product.id != id)),
  filteringProducts: ({ commit }, price) => {
    const data = state.products.filter(product => {
        return(product.price == price);
    });
    state.products = data;
  },
  setProductLists: (state, payload) => {
    console.log(payload);
    state.products = payload;
  }
  
};

export default {
  state,
  getters,
  actions,
  mutations,
}