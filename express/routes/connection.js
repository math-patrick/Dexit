var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.send('api test');
  // res.render('index', { title: 'Express' });
});

module.exports = router;