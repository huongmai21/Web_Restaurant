// internal_site/admin/vue.config.js
module.exports = {
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
};
