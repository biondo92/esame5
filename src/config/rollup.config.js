const typescript = require('@rollup/plugin-typescript')
const pkg = require('../../package.json')

const year = new Date().getFullYear()
const banner = `/*!
* Esame 5 v${pkg.version} 
* ${year} ${pkg.author}
*/`

module.exports = {
    input: 'src/ts/app.ts',
    output: {
        file: 'dist/js/app.js',
        format: 'umd',
        banner,
        name: 'app'
    },
    plugins: [
        typescript()
    ]
}