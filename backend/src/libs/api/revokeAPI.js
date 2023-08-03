import axios from 'axios';

const revokeAPI = async (provider, token) => {
  if (provider === 'kakao') {
    console.log('카카오 연결 해지 요청');
    const url = `https://kapi.kakao.com/v1/user/unlink`;

    return await axios({
      url,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
  } else if (provider === 'google') {
    console.log('구글 연결 해지 요청');
    const url = `
    https://oauth2.googleapis.com/revoke?token=${token}`;
    return await axios.post(url);
  }
  return;
};

export { revokeAPI };
