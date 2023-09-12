// build/webpack.base.js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
module.exports = {
  entry: path.join(__dirname, '../src/index.ts'), // 入口文件
  output: {
    filename: 'static/js/[name].js', // 每个输出js的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
      	test: /\.vue$/, // 匹配.vue文件
      	use: 'vue-loader', // 用vue-loader去解析vue文件
      },
      {
        test: /\.(js|ts)$/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /.(css|less)$/, //匹配 css和less 文件
        use: [
          'style-loader',
          'css-loader',
          // 新增
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), // vue-loader插件、
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
        inject: true, // 自动注入静态资源
      }),
      new webpack.DefinePlugin({
        'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
  ]
}
