binlist-data
=========

[![Build status](https://api.travis-ci.org/binlist/binlist-data.svg)][BUILDSTATUS]

A public repository of Issuer Identification Numbers ([IIN][IIN]) also 
called the "Bank Identification Numbers" ([BIN][BIN]).

Contributing
============
1. Open the `iin-user-contributions.csv`
2. Edit or Add your entry and make sure to keep the file alphabetical sorted by IIN/BIN.
3. Test that everything works as expected by running `bundle exec csvlint -d -s iin-user-contributions.schema.json iin-user-contributions.csv` and `rake`
4. Send a pull request.

## Known issues

* Increase BIN/IIN range coverage

## Reach out

Doing anything interesting with binlist or want to share your favorite tips and tricks? Please checkout the wiki then and feel free to reach out with ideas for features or requests.

Credits
=======
This repository is part of http://www.binlist.net/

## LICENSE

Copyright 2014 binlist.net All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.



[BIN]: http://en.wikipedia.org/wiki/Bank_card_number
[IIN]: http://en.wikipedia.org/wiki/Bank_card_number
[BUILDSTATUS]: https://travis-ci.org/binlist/binlist-data/builds
