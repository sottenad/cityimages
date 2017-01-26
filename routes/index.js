var express = require('express');
var router = express.Router();

var db = require('../queries');



router.get('/api/cities', db.getAllCities);
router.get('/api/cities/:id', db.getSingleCity);
router.post('/api/cities', db.createCity);
router.put('/api/cities/:id', db.updateCity);
router.delete('/api/cities/:id', db.removeCity);


module.exports = router;
