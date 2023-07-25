import jwt from 'jsonwebtoken';

/*
 * 액세스 토큰과 리프레시 토큰을 생성해주는 모듈
 */

const accessKey = process.env.JWT_ACCESS_KEY;
const refreshKey = process.env.JWT_REFRESH_KEY;

const JwtSign = ({ email, provider }) => {
  const payload = { email, provider };
  const token = jwt.sign(payload, accessKey, {
    algorithm: 'HS256',
    expiresIn: '30m',
  });

  const refreshToken = jwt.sign(payload, refreshKey, {
    algorithm: 'HS256',
    expiresIn: '14d',
  });
  return { token, refreshToken };
};

export default JwtSign;
