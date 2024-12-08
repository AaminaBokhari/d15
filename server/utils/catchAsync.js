export const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message
      });
    });
  };
};