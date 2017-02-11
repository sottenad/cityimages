//API RETURNS A RESPONSE TO THE REQUEST.
//IF YOU JUST WANT THE DATA, NOT A FULL RESPONSE, USE THE QUERIES LIBRARY

var db = require('./queries');

function getAllCities(req, res, next) {
  db.getAllCities(req, res)
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
  db.getSingleCity(req, res).then(function(data){
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'City Found'
    });
  })
  .catch(function (err) {
      return next(err);
    });
}

function createCity(req, res, next) {
  db.createCity(req,res)
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
  db.updateCity(req,res)
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
  db.removeCity(req,res)
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
