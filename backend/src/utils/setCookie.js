const setCookie = (res, token, refreshToken) => {
  res.clearCookie('refreshToken');

  res.cookie('token', token, {
    httpOnly: false,
    maxAge: 1000 * 60,
    secure: true,
    sameSite: 'strict',
    // domain: process.env.FRONT_URL,
    path: '/',
    signed: true,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    secure: true,
    sameSite: 'strict',
    // domain: process.env.FRONT_URL,
    signed: true,
  });
};

export default setCookie;
