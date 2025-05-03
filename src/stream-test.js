#!/usr/bin/env node
/**
# [stream-test.js](src/stream-test.js)
> Tests stream.

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
	import FSNS from 'node:fs/promises';
	import CryptoNS from 'node:crypto';
	//## External
	import * as NanoID from 'nanoid';
//# Constants
const FILENAME = 'stream-test.js';
//## Errors

//# Global Variables
/**## Functions*/
function getNow(){
	var datetime = new Date();
	return datetime.toISOString();
}
function annotateFilehandle( filehandle ){
	filehandle.uid = NanoID.nanoid();
	filehandle.createdTime = getNow();
	console.log( 'annotateFilehandle: %s', stringifyFilehandle( filehandle ) );
	return filehandle;
}
function stringifyFilehandle( filehandle ){
	return `filehandle#${filehandle.uid} fd=${filehandle.fd} createdTime=${filehandle.createdTime}`;
}
function prepStream( read_stream ){
	read_stream.uid = NanoID.nanoid();
	console.log( 'Prepping stream: %s', read_stream.uid );
	read_stream.hasher = CryptoNS.createHash( 'sha256' );
	read_stream.on( 'open', function(){
		console.log( 'stream#%s %s: open %d', read_stream.uid, getNow(), arguments.length );
	} );
	read_stream.on( 'ready', function(){
		console.log( 'stream#%s %s: ready %d', read_stream.uid, getNow(), arguments.length );
	} );
	read_stream.on( 'data', function( data_buffer ){
		console.log( 'stream#%s %s: data %d %s', read_stream.uid, getNow(), arguments.length, data_buffer.toString('utf8') );
		read_stream.hasher.update( data_buffer );
	} );
	read_stream.on( 'close', function(){
		console.log( 'stream#%s %s: close %d', read_stream.uid, getNow(), arguments.length );
	} );
	read_stream.on( 'end', function(){
		console.log( 'stream#%s %s: end %d %s', read_stream.uid, getNow(), arguments.length, read_stream.hasher.digest('hex') );
	} );
	read_stream.on( 'error', function(){
		console.log( 'stream#%s %s: error %d', read_stream.uid, getNow(), arguments.length );
	} );
}


FSNS.open( 'test/big-lorem.txt' ).then(
	( filehandle ) => {
		annotateFilehandle( filehandle );
		console.log( "open: %s", stringifyFilehandle( filehandle ) );
		filehandle.on( 'close', () => {
			console.log( "filehandle#%s closed at %s", filehandle.uid, getNow() );
		} );
		var read_stream = filehandle.createReadStream( { autoClose: false, start: 0 } );
		prepStream( read_stream )
		read_stream.on( 'end', () => {
			console.log( "Closing %s at %s", stringifyFilehandle( filehandle ), getNow() );
			return filehandle.close();
		} );
	},
	null
);
var filehandle = await FSNS.open( 'test/big-lorem.txt' );
annotateFilehandle( filehandle );
console.log( "Global: %s", stringifyFilehandle( filehandle ));
filehandle.on( 'close', () => {
	console.log( "filehandle#%d closed at %s", filehandle.uid, getNow() );
} );
var stream1 = filehandle.createReadStream( { autoClose: false, start: 0 } );
prepStream( stream1 );
//`await filehandle.close();
var timeout = setTimeout( () => {
	console.log( 'timeout called @ %s', getNow() );
	var stream2 = filehandle.createReadStream( { autoClose: false, start: 0 } );
	prepStream( stream2 );
}, 10000 );

// stream-test.js EOF

