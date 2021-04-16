module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        // modify the options...
        return options
      })
  }
};
