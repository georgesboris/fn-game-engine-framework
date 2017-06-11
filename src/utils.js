const flattenDeep = require('lodash/flattenDeep');

function flattenModules(data) {
  return {
    state: data.state,
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
    ...data,
    modules: modules.map((m) => (data) => {
      return {
        state: m.reducer(data.state, data.statePool),
        statePool: data.statePool
      };
    })
  };
}

module.exports = {
  flattenModules,
  applyEnhancers,
  mapModuleReducers
};
