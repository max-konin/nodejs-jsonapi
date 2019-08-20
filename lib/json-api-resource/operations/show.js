module.exports = (baseQuery, request) => {
  return baseQuery.where('id', request.params.recordId).fetch();
};
