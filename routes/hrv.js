const express = require('express');
const router = express.Router();
const spawn = require('child_process').spawn;

router.get('/hrv-data', (req, res) => {
  const process = spawn('python', ['./scripts/python_test.py']);
  let result = '';

  process.stdout.on('data', (data) => {
    result += data.toString();
  });

  process.on('close', () => {
    const jsonData = JSON.parse(result);
    res.json(jsonData);
  });
});

module.exports = router;
