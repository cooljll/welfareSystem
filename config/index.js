
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),//编译生成的index.html文件
    assetsRoot: path.resolve(__dirname, '../dist'),//编译输出的静态资源路径
    assetsSubDirectory: 'static',//编译输出的二级目录
    assetsPublicPath: '/',//编译发布的根目录，可配置为资源服务器域名
    productionSourceMap: true,//修改为false,将环境设置为生产环境
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,//是否开启gzip
    productionGzipExtensions: ['js', 'css'],//需要使用gzip压缩的文件扩展名
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    //解决跨域问题
    proxyTable: {
      '/api': {
          target: 'http://192.168.1.197:8083/api', //表示你跨域请求的接口的域名
          changeOrigin: true, //如果接口跨域，需要进行这个参数配置
          pathRewrite:{
              '^/api':''
          }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false 
  }
}
