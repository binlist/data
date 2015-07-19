binlist-data
=========

[![Build status](https://api.travis-ci.org/binlist/binlist-data.svg)][BUILDSTATUS]

A public repository of Issuer Identification Numbers ([IIN][IIN]) also 
called the "Bank Identification Numbers" ([BIN][BIN]).

TODO
====
We hope that folks will create pull requests to add and correct the records.

Credits
=======
This repository is part of http://www.binlist.net/

Contributing
============
1. Open the `iin-user-contributions.csv`
2. Edit or Add your entry and make sure to keep the file alphabetical sorted by IIN/BIN.
3. Test that everything works as expected by running `bundle exec csvlint -d -s iin-user-contributions.schema.json iin-user-contributions.csv` and `rake`
4. Send a pull request.

[BIN]: http://en.wikipedia.org/wiki/Bank_card_number
[IIN]: http://en.wikipedia.org/wiki/Bank_card_number
[BUILDSTATUS]: https://travis-ci.org/binlist/binlist-data/builds
