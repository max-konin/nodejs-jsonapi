const { flow } = require('lodash');

const applyFilters = pipelineObject => {
  // TODO: implement filtering
  return pipelineObject;
};

const applySorting = pipelineObject => {
  // TODO: implement sorting
  return pipelineObject;
};

const fetch = pipelineObject => pipelineObject.query.fetchAll();

module.exports = async (baseQuery, request) => {
  return flow([applyFilters, applySorting, fetch])({
    query: baseQuery,
    request
  });
};
