require("dotenv/config");

require('./index');

const Coaster = require('./../models/Coaster.model');
const Park = require('./../models/Park.model');

const coasters = require('./coasters.json');
const parks = require('./parks.json');

// console.log(coasters, parks);
Park.collection.drop();
Coaster.collection.drop();

Park
    .create(parks)
    .then(parksRes => console.log(`Se han creado ${parksRes.length} parques`))
    .catch(err => console.error(err));

Coaster
    .create(coasters)
    .then(coastersRes => console.log(`Se han creado ${coastersRes.length} montañas rusas correctamente`))
    .catch(err => console.error(err));