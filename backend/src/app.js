import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Team02');
});
export { app };
