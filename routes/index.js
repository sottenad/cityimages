var express = require('express');
var router = express.Router();

var upload = require('../upload.js');
var db = require('../queries');
var api = require('../api');

router.get('/', function(req, res){
    res.render('index', {"title": "Steve"});
})
router.get('/add', function(req, res){
    var data = db.getAllCities().then(function(data){
        console.log(data);
        res.render('add', {"data":data});
    });
})

router.get('/view', function(req, res){
    var data = db.getAllCities().then(function(data){
        res.render('viewall', {"data":data});
    });
})

router.get('/view/:id', function(req, res){
    var data = db.getSingleCity(req, res).then(function(data){
        res.render('view', {"data":data});
    });
})

router.get('/edit/:id', function(req, res){
    var data = db.getSingleCity(req, res).then(function(data){
        res.render('edit', {"data":data});
    });
})

router.get('/api/cities', api.getAllCities);
router.get('/api/cities/:id', api.getSingleCity);
router.post('/api/cities', api.createCity);
router.put('/api/cities/:id', api.updateCity);
router.delete('/api/cities/:id', api.removeCity);

router.get('/sign-s3', upload.signS3);

module.exports = router;
