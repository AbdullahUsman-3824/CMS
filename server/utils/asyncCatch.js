// Utility function to catch and forward errors in async route handlers
module.exports = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};
