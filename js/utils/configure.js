
/*****************************************************************************
 * 
 *****************************************************************************/
 
FUNCTION( "utils.configure")
.DEFINITION( function( target, source, defaults) {
	
	var configure = IMPORT( "utils.configure");
	
	//helper function for configure
	function _copy_value( target, source, attribute) {
		var value = source[ attribute];
		if( typeof value == "undefined") {
		} else if( value === null) {
			target[ attribute] = value;
		} else if( typeof value == "boolean") {
			target[ attribute] = value;
		} else if( typeof value == "number") {
			target[ attribute] = value;
		} else if( typeof value == "string") {
			target[ attribute] = value;
		} else if( typeof value == "function") {
			target[ attribute] = value;
		} else if( value instanceof Array) {
			if( !target[ attribute]) target[ attribute] = [];
			configure( target[ attribute], value);
		} else if( value instanceof Object) {
			if( !target[ attribute]) target[ attribute] = {};
			configure( target[ attribute], value);
		}
	}

	var attribute;
	if( source) for( attribute in source) {
		_copy_value( target, source, attribute);
	}
	if( defaults) for( attribute in defaults) {
		var test = target[ attribute];
		if( typeof test == "undefined" || test === null) {
			_copy_value( target, source, attribute);
		}
	}
	return target;
});