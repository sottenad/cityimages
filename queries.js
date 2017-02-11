//QUERIES RETURNS THE RAW DATA.
//IF YOU JUST WANT A FULL RESPONSE, USE THE API ENDPOINTS

var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db;
var cn = {
  host: 'localhost',
  port: 5432,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}

if(process.env.ISLOCAL){
  var db = pgp(cn);
}else{
  pgp.pg.defaults.ssl = true;
  var db = pgp(process.env.DATABASE_URL);
}


// add query functions

function getAllCities(req, res, next) {
  var d = db.any('select * from cityImages').then(function (data) { return data });
  return d;
}

function getSingleCity(req, res) {
  var d = db.one('select * from cityImages where id = $1', req.params.id).then(function(data){ 
    console.log(data);
    return data 
  });
  return d;
}

function createCity(req, res, next) {
  var d = db.none('insert into cityImages(name, latitude, longitude, image) values($1, $2, $3, $4)',
    [req.body.name, req.body.latitude, req.body.longitude, req.body.image])
    .then(function () {
      return {
          status: 'success',
          message: 'Inserted one City'
        };
    })
  return d;
}


function updateCity(req, res, next) {
  var d = db.none('update cityImages set name=$1, latitude=$2, longitude=$3, image=$4 where id=$5',
  [req.body.name, req.body.latitude, req.body.longitude, req.body.image, parseInt(req.params.id)])
    .then(function (data) {
        return {
          status: 'success',
          message: 'Updated City'
        };
    })
  return d;
}

function removeCity(req, res, next) {
  var cityId = parseInt(req.params.id);
  var d = db.result('delete from cityImages where id = $1', cityId)
    .then(function (result) {
      /* jshint ignore:start */
      return {
          status: 'success',
          message: `Removed ${result.rowCount} Cities`
        };
      /* jshint ignore:end */
    })
    return d;
}

module.exports = {
  getAllCities: getAllCities,
  getSingleCity: getSingleCity,
  createCity: createCity,
  updateCity: updateCity,
  removeCity: removeCity
};


