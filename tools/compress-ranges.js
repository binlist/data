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
		} else if (proceeds(buffer, row)) {
			buffer.iin_end = row.iin_end || row.iin_start;
		} else {
			out.write(buffer);
			buffer = row;
		}
	})
	.on('finish', function(){
		out.write(buffer);
		out.write(null);
	});


function proceeds( first, second ){
	if ((+first.iin_end || +first.iin_start) + 1 !== +second.iin_start)
		return;

	if (second.iin_start.length !== first.iin_start.length)
		return;

	if (!equal(Object.assign({}, first, {
			iin_start: second.iin_start,
			iin_end: second.iin_end,
		}), second))
		return;

	return true;
}
