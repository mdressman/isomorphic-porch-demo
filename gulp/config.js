module.exports = {
  // our js files for linting
  jsFiles: [
      './src/**/*.js',
      './server/**/*.js',
      './gulp/**/*.js',
      '!server/index.js'
  ],
  jsxFiles: [
      './src/**/*.jsx'
  ],
  less: {
    src: [
      './src/app.less'
    ],
    lessFiles: [
      './src/**/*.less'
    ],
    dest: './dist'
  },
  browserify: {
    // Enable source maps
    debug: true,
    // Additional file extentions to make optional
    extensions: ['.jsx'],
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: './src/client.js',
      dest: './dist',
      outputName: 'bundle.js'
    }]
  }
};
