// configures webpack and specifies details of this project
// some node specific features
// creates a config object
 // root properties
const path = require('path') // require() is a utility method that node.js provides t work w/ paths
module.exports = { // spec. to node.js: exposes something from a specific file
    entry: {
        index: ['babel-polyfill', './src/index.js'],
        edit: ['babel-polyfill', './src/edit.js']
    }, // relative path to where our code lives (input) (can be relative)
    output: {
        path: path.resolve(__dirname, 'public/scripts'), // path to where we are saving webpack output (must be absolute)
                // resolve is a utility method from node mentioned before
        filename: '[name]-bundle.js' // [name] is replaces by the values in the entry for the bundle
    },
    module: {
        rules:[{ // where most config is taking place
            test: /\.js$/, // sees if file has .js file to see if it is javaScipt
            // '\' allows the dot (.) to escape path since . has a special meaning. $ specifies to verify the end of the file name!
            exclude: /node_modules/, // prevents rules from being used in these files. this is a regular expression example ('/ /')that exludes everything that had node_modules inside
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                }
            }       
        }],
    },
    devServer: {
        contentBase: path.resolve(__dirname,'public'), // abs. path: tells dev server where folder we're trying to serve lives (like output^)
        publicPath: '/scripts/' // string where, relative to the public server, webpack put our assets
    },
    devtool: 'source-map'
}



// __dirname (directory name)
// ^ThisPC/Desktop/js-bootcamp/boilerplate in one variable 