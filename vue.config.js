module.exports = {
  // css: {
  //   loaderOptions: {
  //     css: {},
  //     postcss: {
  //       plugins: [
  //         require('postcss-px2rem')({
  //           remUnit: 37.5
  //         })
  //       ]
  //     }
  //   }
  // },
  devServer: {
    //代理
    proxy: {
      "/sys": {
        target: "http://121.40.110.73:8080/ggc",
        // target: "http://192.168.2.19:8080/ggc",
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/sys': ''
        }
      }
    }
  }
}

