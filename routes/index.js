var express = require('express');
var router = express.Router();
// const interact = require('interactjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
// module.exports = express;
// module.exports = interact;
