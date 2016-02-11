'use strict';

const map = require('through2-map').obj;
const fromCsv = require('csv-parser');
const toCsv = require('csv-write-stream');

process.stdin
	.pipe(fromCsv())
	.pipe(map(function( row ){
		let scheme = row.card_brand
				.replace('MAESTRO', 'MASTERCARD')
				.replace('DINERS CLUB', 'DINERS')
				.replace('DINERS INTERNATIONAL', 'DINERS')
				.replace('AMERICAN EXPRESS', 'AMEX');

		let brand = row.card_sub_brand;

		if (!brand && scheme !== row.card_brand)
			brand = row.card_brand;

		brand = brand
			.replace('MAESTRO', 'Maestro')
			.replace('DANKORT', 'Visa/Dankort');

		return {
			iin_start: row.iin,
			iin_end: null,
			number_length: null,
			scheme: scheme,
			brand: brand,
			type: row.card_type
				.replace('PREPAID', 'DEBIT'),
			prepaid: row.card_type === 'PREPAID' ? 'y' : null,
			country: row.country_code
				.replace('QZ', 'XK'),
			bank_name: row.bank_name,
			bank_logo: null,
			bank_url: row.bank_url,
			bank_phone: row.bank_phone,
			bank_city: row.bank_city,
		};
	}))
	.pipe(toCsv())
	.pipe(process.stdout);
