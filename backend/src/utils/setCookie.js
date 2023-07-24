const setCookie = (res, token, refreshToken) => {
  res.cookie('token', token, {
    httpOnly: false,
    maxAge: 1000 * 60,
    secure: false,
    sameSite: 'strict',
    // domain: process.env.FRONT_URL,
    path: '/',
    signed: true,
  });

  if (refreshToken) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14,
      secure: false,
      sameSite: 'strict',
      // domain: process.env.FRONT_URL,
      signed: true,
    });
  }
};

export default setCookie;
