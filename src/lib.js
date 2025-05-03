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
	import FSNS from 'node:fs/promises';
	//import TypesNS from 'node:util/types';
	//## External
	import * as NanoID from 'nanoid';
//# Constants
const FILENAME = 'lib.js';
const MULTIHASH_PREFIX = Buffer.from( [ 0x12, 0x20 ] ); 
//## Errors

//# Global Variables
/**## Functions*/
function getNowString(){
	var datetime = new Date();
	return datetime.toISOString();
}
/**
### addSHA256PrefixToBuffer
> Adds the [MultiHash](https://multiformats.io/multihash/) prefix to the start of the digest buffer.

#### Parametres
| name | type | description |
| --- | --- | --- |
| buffer | buffer | The buffer to wich prepend `MULTIHASH_PREFIX`.  |

#### Returns
| type | description |
| --- | --- |
| Buffer | A NodeJS Buffer of the hash digest prefixed with the MultiHash identifier code. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function addSHA256PrefixToBuffer( buffer ){
	const FUNCTION_NAME = 'addSHA256PrefixToBuffer';
	// Variables
	//var arguments_array = Array.from(arguments);
	var _return = null;
	//var return_error = null;
	//this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	// Parametre checks
	// Function
	_return = Buffer.concat( [ MULTIHASH_PREFIX, buffer ] );
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // addSHA256PrefixToBuffer
/**
### removeSHA256PrefixFromBuffer
> Removes the MultiHash SHA2-256 identification bytes from the start of the given buffer.

#### Parametres
| name | type | description |
| --- | --- | --- |
| buffer | object | The buffer.  |

#### Returns
| type | description |
| --- | --- |
| Buffer | A buffer without the MultiHash prefix. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function removeSHA256PrefixFromBuffer( buffer ){
	const FUNCTION_NAME = 'removeSHA256PrefixFromBuffer';
	// Variables
	//var arguments_array = Array.from(arguments);
	var _return = null;
	//this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	// Parametre checks
	// Function
	_return = buffer.subarray( 2 );
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // removeSHA256PrefixFromBuffer
/**
### addReadStreamToFilehandle
> Attaches a read stream to the filehandle which will be automatically destroyed when the file closes.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_options | object | Run-time options. \[default: {}\] |

##### `options` Properties
| name | type | default | description |
| --- | --- | --- | --- |
| noop | boolean | false | Skip primary functionality. |
| noDefaults | boolean | false | Don't apply static default options. |
| noDynamic | boolean | false | Don't apply dynamic default options. |
| filehandle | [FileHandle](https://nodejs.org/docs/latest/api/fs.html#class-filehandle) | undefined | The filehandle for which to create a new read stream and attach it to the main filehandle. |

#### Returns
| type | description |
| --- | --- |
| [FileHandle](https://nodejs.org/docs/latest/api/fs.html#class-filehandle) | Filehandle with the read stream added via the `filehandle.managedReadStreams` array property. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function addReadStreamToFilehandle( input_options = {} ){
	const FUNCTION_NAME = 'addReadStreamToFilehandle';
	const DEFAULT_OPTIONS = {
		noop: false, // Skip primary functionality.
		noDefaults: false, // Don't apply static default options.
		noDynamic: false, // Don't apply dynamic default options.
		filehandle: undefined // The filehandle for which to create a new read stream and attach it to the main filehandle.
	};// Variables
	var arguments_array = Array.from(arguments);
	var _return = null;
	var return_error = null;
	var options = {};
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
		if( options.filehandle != null && typeof(options.filehandle) === 'object' ){
			if( Array.isArray(options.filehandle?.managedReadStreams) == false ){
				options.filehandle.managedReadStreams = [];
				options.filehandle.on( 'close', () => {
					for( var i = 0; i < options.filehandle.managedReadStreams.length; i++ ){
						options.filehandle.managedReadStreams[i].destroy( null, () => {
							this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `stream#${options.filehandle.managedReadStreams[i].uid} destroy()`});
						} );
					}
				} );
			}
			var temp_read_stream = options.filehandle.createReadStream( { autoClose: false, start: 0 } );
			temp_read_stream.uid = NanoID.nanoid();
			temp_read_stream.createdAt = getNowString();

			_return = ( options.filehandle.managedReadStreams.push( temp_read_stream ) - 1 );
		} else{
			return_error = new TypeError('Invalid option property: "filehandle" must be an instance of NodeJS\'s FileHandle class.');
			return_error.code = 'ERR_INVALID_ARG_VALUE';
			throw return_error;
		}
	} // noop
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // addReadStreamToFilehandle

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
/* c8 ignore start */
/*function getSHA2FromU8A( input_options = {} ){
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
		options = Object.assign( options, input_options )
	}
	if( options.noop !== true ){
		// Function
	} // noop
	//Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getSHA2FromU8A */
