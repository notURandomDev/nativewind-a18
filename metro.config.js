const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// 获取 Expo 默认配置
const config = getDefaultConfig(__dirname);

// 添加 SVG 支持
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
};

// 应用 NativeWind 配置
module.exports = withNativeWind(config, { input: './global.css' });
