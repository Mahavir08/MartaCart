module.exports = (func) => async (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);
