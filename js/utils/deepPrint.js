
/*****************************************************************************
 * 
 *****************************************************************************/
 
PACKAGE_FUNCTION( "utils.deepPrint", function( target, indent) {
	
	var deepPrint = IMPORT( "utils.deepPrint");
	
	indent = indent ? indent : "";
	var new_indent = indent;
	var br = "\n";
	new_indent += "    ";
	var out_string = "";
	if( typeof target == "undefined") {
	} else if( target === null) {
		out_string += "null";
	} else if( typeof target == "boolean") {
		out_string += target;
	} else if( typeof target == "number") {
		out_string += target;
	} else if( typeof target == "string") {
		out_string += "\"" + target + "\"";
	} else if( typeof target == "function") {
		out_string += target;
	} else if( target instanceof Array) {
		var temp_array = [];
		for( var i = 0; i < target.length; i++) {
			temp_array.push( deepPrint( target[ i], new_indent));
		}
		out_string += "[" + br +
			new_indent + temp_array.join( "," + br + new_indent) + br +
			indent + "]";
	} else if( target instanceof Object) {
		var temp_array = [];
		for( var attribute in target) {
			temp_array.push( attribute + ": " + 
					deepPrint( target[ attribute], new_indent));
		}
		out_string += "{" + br +
			new_indent + temp_array.join( "," + br + new_indent) + br + 
			indent + "}";
	}
	return out_string;
});