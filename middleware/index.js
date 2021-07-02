const Park = require('./../models/Park.model');

module.exports = {
	isEmptyPark: (req, res, next) => {
		const { name, description } = req.body;
		if (name.length > 0 && !name.match(/^ +$/) && description.length > 0 && !description.match(/^ +$/)) next();
		else if (req.baseurl === '/parks/new') res.render('pages/parks/new-park', { errorMsg: 'Todos los campos son obligatorios' });
	},

	isEmptyCoaster: (req, res, next) => {
		const { name, description, inversions, length, active, park_id, parks } = req.body;
		const coaster = { name, description, inversions, length, active, park_id };
		console.log(req.url);

		if (
			name.length > 0 &&
			!name.match(/^ +$/) &&
			description.length > 0 &&
			!description.match(/^ +$/) &&
			inversions.length > 0 &&
			!inversions.match(/^ +$/) &&
			length.length > 0 &&
			!length.match(/^ +$/) &&
			park_id.length > 0 &&
			!park_id.match(/^ +$/)
		)
			next();
		else if (req.url == '/new')
			Park.find().then((parks) => {
				res.render('pages/coasters/new-coaster', {
					parks,
					errorMsg: 'Todos los campos son obligatorios',
				});
			});
		else
			Park.find().then((parks) => {
				res.render('pages/coasters/edit-coaster', {
					coaster,
					parks,
					errorMsg: 'Todos los campos son obligatorios',
				});
			});
	},
};
