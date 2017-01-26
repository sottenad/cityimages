var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://localhost:5432/puppies';
var cn = {
  host: 'localhost',
  port: 5432,
  database: 'cities',
  user: 'SteveO',
  password: 'stepheno'
}
var db = pgp(cn);

// add query functions

function getAllCities(req, res, next) {
  db.any('select * from cityImages')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Images'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleCity(req, res, next) {
  db.one('select * from cityImages where id = $1', req.params.id).then(function(data){
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'City Found'
    });
  });
}

function createCity(req, res, next) {
  db.none('insert into cityImages(name, latitude, longitude, image) values($1, $2, $3, $4)',
    [req.body.name, req.body.latitude, req.body.longitude, req.body.image])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one City'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function updateCity(req, res, next) {
  db.none('update cityImages set name=$1, latitude=$2, longitude=$3, image=$4 where id=$5',
  [req.body.name, req.body.latitude, req.body.longitude, req.body.image, parseInt(req.params.id)])
    .then(function (data) {
      console.log(data);
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated City'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeCity(req, res, next) {
  var cityId = parseInt(req.params.id);
  db.result('delete from cityImages where id = $1', cityId)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} Cities`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllCities: getAllCities,
  getSingleCity: getSingleCity,
  createCity: createCity,
  updateCity: updateCity,
  removeCity: removeCity
};


