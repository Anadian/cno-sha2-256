#!/usr/bin/env node
/**
# [lib.test.js](src/lib.test.js)
> Tests for [`cno-sha2-256`](./lib.js).

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
	import DefaultExport from './lib.js';
	import * as NamespaceExport from './lib.js';
	import { getSHA256FromBufferSync, addSHA256PrefixToBuffer, removeSHA256PrefixFromBuffer, getSHA256FromBuffer, getSHA256FromStream, getSHA256FromFilehandle, getSHA256FromFilePath, getSHA256FromOptions } from './lib.js';
	//## Standard
	import PathNS from 'node:path';
	import FSNS from 'node:fs/promises';
	//## External
	import Test from 'cno-test';
//# Constants
const FILENAME = 'lib.test.js';
const PANGRAM_STRING = 'The quick brown fox jumps over the lazy dog.';
const PANGRAM_BUFFER = Buffer.from( PANGRAM_STRING );
const PANGRAM_SHA256 = Buffer.from( 'ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c', 'hex' );
const LOREM_STRING = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const LOREM_BUFFER = Buffer.from( LOREM_STRING );
const LOREM_SHA256 = Buffer.from( '2d8c2f6d978ca21712b5f6de36c9d31fa8e96a4fa5d8ff8b0188dfb9e7c171bb', 'hex' );
const EMPTY_STRING = '';
const EMPTY_BUFFER = Buffer.from( EMPTY_STRING );
const EMPTY_SHA256 = Buffer.from( 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'hex' );
const BIG_LOREM_SHA256 = Buffer.from( 'd627b6de282df7559beefeef0b688f5704ce9c0d7a8d27b861d859fac57ec9cf', 'hex' );
const BIG_LOREM_PATH = PathNS.join( 'test', 'big-lorem.txt' );
const TEST_CASE_MATRIX = {
	empty: {
		string: EMPTY_STRING,
		buffer: EMPTY_BUFFER,
		sha256: EMPTY_SHA256
	},
	pangram: {
		string: PANGRAM_STRING,
		buffer: PANGRAM_BUFFER,
		sha256: PANGRAM_SHA256
	},
	lorem: {
		string: LOREM_STRING,
		buffer: LOREM_BUFFER,
		sha256: LOREM_SHA256
	},
	big_lorem: {
		path: BIG_LOREM_PATH,
		sha256: BIG_LOREM_SHA256
	}
};
//## Errors

//# Global Variables
/**## Functions*/
Test.test( 'getSHA256FromBufferSync:throws', function( t ){
	var return_error = null;
	t.diagnostic( t.name );
	const test_matrix = {
		functions: {
			defaultExport: DefaultExport.getSHA256FromBufferSync,
			namespaceExport: NamespaceExport.getSHA256FromBufferSync,
			namedExport: getSHA256FromBufferSync
		},
		conditions: {
			input_options_type: {
				args: [
					true
				],
				expected: {
					instanceOf: TypeError,
					code: 'ERR_INVALID_ARG_TYPE'
				}
			}
		}
	};
	for( const function_key of Object.keys( test_matrix.functions ) ){
		var input_function = test_matrix.functions[function_key];
		for( const condition_key of Object.keys( test_matrix.conditions ) ){
			t.diagnostic( `${t.name}:${function_key}:${condition_key}` );
			var condition = test_matrix.conditions[condition_key];
			var bound_function;
			try{
				bound_function = input_function.bind( null, ...condition.args );
			} catch(error){
				return_error = new Error(`${function_key}:input_function.bind threw an error: ${error}`);
				throw return_error;
			}
			var validator_function = Test.errorExpected.bind( null, condition.expected );
			Test.assert.throws( bound_function, validator_function );
		}
	}
} );
Test.test( 'getSHA256FromBufferSync:returns', function( t ){
	t.diagnostic( t.name );
	var return_error = null;
	var test_matrix = {
		functions: {
			defaultExport: DefaultExport.getSHA256FromBufferSync,
			namespaceExport: NamespaceExport.getSHA256FromBufferSync,
			namedExport: getSHA256FromBufferSync
		},
		conditions: {
			input_options_noop: {
				args: [
					{
						noop: true
					}
				],
				expected: null
			},
			input_options_noDefaults: {
				args: [
					{
						noop: true,
						noDefaults: true
					}
				],
				expected: null
			},
			input_options_pangram: {
				args: [
					{
						buffer: PANGRAM_BUFFER
					}
				],
				expected: PANGRAM_SHA256
			},
			input_options_pangram_prefix: {
				args: [
					{
						buffer: PANGRAM_BUFFER,
						prefix: true
					}
				],
				expected: Buffer.concat( [ DefaultExport.MULTIHASH_PREFIX, PANGRAM_SHA256 ] )
			},
			input_options_lorem: {
				args: [
					{
						buffer: LOREM_BUFFER
					}
				],
				expected: LOREM_SHA256
			},
			input_options_lorem_prefix: {
				args: [
					{
						buffer: LOREM_BUFFER,
						prefix: true
					}
				],
				expected: Buffer.concat( [ DefaultExport.MULTIHASH_PREFIX, LOREM_SHA256 ] )
			},
			input_options_empty: {
				args: [
					{
						buffer: EMPTY_BUFFER
					}
				],
				expected: EMPTY_SHA256
			},
			input_options_empty_prefix: {
				args: [
					{
						buffer: EMPTY_BUFFER,
						prefix: true
					}
				],
				expected: Buffer.concat( [ DefaultExport.MULTIHASH_PREFIX, EMPTY_SHA256 ] )
			},
			input_options_pangram_string: {
				args: [
					{
						buffer: PANGRAM_STRING
					}
				],
				expected: PANGRAM_SHA256
			},
			input_options_lorem_string: {
				args: [
					{
						buffer: LOREM_STRING
					}
				],
				expected: LOREM_SHA256
			},
			input_options_empty_string: {
				args: [
					{
						buffer: EMPTY_STRING
					}
				],
				expected: EMPTY_SHA256
			}
		}
	};
	for( const function_key of Object.keys( test_matrix.functions ) ){
		var input_function = test_matrix.functions[function_key];
		for( const condition_key of Object.keys( test_matrix.conditions ) ){
			t.diagnostic( `${t.name}:${function_key}:${condition_key}` );
			var condition = test_matrix.conditions[condition_key];
			var function_return;
			try{
				function_return = input_function.apply( null, condition.args );
			} catch(error){
				return_error = new Error(`${function_key}:input_function.apply threw an error: ${error}`);
				throw return_error;
			}
			Test.assert.deepStrictEqual( function_return, condition.expected );
		}
	}
} );
Test.test( 'getSHA256FromOptions:throws', function( t ){
	t.diagnostic( t.name );
	const test_matrix = {
		functions: {
			defaultExport: DefaultExport.getSHA256FromOptions,
			namespaceExport: NamespaceExport.getSHA256FromOptions,
			namedExport: getSHA256FromOptions
		},
		conditions: {
			input_options_type: {
				args: [
					true
				],
				expected: {
					instanceOf: TypeError,
					code: 'ERR_INVALID_ARG_TYPE'
				}
			},
			input_options_value: {
				args: [
					{}
				],
				expected: {
					instanceOf: Error,
					code: 'ERR_INVALID_ARG_VALUE'
				}
			},
			input_buffer_type: {
				args: [
					{
						buffer: true
					}
				],
				expected: {
					instanceOf: TypeError,
					code: 'ERR_INVALID_ARG_TYPE'
				}
			},
			input_string_type: {
				args: [
					{
						string: true
					}
				],
				expected: {
					instanceOf: TypeError,
					code: 'ERR_INVALID_ARG_TYPE'
				}
			},
			input_path_type: {
				args: [
					{
						path: true
					}
				],
				expected: {
					instanceOf: TypeError,
					code: 'ERR_INVALID_ARG_TYPE'
				}
			}
		}
	};
	for( const function_key of Object.keys( test_matrix.functions ) ){
		var input_function = test_matrix.functions[function_key];
		for( const condition_key of Object.keys( test_matrix.conditions ) ){
			t.diagnostic( `${t.name}:${function_key}:${condition_key}` );
			var condition = test_matrix.conditions[condition_key];
			try{
				var bound_function = input_function.bind( null, ...condition.args );
				var validator_function = Test.errorExpected.bind( null, condition.expected );
				Test.assert.throws( bound_function, validator_function );
			} catch( error ){
				console.error(`Error in ${t.name}:${function_key}:${condition_key}: ${error}`);
				throw error;
			}
		}
	}
} );
Test.test( 'getSHA256FromOptions:returns', async function( t ){
	t.diagnostic( t.name );
	var big_lorem_filehandle = null;
	//var big_lorem_stream = null;
	var test_promise = FSNS.open( TEST_CASE_MATRIX.big_lorem.path ).then(
		( filehandle ) => {
			big_lorem_filehandle = filehandle;
			//big_lorem_stream = filehandle.createReadStream();
		},
		null
	);
	var test_matrix = {
		functions: {
			defaultExport: DefaultExport.getSHA256FromOptions,
			namespaceExport: NamespaceExport.getSHA256FromOptions,
			namedExport: getSHA256FromOptions
		},
		conditions: {
			input_options_noop: {
				args: [
					{
						noop: true
					}
				],
				expected: null
			}
		}
	};
	var property_bit = 0;
	var prefix_bit = 0;
	var source_bit = 0;
	var args_options = {};
	var expected = null;
	/*const default_condition = {
		args: [
			{}
		],
		expected: null
	};*/
	var condition_name = '';
	for( var i = 0; i < 0b1011; i++ ){
		property_bit = i & 0b1; // 00 buffer 01 string //01 stream 10 filehandle 11 path
		prefix_bit = i & 0b10; // 0 no prefix 1 prefix
		source_bit = i & 0b1100; // 00 empty 01 pangram 10 lorem //11 big-lorem
		args_options = {};
		expected = null;
		//new_condition = Object.assign( default_condition );
		//console.log('new_condition: %o', new_condition );
		var input_property = '';
		if( property_bit === 1 ){
			input_property = 'string';
		} else{
			input_property = 'buffer';
		}
		var source_property = '';
		switch( source_bit ){
			case 0b0000: source_property = 'empty'; break;
			case 0b0100: source_property = 'pangram'; break;
			case 0b1000: source_property = 'lorem'; break;
		}
		//console.error( '%s %s', source_property, input_property );
		args_options[input_property] = TEST_CASE_MATRIX[source_property][input_property];
		condition_name = input_property+'_'+source_property;
		if( prefix_bit ){
			condition_name += '_prefix';
			args_options.prefix = true;
			expected = addSHA256PrefixToBuffer( TEST_CASE_MATRIX[source_property].sha256 );
		} else{
			expected = TEST_CASE_MATRIX[source_property].sha256;
		}
		//console.error( expected );
		test_matrix.conditions[condition_name] = { args: [ args_options ], expected: expected };
	}
	await test_promise;
	for( var i = 0; i < 0b101; i++ ){
		var property_bit = i & 0b110; // 00 stream 01 filehandle 02 path
		var prefix_bit = i & 0b1;
		condition_name = 'big_lorem_';
		args_options = {};
		expected = BIG_LOREM_SHA256;
		switch( property_bit ){
			case 0b000:{
				condition_name += 'stream';
				args_options.stream = big_lorem_filehandle.createReadStream({ autoClose: false, /*emitClose: false,*/ start: 0 });
				big_lorem_filehandle.on( 'close', () => {
					args_options.stream.destroy( null, () =>{
						console.log( 'Destroying stream.' );
					} );
				} );
				break;
			}
			case 0b010: condition_name += 'filehandle'; args_options.filehandle = big_lorem_filehandle; break;
			case 0b100: condition_name += 'path'; args_options.path = BIG_LOREM_PATH; break;
		}
		/*if( property_bit === 0b000 ){
			args_options.path = BIG_LOREM_PATH;
		} else{
			big_lorem_filehandle = await FSNS.open( TEST_CASE_MATRIX.big_lorem.path );
			if( property_bit === 0b010 ){
				args_options.filehandle = big_lorem_filehandle;
			} else{
				big_lorem_stream = filehandle.createReadStream();
				if( property_bit === 0b100 ){
					args_options.stream = big_lorem_stream;
				}
			}
		}*/
		if( prefix_bit ){
			args_options.prefix = true;
			condition_name += '_prefix';
			expected = addSHA256PrefixToBuffer( BIG_LOREM_SHA256 );
		}
		test_matrix.conditions[condition_name] = { args: [ args_options ], expected: expected };
	}
	for( const function_key of Object.keys( test_matrix.functions ) ){
		var input_function = test_matrix.functions[function_key];
		for( const condition_key of Object.keys( test_matrix.conditions ) ){
			console.log( "Condition#%s: %o", condition_key, test_matrix.conditions[condition_key] );
			t.diagnostic( `${t.name}:${function_key}:${condition_key}` );
			var condition = test_matrix.conditions[condition_key];
			var function_return = input_function.apply( null, condition.args );
			Test.assert.deepStrictEqual( await function_return, condition.expected );
		}
	}
} );
Test.test.skip( 'getSHA256FromStream:throws', function( t ){
	t.diagnostic( t.name );
	const test_matrix = {
		functions: {
			defaultExport: DefaultExport.getSHA256FromStream,
			namespaceExport: NamespaceExport.getSHA256FromStream,
			namedExport: getSHA256FromStream
		},
		conditions: {
			input_options_type: {
				args: [
					true
				],
				expected: {
					instanceOf: TypeError,
					code: 'ERR_INVALID_ARG_TYPE'
				}
			}
		}
	};
	for( const function_key of Object.keys( test_matrix.functions ) ){
		var input_function = test_matrix.functions[function_key];
		for( const condition_key of Object.keys( test_matrix.conditions ) ){
			t.diagnostic( `${t.name}:${function_key}:${condition_key}` );
			var condition = test_matrix.conditions[condition_key];
			var bound_function = input_function.bind( null, ...condition.args );
			var validator_function = Test.errorExpected.bind( null, condition.expected );
			Test.assert.throws( bound_function, validator_function );
		}
	}
} );
Test.test.skip( 'getSHA256FromStream:returns', function( t ){
	t.diagnostic( t.name );
	var test_matrix = {
		functions: {
			defaultExport: DefaultExport.getSHA256FromStream,
			namespaceExport: NamespaceExport.getSHA256FromStream,
			namedExport: getSHA256FromStream
		},
		conditions: {
			input_options_noop: {
				args: [
					{
						noop: true
					}
				],
				expected: null
			}
		}
	};
	for( const function_key of Object.keys( test_matrix.functions ) ){
		var input_function = test_matrix.functions[function_key];
		for( const condition_key of Object.keys( test_matrix.conditions ) ){
			t.diagnostic( `${t.name}:${function_key}:${condition_key}` );
			var condition = test_matrix.conditions[condition_key];
			var function_return = input_function.apply( null, condition.args );
			Test.assert.deepStrictEqual( function_return, condition.expected );
		}
	}
} );

// lib.test.js EOF

