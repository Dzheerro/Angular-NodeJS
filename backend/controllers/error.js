exports.get404 = (req, res, next) => {
  const error = new Error('Not Found');
  error.statusCode = 404;
  next(error);
};

exports.get500 = (error, req, res, next) => {
  const data = error.data || null;

  try {
    res.status(error.statusCode || 500).json({
      error: {
        message: error.message,
        data: data,
      },
    });
  } catch (jsonError) {
    // Обработка ошибки при отправке JSON
    next(jsonError);
  }
};
