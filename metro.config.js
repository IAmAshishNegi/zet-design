const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// ** Performance Optimizations **

// Enable minification for better bundle size
config.transformer.minifierConfig = {
  keep_classnames: true,
  keep_fnames: true,
  mangle: {
    keep_classnames: true,
    keep_fnames: true,
  },
};

// Optimize asset resolution
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// ** Add 'riv' to the list of asset extensions **
if (config.resolver.assetExts) {
  config.resolver.assetExts.push('riv');
} else {
  config.resolver.assetExts = ['riv'];
}

// ** Tree-shaking optimization **
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true, // Enable inline requires for better performance
  },
});

// ** Bundle splitting configuration **
config.serializer = {
  ...config.serializer,
  createModuleIdFactory: () => {
    return (path) => {
      // Generate shorter module IDs for production builds
      let name = path.substr(path.lastIndexOf('/') + 1);
      if (name.endsWith('.js')) {
        name = name.substr(0, name.length - 3);
      }
      return name;
    };
  },
};

module.exports = withNativeWind(config, { 
  input: './global.css', 
  outputDir: './node_modules/.cache/nativewind/' 
}); 