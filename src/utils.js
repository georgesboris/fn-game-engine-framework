const flattenDeep = require('lodash/flattenDeep');

function flattenModules(data) {
  return {
    app: data.app,
    modules: flattenDeep(modules)
  };
}

function applyEnhancers(enhancers = []) {
  return (data) => {
    return enhancers.reduce((acc, enhancer) => {
      return enhancer(acc)
    }, data);
  };
}

function mapModuleReducers(data) {
  return {
    app: data.app,
    modules: modules.map((m) => m.reducer)
  };
}

module.exports = {
  flattenModules,
  applyEnhancers,
  mapModuleReducers
};
