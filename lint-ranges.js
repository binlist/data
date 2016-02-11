'use strict';

const csv = require('csv-parser');

const countries = require('./build/countries.json').map(c => c.alpha2);
const schemes = require('./build/schemes.json').map(c => c.name);

const types = [ 'CREDIT', 'DEBIT' ];

let count = 0;
let previous = null;

process.stdin
	.pipe(csv())
	.on('data', function( row ){
		count++;

		if (previous && previous.iin_start > row.iin_start)
			console.error('At row %s: bad sort order (iin_start)', count);

		if (!~schemes.indexOf(row.scheme))
			console.error('At row %s: unknown scheme: %s', count, row.scheme);

		if (row.number_length && row.number_length.match(/^[1-9][0-9]{12,18}$/))
			console.error('At row %s: bad card number length: %s', count, number_length);

		if (!row.iin_start)
			console.error('At row %s: missing start IIN', count);
		else if (!row.iin_start.match(/^[0-9]{1,8}$/))
			console.error('At row %s: bad start IIN: %s', count, row.iin_start);

		if (row.iin_end && !row.iin_end.match(/^[0-9]{1,8}$/))
			console.error('At row %s: bad end IIN: %s', count, row.iin_end);

		if (row.type && !~types.indexOf(row.type))
			console.error('At row %s: unknown type: %s', count, row.type);

		if (row.country && !~countries.indexOf(row.country))
			console.error('At row %s: unknown country: %s', count, row.country);

		if (row.prepaid && !~[ 'n', 'y' ].indexOf(row.prepaid))
			console.error('At row %s: bad prepaid (y/n): %s', count, row.prepaid);

		previous = row;
	});
