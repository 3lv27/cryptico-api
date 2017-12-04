const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ welcome: 'sICO API' });
});

module.exports = router;
