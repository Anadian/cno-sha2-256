#!/usr/bin/env node
/**
# [lib.js](src/lib.js)
> `cno-sha2-256`: Micropackage: an implementation-agnostic module for getting a SHA2-256 hash digest for a Node Buffer.

Author: Anadian

Code license: MIT
```
	Copyright 2024 Anadian
	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:
	The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
Documentation License: [![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)
> The source-code comments and documentation are written in [GitHub Flavored Markdown](https://github.github.com/gfm/).

*/

//# Dependencies
	//## Internal
	//## Standard
	import CryptoNS from 'node:crypto';
	//import TypesNS from 'node:util/types';
	//## External
//# Constants
const FILENAME = 'lib.js';
const MULTIHASH_PREFIX = Buffer.from( [ 0x12, 0x20 ] ); 
//## Errors

//# Global Variables
/**## Functions*/
/**
### getSHA2FromU8A
> A pure javascript implementation of the SHA2 suite.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_options | object | Run-time options. \[default: {}\] |

##### `options` Properties
| name | type | default | description |
| noop | boolean | false | Skip primary functionality. |
| noDefaults | boolean | false | Don't apply static default options. |
| noDynamic | boolean | false | Don't apply dynamic default options. |
| message | Uint8Array | null | The message or data, as a `Uint8Array`, to be cryptographically hashed and digested. |
| bits | number | 256 | The digest size in bits; valid values are: 224, 256, 384, and 512. |

#### Returns
| type | description |
| --- | --- |
| Uint8Array | The SHA2 digest as a `Uint8Array`. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function getSHA2FromU8A( input_options = {} ){
	const FUNCTION_NAME = 'getSHA2FromU8A';
	const DEFAULT_OPTIONS = {
		noop: false, // Skip primary functionality.
		noDefaults: false, // Don't apply static default options.
		noDynamic: false, // Don't apply dynamic default options.
		message: null, // The message or data, as a `Uint8Array`, to be cryptographically hashed and digested.
		bits: 256, // The digest size in bits; valid values are: 224, 256, 384, and 512.
	};//Variables
	var arguments_array = Array.from(arguments);
	var _return = null;
	var return_error = null;
	var options = {};
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Parametre checks
	if( typeof(input_options) !== 'object' ){
		return_error = new TypeError('Param "input_options" is not of type object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	// Options
	if( input_options.noDefaults !== true ){
		options = Object.assign( options, DEFAULT_OPTIONS, input_options );
	} else{
		options = Object.assign( options, input_options );
	}
	if( options.noop !== true ){
		// Function
	} // noop
	//Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getSHA2FromU8A

/**
### getSHA256FromBuffer
> Returns a Node Buffer containing the SHA2-256 digest of the given buffer.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_options | object | Run-time options. \[default: {}\] |

##### `options` Properties
| name | type | default | description |
| noop | boolean | false | Skip primary functionality. |
| noDefaults | boolean | false | Don't apply static default options. |
| noDynamic | boolean | false | Don't apply dynamic default options. |
| buffer | Buffer | null | A NodeJS Buffer to be hash-digested. |
| prefix | boolean | false | Whether to prefix the resultant Buffer with a [MultiHash](https://multiformats.io/multihash/) code. |

#### Returns
| type | description |
| --- | --- |
| Buffer | A NodeJS Buffer containing the SHA2-256 hash digest. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function getSHA256FromBuffer( input_options = {} ){
	const FUNCTION_NAME = 'getSHA256FromBuffer';
	const DEFAULT_OPTIONS = {
		noop: false, // Skip primary functionality.
		noDefaults: false, // Don't apply static default options.
		noDynamic: false, // Don't apply dynamic default options.
		buffer: null, // A NodeJS Buffer to be hash-digested.
		prefix: false, // Whether to prefix the resultant Buffer with a [MultiHash](https://multiformats.io/multihash/) code.
	};
	// Variables
	var arguments_array = Array.from(arguments);
	var _return = null;
	var return_error = null;
	var options = {};
	var buffer = null;
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	// Parametre checks
	if( typeof(input_options) !== 'object' ){
		return_error = new TypeError('Param "input_options" is not of type object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	// Options
	if( input_options.noDefaults !== true ){
		options = Object.assign( options, DEFAULT_OPTIONS, input_options );
	} else{
		options = Object.assign( options, input_options );
	}
	if( options.noop !== true ){
		// Function
		var hasher = CryptoNS.createHash( 'sha256' );
		if( Buffer.isBuffer( options.buffer ) === true ){
			buffer = options.buffer;
		} else{
			buffer = Buffer.from( options.buffer );
		}
		hasher.update( buffer );
		if( options.prefix === true ){
			_return = Buffer.concat( [ MULTIHASH_PREFIX, hasher.digest() ] );
		} else{
			_return = hasher.digest();
		}
	} // noop
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getSHA256FromBuffer

const NAMESPACE = {
	MULTIHASH_PREFIX: MULTIHASH_PREFIX,
	getSHA256FromBuffer: getSHA256FromBuffer
};
export { NAMESPACE as default, getSHA256FromBuffer };

// lib.js EOF

