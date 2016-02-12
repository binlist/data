'use strict';

const equal = require('deep-equal');
const fromCsv = require('csv-parser');
const toCsv = require('csv-write-stream');
const through = require('through2').obj;

let buffer = null;

process.stdin
	.pipe(fromCsv())
	.pipe(through(function( row, e, cb ){
		if (!buffer){
			buffer = row;
		} else if (proceeds(buffer, row)) {
			buffer.iin_end = row.iin_end || row.iin_start;
		} else {
			this.push(buffer);
			buffer = row;
		}

		cb();
	}, function( cb ){
		this.push(buffer);
		cb();
	}))
	.pipe(toCsv())
	.pipe(process.stdout);

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
