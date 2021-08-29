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
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/index.ejs',
			title: 'I am App1'
		}),
		new ModuleFederationPlugin({
			name: "app1",
			remotes: {
			  app2: "app2@http://localhost:3002/remoteEntry.js",
			},
			shared: {
				"react": { singleton: true },
				"react-dom": { singleton: true }
			  }
		}),
		new CleanWebpackPlugin()
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		port: 3001,
		liveReload: true,
		proxy: {

		}
	},
	target: 'web'
}