const express = require('express');
const { isEmptyPark } = require('../middleware');
const Park = require('../models/Park.model');
const router = express.Router();

router.get('/', (req, res) => {
	Park.find()
		.then((parks) => {
			res.render('pages/parks', { parks });
		})
		.catch((err) => console.error(err));
});

router.get('/new', (req, res) => {
	res.render('pages/parks/new-park');
});

router.post('/new', isEmptyPark, (req, res) => {
	Park.create(req.body)
		.then(() => {
			res.redirect('/parks');
		})
		.catch((err) => console.error(err));
});

module.exports = router;
