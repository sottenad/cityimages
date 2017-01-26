DROP DATABASE IF EXISTS cities;
CREATE DATABASE cities;

\c cities;

CREATE TABLE cityImages (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  latitude NUMERIC,
  longitude NUMERIC,
  image VARCHAR
);

INSERT INTO cityImages (name, latitude, longitude, image)
  VALUES ('Seattle', 47.6062, 122.3321, 'seattle.jpg');