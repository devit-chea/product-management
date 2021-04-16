const state = {
  users: [
    {
      id: 1,
      name: "admin",
      password: "123456",
      description: "This guide is primarily for users with prior Vue 2 experience who want to learn about the new features and changes in Vue 3.",
      image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
    },
  ],
  authenticated: false,
};

const mutations = {
  setAuthentication: (state, status) => (state.authenticated = status, console.log(state.authenticated)),
};

export default {
  state,
  mutations,
}