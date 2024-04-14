# cno-sha2-256
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Semantic Versioning 2.0.0](https://img.shields.io/badge/semver-2.0.0-brightgreen?style=flat-square)](https://semver.org/spec/v2.0.0.html)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![License](https://img.shields.io/github/license/Anadian/cno-sha2-256)](https://github.com/Anadian/cno-sha2-256/blob/main/LICENSE)
[![ci](https://github.com/Anadian/cno-sha2-256/actions/workflows/ci.yml/badge.svg)](https://github.com/Anadian/cno-sha2-256/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/Anadian/cno-sha2-256/badge.svg?branch=main)](https://coveralls.io/github/Anadian/cno-sha2-256?branch=main)
[![NPM Version](https://img.shields.io/npm/v/cno-sha2-256)](https://www.npmjs.com/package/cno-sha2-256)

> Micropackage: an implementation-agnostic module for getting a SHA2-256 hash digest for a Node Buffer.
# Table of Contents
- [Background](#Background)
- [Install](#Install)
- [Usage](#Usage)
- [API](#API)
- [Contributing](#Contributing)
- [License](#License)
# Background
Available on the [npm registry](https://www.npmjs.com/package/cno-sha2-256) as `cno-sha2-256`.
Add it to project with [pnpm](https://pnpm.io/cli/add):
```sh
pnpm add --save cno-sha2-256
```
It can, of course, also be installed by [npm](https://docs.npmjs.com/cli/v8/commands/npm-install) or [yarn](https://yarnpkg.com/getting-started/usage) using the normal methods.
# Usage
```js
import SHA2Namespace from 'cno-sha2-256'; // Default export is a full "namespace".
import { getSHA256FromBuffer } from 'cno-sha2-256'; // Just the function.
```
# API
# Contributing
Changes are tracked in [CHANGELOG.md](CHANGELOG.md).
# License
MIT ©2024 Anadian

SEE LICENSE IN [LICENSE](LICENSE)

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)This project's documentation is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
