module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
          root: ['.'],
          alias: {
            '@api': './src/api',
            '@assets': './src/assets',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@routes': './src/routes',
            '@pages': './src/pages',
            '@constants': './src/constants',
            '@scenes': './src/scenes',
            '@theme': './src/theme',
            '@utils': './src/utils',
            '@env': './src/env.ts',
            '@models': './src/api/models',
            '@auth': './src/api/auth',
            '@pages': './src/pages',
            '@service': './src/service',
            '@context': './src/context'
          },
        }],
      'nativewind/babel',
      'module:react-native-dotenv'
    ],
  };
};
