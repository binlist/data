# binlist-data

This repository is part of https://binlist.net where it constitutes roughly 2
% of the data.

See the website for documentation and examples of how to query the service.

[![Build status](https://api.travis-ci.org/binlist/data.svg)][BUILDSTATUS]

A public repository of Issuer Identification Numbers ([IIN][IIN]) also called
the "Bank Identification Numbers" ([BIN][BIN]).

## Contributing

1. Edit or add to `ranges.csv` (sorted by IIN/BIN)
2. Run `npm test`
3. Open a pull request

## Related projects

- [Binlist.net client (JavaScript)](https://github.com/paylike/binlookup)
- [Luhn (ISO/IEC 7812-1) checker and algorithm](https://github.com/paylike/luhn)
- [ISO 3166-1 (country) codes](https://github.com/srcagency/iso-3166-1-codes)
- [Map of countries to currencies](https://github.com/srcagency/country-currencies)
- [Longitude and latitude of ISO countries](https://github.com/srcagency/country-coords)
- [Emoji flags from ISO 3166-1 alpha2 code](https://github.com/srcagency/country-to-emoji-flag)
- [Localized amount formatting (JavaScript)](https://github.com/srcagency/amount-format)

## Reach out

Doing anything interesting with binlist, or want to share your favorite tips
and tricks? Please open an issue and we will add a section to the README.

[BIN]: http://en.wikipedia.org/wiki/Bank_card_number
[IIN]: http://en.wikipedia.org/wiki/Bank_card_number
[BUILDSTATUS]: https://travis-ci.org/binlist/data/builds
