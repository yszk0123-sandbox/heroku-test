const express = require('express');
const { config } = require('./config');

const createRouter = () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    let count = 0;
    if (req.session) {
      count = req.session.count || 0;
      req.session.count = count + 1;
    }

    res.json(`Hello ${config.name}! (${count} views)`);
  });

  router.get('/todos', async (req, res) => {
    const result = await req.client.query('SELECT * FROM todos');
    const todos = result.rows;
    res.json(todos);
  });

  router.post('/todo', async (req, res) => {
    const { text, done } = req.body;

    const result = await req.client.query(
      'INSERT INTO todos (text, done) VALUES ($1, $2) RETURNING *',
      [text, done]
    );
    const newTodo = result.rows[0];

    res.json(newTodo);
  });

  return router;
};

module.exports = { createRouter };
