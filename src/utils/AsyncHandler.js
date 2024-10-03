const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        data: error.data || null,
        message: error.message || 'internal server error',
      });
    }
  };
};

export { asyncHandler };
