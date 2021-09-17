module.exports = function (api) {
  api.cache(true);

  const presets = ['next/babel'];
  const plugins = ['inline-react-svg'];

  return {
    presets,
    plugins,
  };
};
