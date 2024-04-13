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
	import { getSHA256FromBuffer } from './lib.js';
	//## Standard
	//## External
	import Test from 'cno-test';
//# Constants
const FILENAME = 'lib.test.js';
const PANGRAM_BUFFER = Buffer.from( 'The quick brown fox jumps over the lazy dog.' );
const PANGRAM_SHA256 = Buffer.from( 'ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c', 'hex' );
const LOREM_BUFFER = Buffer.from( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' );
const LOREM_SHA256 = Buffer.from( '2d8c2f6d978ca21712b5f6de36c9d31fa8e96a4fa5d8ff8b0188dfb9e7c171bb', 'hex' );
const EMPTY_BUFFER = Buffer.from( '' );
const EMPTY_SHA256 = Buffer.from( 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'hex' );

//## Errors

//# Global Variables
/**## Functions*/
Test.test( 'getSHA256FromBuffer:throws', function( t ){
	var return_error = null;
	t.diagnostic( t.name );
	const test_matrix = {
		functions: {
			defaultExport: DefaultExport.getSHA256FromBuffer,
			namespaceExport: NamespaceExport.getSHA256FromBuffer,
			namedExport: getSHA256FromBuffer
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
Test.test( 'getSHA256FromBuffer:returns', function( t ){
	t.diagnostic( t.name );
	var return_error = null;
	var test_matrix = {
		functions: {
			defaultExport: DefaultExport.getSHA256FromBuffer,
			namespaceExport: NamespaceExport.getSHA256FromBuffer,
			namedExport: getSHA256FromBuffer
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

// lib.test.js EOF

