const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// ** Add 'riv' to the list of asset extensions **
if (config.resolver.assetExts) {
  config.resolver.assetExts.push('riv');
} else {
  config.resolver.assetExts = ['riv'];
}

module.exports = withNativeWind(config, { input: './global.css', outputDir: './node_modules/.cache/nativewind/' }); 