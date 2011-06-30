
(function() {
	var global = ( function(){ return this;}).call();
	var _packaged_functions = {};
	var _name_space = {};

	/*****************************************************************************
	 * 
	 *****************************************************************************/
	global.PACKAGE_FUNCTION = function( qualified_name, in_function) {
		if( !_name_space[ qualified_name]) {
			_name_space[ qualified_name] = function() {
				return _packaged_functions[ qualified_name].apply( this, [].slice.call( arguments));
			};
		}
		_packaged_functions[ qualified_name] = in_function;
	};
	
	/*****************************************************************************
	 * 
	 *****************************************************************************/
	global.IMPORT = function( qualified_name) {
		if( !_name_space[ qualified_name]) {
			_name_space[ qualified_name] = function() {
				var constructor = this.constructor == arguments.callee ? this.super_class.constructor : this.constructor;
				if( constructor) constructor.apply( this, [].slice.call( arguments));
			};
		}
		return _name_space[ qualified_name];
	};
	
	/*****************************************************************************
	 * 
	 *****************************************************************************/
	global.PACKAGE_CLASS = function( qualified_name, super_class, instance_definition, static_definition) {
		var _class = IMPORT( qualified_name);
		_class.set_super_class = function( in_class) {
			_class.prototype = new in_class();
			_class.prototype.super_class = in_class.prototype;
			_class.prototype.constructor = _class;
		};
		_class.set_super_class( super_class ? super_class : Object);
		_class.define_instance = function( in_definition) { in_definition( this.prototype); return _class;};
		_class.define_static = function( in_definition) { in_definition( this); return _class;};
		if( instance_definition) _class.define_instance( instance_definition);
		if( static_definition) _class.define_static( static_definition);
		PACKAGE_FUNCTION( qualified_name, _class);
		return _class;
	};
	
})();

/*****************************************************************************
 * 
 *****************************************************************************/
PACKAGE_CLASS( "utils.Closure").define_static( function( _) {
	_.constructor = function( target, executable) {
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
});

/*****************************************************************************
 * 
 *****************************************************************************/
PACKAGE_FUNCTION( "utils.configure", function( target, source, defaults) {
	
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
	
	
/*****************************************************************************
 * 
 *****************************************************************************/
PACKAGE_CLASS( "utils.PubSub").define_instance( function( _) {

	var Closure = IMPORT( "utils.Closure");

	var _topics = {};
	
	_.subscribe = function( target, executable, topic) {
		if( !_topics[ topic]) _topics[ topic] = [];
		_topics[ topic].push( new Closure( target, executable));
	};
	
	_.unsubscribe = function( target, executable, topic) {
		if( !_topics[ topic]) _topics[ topic] = [];
		var subscriptions = _topics[ topic];
		_topics[ topic] = [];
		var closure = new Closure( target, executable);
		for( var i = 0; i < subscriptions.length; i++) {
			if( !closure.compare( subscriptions[ i])) {
				_topics[ topic].push( subscriptions[ i]);
			}
		}
	};
	
	_.sendMessage = function( topic) {
		if( !_topics[ topic]) _topics[ topic] = [];
		var _args = [].slice.call( arguments, 1);
		for( var i = 0; i < _topics[ topic].length; i++) {
			_topics[ topic][ i].execute.apply( null, _args);
		}
	};
});
