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
			"child": "child_process",
			"depher": "depher",
			"falzy": "falzy",
			"pedon": "pedon",
			"protype": "protype",
			"shft": "shft",
			"snapd": "snapd",
			"zelf": "zelf"
		}
	@end-include
*/

const child = require( "child_process" );
const depher = require( "depher" );
const falzy = require( "falzy" );
const numric = require( "numric" );
const pedon = require( "pedon" );
const protype = require( "protype" );
const shft = require( "shft" );
const snapd = require( "snapd" );
const zelf = require( "zelf" );

const NAME = "name";
const PID = "pid";
const TASK_PATTERN = /^[a-zA-Z0-9_\-]+$/;

const dexist = function dexist( task, synchronous, option ){
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

	if( !TASK_PATTERN.test( task ) ){
		throw new Error( "invalid task format" );
	}

	let parameter = shft( arguments );

	synchronous = depher( parameter, BOOLEAN, false );

	option = depher( parameter, OBJECT, { } );

	let self = zelf( this );

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
		command = `ps aux | grep ${ task } | grep -v grep | tr -s ' ' | cut -d ' ' -f 1-2 | grep -Po '[0-9]*' | xargs echo -n | xargs kill -9`

	}else{
		command = `kill -9 $(ps -e | grep ${ task } | tr -s ' ' | xargs echo -n | cut -d ' ' -f 1)`;
	}

	if( synchronous ){
		try{
			child.execSync( command, option );

			return true;

		}catch( error ){
			return false;
		}

	}else{
		return snapd.bind( zelf( self ) )( function kill( ){
			try{
				child.execSync( command, option );

				return true;

			}catch( error ){
				return false;
			}
		} );
	}
};

module.exports = dexist;
