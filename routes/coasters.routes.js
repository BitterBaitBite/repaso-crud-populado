const express = require('express');
const Coaster = require('../models/Coaster.model');
const Park = require('../models/Park.model');
const router = express.Router()

router.get('/', (req, res) => {

    Coaster
        .find()
        .populate('park_id')
        .then((coasters) => {

            // Prueba postman
            // res.json(coasters);
            res.render('pages/coasters/coasters-index', { coasters });

        }).catch((err) => console.error(err)); 
    
});

router.get('/new', (req, res) => {

    Park
        .find()
        .then((parks) => {
            res.render('pages/coasters/new-coaster', { parks });
        });

});

router.post('/new', (req, res) => {

    // Prueba postman
    // res.json(req.body);

    Coaster
        .create(req.body)
        .then(() => {
            res.redirect('/coasters');
        }).catch((err) => console.error(err));
});

router.get('/:id', (req, res) => {

    Coaster
        .findById(req.params.id)
        .populate('park_id')
        .then((coaster) => {

            // Prueba postman
            // res.json(coasters);
            res.render('pages/coasters/coaster-details', { coaster } );

        }).catch((err) => console.error(err));
});

router.post('/:id/eliminar', (req, res) => {

    Coaster
        .findByIdAndDelete(req.params.id)
        .then(() => {

            res.redirect('/coasters');

        }).catch((err) => console.error(err));

});

router.get('/:id/editar', (req, res) => {

    Coaster
        .findById(req.params.id)
        .then((coaster) => {

            Park
                .find()
                .then((parks => res.render('pages/coasters/edit-coaster', { coaster, parks })))
                .catch((err) => console.error(err));
            
        })
        .catch((err) => console.error(err));

});

router.post('/:id/editar', (req, res) => {

    Coaster
        .findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect(`/coasters/${req.params.id}`))
        .catch((err) => console.error(err));

});

module.exports = router;