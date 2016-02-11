'use strict';

const equal = require('deep-equal');
const fromCsv = require('csv-parser');
const toCsv = require('csv-write-stream');

const rows = process.stdin.pipe(fromCsv());

const out = toCsv();

out.pipe(process.stdout);

let buffer = null;

rows
	.on('data', function( row ){
		if (!buffer){
			buffer = row;
		} else if ((+buffer.iin_end || +buffer.iin_start) + 1 === +row.iin_start
			&& row.iin_start.length === buffer.iin_start.length
			&& equal(Object.assign({}, buffer, {
				iin_start: row.iin_start,
				iin_end: '',
			}), row)
		) {
			buffer.iin_end = row.iin_start;
		} else {
			out.write(buffer);
			buffer = row;
		}
	})
	.on('finish', function(){
		out.write(buffer);
		out.write(null);
	});
