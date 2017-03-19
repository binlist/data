'use strict';

const csv = require('csv-parser');

const countries = require('iso-3166-1-codes').byAlpha2();
const schemes = new Set([
	'name',
	'amex',
	'diners',
	'visa',
	'mastercard',
	'discover',
	'unionpay',
	'jcb',
]);

const types = new Set([ 'credit', 'debit' ]);
const booleans = new Set([ 'y', 'n' ]);

const file = process.argv[2];

let line = 1;
let previous;

process.stdin
	.pipe(csv())
	.on('data', function( row ){
		line++;

		if (previous && previous.iin_start > row.iin_start)
			error('incorrect position (sort order)', line);

		if (!schemes.has(row.scheme))
			error('unknown scheme', line);

		if (row.number_length && !row.number_length.match(/^1[3-9]$/))
			error('invalid card number length (13-19)', line);

		if (!row.iin_start) {
			error('missing start IIN', line);
		} else if (!row.iin_start.match(/^[0-9]{1,8}$/)) {
			error('invalid start IIN', line);
		}

		if (row.iin_end) {
			if (!row.iin_end.match(/^[0-9]{1,8}$/)) {
				error('invalid end IIN', line);
			} else if (row.iin_end.length !== row.iin_start.length) {
				error('start and end IIN should have the same length', line);
			} else if (+row.iin_end <= +row.iin_start) {
				error('end IIN should be numerically larger than the start IIN', line);
			}
		}

		if (row.type && !types.has(row.type))
			error('unknown type', line);

		if (row.country && !countries.has(row.country))
			error('unknown country', line);

		if (row.prepaid && !booleans.has(row.prepaid))
			error('invalid prepaid (y/n)', line);

		if (row.prepaid === 'y' && row.type !== 'debit')
			error('a prepaid card must a debit card', line);

		previous = row;
	});

function error( text, line, ...params ){
	process.exitCode = 1;

	console.error('At line %s: '+text, line, ...params);
}
