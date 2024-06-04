const typescript = require('@rollup/plugin-typescript')
const pkg = require('../../package.json')

const year = new Date().getFullYear()
const banner = `/*!
* Esame 5 v${pkg.version} 
* ${year} ${pkg.author}
*/`

module.exports = {
    input: 'src/ts/index.ts',
    external: ['bootstrap'],
    output: {
        file: 'dist/js/index.js',
        format: 'umd',
        banner,
        name: 'App',
        globals: {
            bootstrap: 'bootstrap'
        }
    },
    plugins: [
        typescript()
    ]
}