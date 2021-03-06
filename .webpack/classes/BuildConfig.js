const WebpackConfig = require('./WebpackConfig');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BannerPlugin } = require('webpack');
const dir = require('../dir');

class BuildConfig extends WebpackConfig {

  constructor () {
    super();
    this._mode = 'production';

    this._performance = {
      maxEntrypointSize: 512 * 1024,
      maxAssetSize: 512 * 1024
    };

    this._plugins.push(new CleanWebpackPlugin());
    this._plugins.push(
      new BannerPlugin(`Marek Sierociński homepage (c) marverix | GNU AFFERO GENERAL PUBLIC LICENSE`)
    );
  }

}

module.exports = BuildConfig;