/* c8 ignore stop */

/**
### getSHA256FromBufferSync
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
function getSHA256FromBufferSync( input_options = {} ){
	const FUNCTION_NAME = 'getSHA256FromBufferSync';
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
			_return = addSHA256PrefixToBuffer( hasher.digest() );
		} else{
			_return = hasher.digest();
		}
	} // noop
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getSHA256FromBufferSync
/**
### getSHA256FromBuffer
> Returns a promise which resolves to the SHA2-256 hash digest, as a Node buffer, of the given buffer.

#### Parametres
| name | type | description |
| --- | --- | --- |
| buffer | Buffer | The buffer to be hashed.  |

#### Returns
| type | description |
| --- | --- |
| Promise | A promise which resolves to a SHA2-256 hash digest as a Node buffer. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function getSHA256FromBuffer( buffer ){
	const FUNCTION_NAME = 'getSHA256FromBuffer';
	// Variables
	//var arguments_array = Array.from(arguments);
	var _return = null;
	var return_error = null;
	//this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	// Parametre checks
	if( Buffer.isBuffer(buffer) !== true ){
		return_error = new TypeError('Param "buffer" is not of type Buffer.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	// Function
	var hasher = CryptoNS.createHash( 'sha256' );
	hasher.update( buffer );
	_return = Promise.resolve( hasher.digest() );
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getSHA256FromBuffer
/**
### getSHA256FromString
> Returns a promise which resolves to the SHA2-256 hash digest of the given string.

#### Parametres
| name | type | description |
| --- | --- | --- |
| string | string | The string to hash.  |

#### Returns
| type | description |
| --- | --- |
| Promise | A promise which resolves to the hash digest as a Node Buffer. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function getSHA256FromString( string ){
	const FUNCTION_NAME = 'getSHA256FromString';
	// Variables
	//var arguments_array = Array.from(arguments);
	var _return = null;
	var return_error = null;
	//this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	// Parametre checks
	if( typeof(string) !== 'string' ){
		return_error = new TypeError('Param "string" is not of type string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	// Function
	_return = getSHA256FromBuffer( Buffer.from( string, 'utf8' ) );
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getSHA256FromString


/**
### getSHA256FromStream
> Directly, asynchronously, gets a SHA2-256 hash digest as a Node Buffer from a Node stream.

#### Parametres
| name | type | description |
| --- | --- | --- |
| stream | stream.Readable | The Readable Stream to whose data is to be hashed.  |

#### Returns
| type | description |
| --- | --- |
| Promise | A promise which resolves to the SHA2-256 hash digest as a Node buffer. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function getSHA256FromStream( stream ){
	const FUNCTION_NAME = 'getSHA256FromStream';
	// Variables
	var _return = null;
	//var return_error = null;
	//this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	// Parametre checks
	// Function
	_return = new Promise( ( resolveFunction, rejectFunction ) => {
		var timeout = setTimeout( rejectFunction, 60000 );
		var hasher = CryptoNS.createHash('sha256');
		stream.on( 'data', ( data_buffer ) => {
			console.error('onData');
			hasher.update( data_buffer );
		} );
		stream.on( 'end', () => {
			console.error('onEnd');
			clearTimeout( timeout );
			resolveFunction( hasher.digest() );
		} );

	} );
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getSHA256FromStream
/**
### getSHA256FromFilehandle
> Gets a SHA2-256 hash digest for a given filehandle.

#### Parametres
| name | type | description |
| --- | --- | --- |
| filehandle | object | The filehandle.  |

#### Returns
| type | description |
| --- | --- |
| Promise | A promise which resolves to a Node buffer of the hash digest. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function getSHA256FromFilehandle( filehandle ){
	const FUNCTION_NAME = 'getSHA256FromFilehandle';
	// Variables
	//var arguments_array = Array.from(arguments);
	var _return = null;
	//var return_error = null;
	//`console.log( 'file: %s function: %s level: %s message: received: %o', FILENAME, FUNCTION_NAME, 'debug', filehandle );
	// Parametre checks
	/*if( typeof(filehandle) !== 'object' ){
		return_error = new TypeError('Param "filehandle" is not of type object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}*/

	// Function
	/* var read_stream = filehandle.createReadStream( { autoClose: false, /*emitClose: false,/ start: 0 } );
	filehandle.on( 'close', () => {
		console.error( 'filehandle on close.' );
		read_stream.destroy( null, () => { // closes filehandle
			console.log( 'In stream.destroy callback.' );
		} );
	} );
	read_stream.on( 'close', () => {
		console.error( 'stream on close.' );
	} );*/
	var index = addReadStreamToFilehandle( { filehandle: filehandle } );
	_return = getSHA256FromStream( filehandle.managedReadStreams[index] ).then(
		( sha256_buffer ) => {
			console.log( 'Before destroying read stream: filehandle: %o', filehandle );
			/* read_stream.destroy( null, () => { // closes filehandle
				console.log( 'In stream.destroy callback.' );
			} ); */
			console.log( 'After destroying read stream: filehandle: %o', filehandle );
			return sha256_buffer;
		}
	);
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getSHA256FromFilehandle
/**
### getSHA256FromFilePath
> Returns a SHA2-256 hash digest for the file at the given path.

#### Parametres
| name | type | description |
| --- | --- | --- |
| path | string | The path of the file to hash.  |

#### Returns
| type | description |
| --- | --- |
| Promise | A promise which resolves to the hash digest as a Node Buffer. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function getSHA256FromFilePath( path ){
	const FUNCTION_NAME = 'getSHA256FromFilePath';
	// Variables
	//var arguments_array = Array.from(arguments);
	var _return = null
	var return_error = null;
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	// Parametre checks
	if( typeof(path) !== 'string' ){
		return_error = new TypeError('Param "path" is not of type string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	// Function
	_return = FSNS.open( path ).then(
		( filehandle ) => {
			_return = getSHA256FromFilehandle( filehandle ).then(
				( hash_buffer ) => {
					filehandle.close();
					return hash_buffer;
				},
				null
			);
			return _return;
		},
		null
	);
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getSHA256FromFilePath

/**
### getSHA256FromOptions
> Gets a SHA2-256 digest of the stream's content when it closes.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_options | object | Run-time options. \[default: null\] |

##### `options` Properties
| name | type | default | description |
| noop | boolean | false | Skip primary functionality. |
| noDefaults | boolean | false | Don't apply static default options. |
| noDynamic | boolean | false | Don't apply dynamic default options. |
| prefix | boolean | false | Whether to prefix the resultant buffer with the [MultiHash](https://multiformats.io/multihash/) prefix code.
| buffer | [Buffer](https://nodejs.org/api/buffer.html#class-buffer) | null | A buffer to hash; if this is specified the following input options will be ignored. |
| stream | [stream.Readable](https://nodejs.org/api/stream.html#class-streamreadable) | null | A NodeJS Readable Stream to be hashed; ignored if `options.buffer` is specified. |
| filehandle | [FileHandle](https://nodejs.org/api/fs.html#class-filehandle) | null | A NodeJS filehandle to be hashed; ignored if `options.buffer` or `options.stream` are specified. |
| path | string | '' | A filesystem path to a file to be hashed; only used if none of the previous input options are used. |

#### Returns
| type | description |
| --- | --- |
| Promise | A promise which resolves with the SHA2-256 digest of the stream's data when the stream closes. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |
| 'ERR_INVALID_ARG_VALUE' | Error | Thrown if none of the input options are specified. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function getSHA256FromOptions( input_options = null ){
	const FUNCTION_NAME = 'getSHA256FromOptions';
	const DEFAULT_OPTIONS = {
		noop: false, // Skip primary functionality.
		noDefaults: false, // Don't apply static default options.
		noDynamic: false, // Don't apply dynamic default options.
		prefix: false,
		buffer: undefined,
		string: undefined,
		stream: undefined, // A NodeJS Readable Stream to be hashed.
		filehandle: undefined,
		path: undefined
	};// Variables
	var arguments_array = Array.from(arguments);
	var _return = null;
	var return_error = null;
	var options = {};
	//this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
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
	console.log('getSHA256FromOptions: options: %o', options);
	if( options.noop !== true ){
		// Function
		console.log('input: buffer %d; string %d; stream %d; filehandle %d; path %d', options.buffer != undefined, options.string != undefined, options.stream != undefined, options.filehandle != undefined, options.path != undefined );
		if( options.buffer ){
			if( Buffer.isBuffer( options.buffer ) ){
				_return = getSHA256FromBuffer( options.buffer );
			} else{
				return_error = new TypeError('"options.buffer" is not a buffer.');
				return_error.code = 'ERR_INVALID_ARG_TYPE';
				throw return_error;
			}
		} else if( options.string != undefined ){
			if( typeof(options.string) === 'string' ){
				_return = getSHA256FromString( options.string );
			} else{
				return_error = new TypeError(`"options.string" is not a string.`);
				return_error.code = 'ERR_INVALID_ARG_TYPE';
				throw return_error;
			}
		} else if( options.stream ){
			console.log('stream');
			_return = getSHA256FromStream( options.stream );
		} else if( options.filehandle ){
			/*const condition = ( options.filehandle instanceof FSNS.FileHandle );
			console.log( 'condition: %d', condition );
			if( options.filehandle instanceof FSNS.FileHandle ){*/
			_return = getSHA256FromFilehandle( options.filehandle );
			/*} else{
				return_error = new TypeError('"options.filehandle" is not a FileHandle.');
				return_error.code = 'ERR_INVALID_ARG_TYPE';
				throw return_error;
			}*/
		} else if( options.path ){
			console.log( 'path: %s', options.path );
			if( typeof(options.path) === 'string' ){
				_return = getSHA256FromFilePath( options.path );
			} else{
				return_error = new TypeError('"options.path" is not a path.');
				return_error.code = 'ERR_INVALID_ARG_TYPE';
				throw return_error;
			}
		} else{
			console.log('no input');
			return_error = new Error('No input option specified.');
			return_error.code = 'ERR_INVALID_ARG_VALUE';
			throw return_error;
		}
		if( options.prefix === true ){
			_return = _return.then(
				( digest_buffer ) => {
					return addSHA256PrefixToBuffer( digest_buffer );
				},
				null
			);
		}
	} // noop
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getSHA256FromOptions

const NAMESPACE = {
	MULTIHASH_PREFIX: MULTIHASH_PREFIX,
	addSHA256PrefixToBuffer: addSHA256PrefixToBuffer,
	removeSHA256PrefixFromBuffer: removeSHA256PrefixFromBuffer,
	getSHA256FromBufferSync: getSHA256FromBufferSync,
	getSHA256FromBuffer: getSHA256FromBuffer,
	getSHA256FromStream: getSHA256FromStream,
	getSHA256FromFilehandle: getSHA256FromFilehandle,
	getSHA256FromFilePath: getSHA256FromFilePath,
	getSHA256FromOptions: getSHA256FromOptions
};
export { NAMESPACE as default, getSHA256FromBufferSync, addSHA256PrefixToBuffer, removeSHA256PrefixFromBuffer, getSHA256FromBuffer, getSHA256FromStream, getSHA256FromFilehandle, getSHA256FromFilePath, getSHA256FromOptions };

// lib.js EOF

