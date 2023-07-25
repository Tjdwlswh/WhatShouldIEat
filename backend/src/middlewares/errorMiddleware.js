//에러처리 미들웨어
const errorMiddleWare = (error, req, res, next) => {
  console.log('\x1b[33m%s\x1b[0m', error);
  res.status(error.status || 400).json({
    code: error.status,
    type: error.type,
    error: error.message
  });
};

export { errorMiddleWare };
