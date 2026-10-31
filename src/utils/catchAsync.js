// Async error handler wrapper — keyin ishlatiladi
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
