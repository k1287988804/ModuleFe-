const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { ModuleFederationPlugin } = require("webpack").container

module.exports = {
	mode: 'development',
	entry: { main : './src/main.js' },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.[hash].js',
	},
	module: {
		rules: [
			{
				test: /\.js|jsx$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
						   "@babel/preset-env",
						   '@babel/preset-react',
						],
					}
				},
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/index.ejs',
			title: 'I am App2'
		}),
		new ModuleFederationPlugin({
	      // 提供给其他服务加载的文件
	      filename: "remoteEntry.js",
	      // 唯一ID，用于标记当前服务
	      name: "app2",
	      // 需要暴露的模块，使用时通过 `${name}/${expose}` 引入
	      exposes: {
	        "./Com": "./src/components/Com.jsx",
	      },
	  //     shared: {
			// "react": { singleton: true },
			// "react-dom": { singleton: true }
		 //  }
	    }),
		new CleanWebpackPlugin()
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		port: 3002,
		liveReload: true,
		proxy: {

		}
	},
	target: 'web'
}