
var utils = {};

utils.Closure = function( target, executable) {
    var args = [].slice.call( arguments, 2);
	this.target = target;
	this.executable = executable;
	this.args = args;
	this.execute = function() {
		var _args = [].slice.call( arguments);
		executable.apply( target, args.concat( _args));
	};
	this.compare = function( in_closure) {
		if( this.target != in_closure.target) return false;
		if( this.executable != in_closure.executable) return false;
		if( this.args.length != in_closure.args.length) return false;
		for( var i = 0; i < this.args.length; i++) {
			if( this.args[ i] != in_closure.args[ i]) return false;
		}
		return true;
	};
};

utils.configure = function( target, source, defaults) {
	if( source) for( var attribute in source) {
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
			utils.configure( target[ attribute], value);
		} else if( value instanceof Object) {
			if( !target[ attribute]) target[ attribute] = {};
			utils.configure( target[ attribute], value);
		}
	}
	if( defaults) for( var attribute in defaults) {
		var value = defaults[ attribute];
		var test = target[ attribute];
		if( typeof test == "undefined" || test === null) {
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
				utils.configure( target[ attribute], value);
			} else if( value instanceof Object) {
				if( !target[ attribute]) target[ attribute] = {};
				utils.configure( target[ attribute], value);
			}
		}
	}
	return target;
};

utils.deepPrint = function( target, indent) {
	indent = indent ? indent : "";
	var new_indent = indent;
	var br = "\n";
	for( var i = 0; i < 5; i++) new_indent += " ";
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
			temp_array.push( utils.deepPrint( target[ i], new_indent));
		}
		out_string += "[" + br +
			new_indent + temp_array.join( "," + br + new_indent) + br +
			indent + "]";
	} else if( target instanceof Object) {
		var temp_array = [];
		for( var attribute in target) {
			temp_array.push( attribute + ": " + 
					utils.deepPrint( target[ attribute], new_indent));
		}
		out_string += "{" + br +
			new_indent + temp_array.join( "," + br + new_indent) + br + 
			indent + "}";
	}
	return out_string;
};

/*
var test_array = [ "a", null,,{one:"red", two:"blue"}, 3];
test_array[ 10] = "ten";
var test_obj = {
	a: 1,
	b: "b",
	c: null,
	d: true,
	e: false,
	my_array: test_array,
	my_function: function( a, b) {
		for( var i = 0; i < 5; i++) {
		}
	}
};
var copyof = {
	some_new_thing: "whatever"
};
utils.configure( copyof, test_obj);
document.write( utils.deepPrint( copyof));
*/

utils.PubSub = function() {
	var _topics = {};
	this.subscribe = function( target, executable, topic) {
		if( !_topics[ topic]) _topics[ topic] = [];
		_topics[ topic].push( new utils.Closure( target, executable));
	};
	this.unsubscribe = function( target, executable, topic) {
		if( !_topics[ topic]) _topics[ topic] = [];
		var subscriptions = _topics[ topic];
		_topics[ topic] = [];
		var closure = new utils.Closure( target, executable);
		for( var i = 0; i < subscriptions.length; i++) {
			if( !closure.compare( subscriptions[ i])) {
				_topics[ topic].push( subscriptions[ i]);
			}
		}
	};
	this.sendMessage = function( topic) {
		if( !_topics[ topic]) _topics[ topic] = [];
		var _args = [].slice.call( arguments, 1);
		for( var i = 0; i < _topics[ topic].length; i++) {
			_topics[ topic][ i].execute.apply( null, _args);
		}
	};
};

/*
var test_thing = { name: "rio"};
var test_thing2 = { name: "giant"};
var test_function = function() {
	var args = Array.prototype.slice.call( arguments);
	window.alert( this.name + " " + args.join( " "));
}
var ps = new utils.PubSub();
ps.subscribe( test_thing, test_function, "meow");
ps.subscribe( test_thing2, test_function, "meow");
ps.unsubscribe( test_thing, test_function, "meow");
ps.sendMessage( "meow", "dances", "etc");
*/

