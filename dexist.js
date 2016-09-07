/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
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
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/dexist.git",
			"test": "dexist-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Kill process in any platform.
	@end-module-documentation

	@include:
		{
			"called": "called",
			"child": "child_process",
			"pedon": "pedon",
			"snapd": "snapd"
		}
	@end-include
*/

var called = require( "called" );
var child = require( "child_process" );
var pedon = require( "pedon" );
var snapd = require( "snapd" );

var dexist = function dexist( task, callback ){
	/*;
		{
			"task:required": "string",
			"callback": "function"
		}
	*/

	if( typeof task != "string" ||
		!task )
	{
		throw new Error( "invalid task to kill" );
	}

	if( !( /^[a-zA-Z0-9_\-]+$/ ).test( task ) ){
		throw new Error( "invalid task format" );
	}

	var self = this;
	if( !this ||
		this === global )
	{
		self = global;
	}

	callback = called.bind( self )( callback );

	var command = "";
	if( pedon.WINDOWS ){
		command = "taskkill /im @pattern*".replace( "@pattern", task );

	}else if( pedon.LINUX ){
		command = "pkill @pattern".replace( "@pattern", task );

	}else{
		command = "kill $(ps -e | grep @pattern | awk '{print $1}')".replace( "@pattern", task );
	}

	try{
		return snapd( function kill( ){
			try{
				child.execSync( command );

			}catch( error ){
				var _error = error.toString( "utf8" ).trim( ).split( "\n" );

				_error = _error.reverse( );
				_error.pop( );
				error = _error.reverse( ).join( "\n" );

				if( error ){
					throw new Error( error );
				}
			}
		} )( callback );

	}catch( error ){
		return false;
	}
};

module.exports = dexist;
