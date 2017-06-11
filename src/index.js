const flow = require('lodash/flow');
const utils = require('./utils');

function loop(go) {
  const nextApp = flow(go.modules)(go.app);
  const shouldContinue = !nextApp.__go__.stop;
  shouldContinue && requestAnimationFrame(() => {
    loop({ app: nextApp, modules: go.modules })
  });
}

function go(_modules = [], enhancers) {
  loop(
    flow([
      utils.flattenModules,
      utils.applyEnhancers(enhancers),
      utils.mapModuleReducers
    ])({
      app: { __go__: {} },
      modules: _modules
    })
  );
}

module.exports = go;
