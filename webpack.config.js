const path = require('path')

module.exports = {
    entry: {
        index: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
				filename: '[name].js',
				libraryTarget: 'commonjs'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
		},
		externals: ['react', 'react-dom']
}
