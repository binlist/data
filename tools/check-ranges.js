'use strict';

const fs = require('fs');
const csv = require('csv-parser');

const countries = require('../build/countries.json').map(c => c.alpha2);
const schemes = require('../build/schemes.json').map(c => c.name);

const types = [ 'CREDIT', 'DEBIT' ];

const file = process.argv[2];

let count = 0;
let previous = null;

process.stdin
	.pipe(csv())
	.on('data', function( row ){
		count++;

		if (previous && previous.iin_start > row.iin_start)
			error('bad sort order (iin_start)', count);

		if (!~schemes.indexOf(row.scheme))
			error('unknown scheme: %s', count, row.scheme);

		if (row.number_length && row.number_length.match(/^[1-9][0-9]{12,18}$/))
			error('bad card number length: %s', count, number_length);

		if (!row.iin_start)
			error('missing start IIN', count);
		else if (!row.iin_start.match(/^[0-9]{1,8}$/))
			error('bad start IIN: %s', count, row.iin_start);

		if (row.iin_end) {
			if (!row.iin_end.match(/^[0-9]{1,8}$/))
				error('bad end IIN: %s', count, row.iin_end);
			else if (row.iin_end.length !== row.iin_start.length)
				error('start and end IIN should have the same length', count);
		}

		if (row.type && !~types.indexOf(row.type))
			error('unknown type: %s', count, row.type);

		if (row.country && !~countries.indexOf(row.country))
			error('unknown country: %s', count, row.country);

		if (row.prepaid && !~[ 'n', 'y' ].indexOf(row.prepaid))
			error('bad prepaid (y/n): %s', count, row.prepaid);

		if (row.prepaid === 'y' && row.type !== 'DEBIT')
			error('a prepaid card must be of type DEBIT', count);

		previous = row;
	});

function error( row ){
	process.exitCode = 1;

	const a = Array.prototype.splice.call(arguments, 0);

	a[0] = 'At row %s: '+a[0];

	console.error.apply(console, a);
}
