"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "dexist",
			"path": "dexist/dexist.js",
			"file": "dexist.js",
			"module": "dexist",
			"author": "Richeve S. Bebedor",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/dexist.git",
			"test": "dexist-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Death beyond existence. Kill process in any platform.
	@end-module-documentation

	@include:
		{
			"called": "called",
			"child": "child_process",
			"falzy": "falzy",
			"pedon": "pedon",
			"protype": "protype",
			"snapd": "snapd",
			"zelf": "zelf"
		}
	@end-include
*/

const called = require( "called" );
const child = require( "child_process" );
const falzy = require( "falzy" );
const numric = require( "numric" );
const pedon = require( "pedon" );
const protype = require( "protype" );
const snapd = require( "snapd" );
const zelf = require( "zelf" );

const NAME = "name";
const PID = "pid";

const dexist = function dexist( task, callback ){
	/*;
		{
			"task:required": [
				"string",
				"number"
			],
			"callback": "function"
		}
	*/

	if( falzy( task ) || !protype( task, STRING + NUMBER ) ){
		throw new Error( "invalid task to kill" );
	}

	if( !( /^[a-zA-Z0-9_\-]+$/ ).test( task ) ){
		throw new Error( "invalid task format" );
	}

	let self = zelf( this );

	callback = called.bind( self )( callback );

	let mode = NAME;
	if( numric( task ) ){
		mode = PID;
	}

	let command = "";
	if( pedon.WINDOWS ){
		if( mode === PID ){
			command = `taskkill /pid ${ task } /f`;

		}else{
			command = `taskkill /im ${ task }* /f`;
		}

	}else if( mode === PID ){
		command = `kill -9 ${ task }`;

	}else if( pedon.LINUX ){
		command = `pkill -9 ${ task }`;

	}else{
		command = `kill -9 $(ps -e | grep ${ task } | tr -s ' ' | xargs echo -n | cut -d ' ' -f 1)`;
	}

	try{
		return snapd.bind( self )( function kill( ){
			try{
				child.execSync( command );

				return true;

			}catch( error ){
				let issue = error.toString( "utf8" ).trim( ).split( "\n" );

				issue = issue.reverse( );
				issue.pop( );
				issue = issue.reverse( ).join( "\n" );

				if( issue ){
					throw new Error( issue );
				}
			}
		} )( callback );

	}catch( error ){
		return false;
	}
};

module.exports = dexist;
