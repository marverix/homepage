const WebpackConfig = require('./WebpackConfig');

const fs = require('fs');
const path = require('path');

class WatchConfig extends WebpackConfig {

  constructor () {
    super();
    this._mode = 'development';
    this._devtool = 'cheap-source-map';

    this._devServer = {
      host: '0.0.0.0',
      port: 8000,
      disableHostCheck: true,
      //contentBase: common.dir.dist,
      compress: false
    };
  }

}

module.exports = WatchConfig;
