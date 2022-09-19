import express from 'express';

const api = express.Router();

api.get('/test', (_, res) => {
  res.send('hello');
});

api.all('*', () => {
  throw new Error('Not found...');
});

export default api;
