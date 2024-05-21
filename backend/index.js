import { app } from './src/app.js';

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`#뭐해먹지? 백엔드 서버를 시작하였습니다.  http://localhost:${PORT}`);
});

console.log(process.env.SERVER_PORT)