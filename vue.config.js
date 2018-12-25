module.exports = {
	baseUrl: process.env.NODE_ENV === 'production' ? '/' : './',
	outputDir: 'dist',
	assetsDir: 'html',
	productionSourceMap: false,
	runtimeCompiler: true,
	devServer: {
		// proxy: {
			// '/': {
			// 	target: 'https://www.51dashizaixian.com',
			// 	changeOrigin: true
			// }
		// }
	}
}