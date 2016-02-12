'use strict';

const csv = require('csv-parser');
const map = require('through2-map').obj;
const JSONStream = require('JSONStream');

process.stdin
	.pipe(csv())
	.pipe(map(function( country ){
		country.latitude = +country.latitude;
		country.longitude = +country.longitude;

		return country;
	}))
	.pipe(JSONStream.stringify())
	.pipe(process.stdout);
