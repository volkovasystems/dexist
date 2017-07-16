
const assert = require( "assert" );
const dexist = require( "./dexist.js" );

//:on chrome before testing.
dexist( "chrome" )( function done( error, result ){
	assert.equal( result, true, "should be true" );
} );

//: on firefox before testing.
assert.equal( dexist( "firefox", true ), true, "should be true" );
