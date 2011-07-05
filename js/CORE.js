
/*****************************************************************************
 * 
 *****************************************************************************/

(function() {
	var global = ( function(){ return this;}).call();
	var _name_space = {};

	var is_initializing = false;
	function initialize( in_constructor) {
		var was_initializing = is_initializing;
		is_initializing = true;
		var instance = new in_constructor();
		is_initializing = was_initializing;
		return instance;
	}
	global.CLASS = function( in_name) {
		if( !_name_space[ in_name]) {
			var _class = function() {
				if( _class.function_only) return _class.mixins[ 0].apply( this, [].slice.call( arguments));
				if( this.super_constructor) this.SUPER = initialize( this.super_constructor);
				for( var i = 0; i < _class.mixins.length; i++) _class.mixins[ i].call( this);
				if( this.constructor != _class) this.CONSTRUCTOR = this.constructor;
				if( !is_initializing && this.CONSTRUCTOR) {
					this.CONSTRUCTOR.apply( this, [].slice.call( arguments));
				}
			};
			_class.mixins = [];
			_class.uninitialized = false;
			_class.EXTENDS = function( in_super_name){
				_class.super_name = in_super_name;
				_class.uninitialized = true;
				return _class;
			};
			_class.DEFINITION = function( in_function){
				_class.mixins.push( in_function);
				return _class;
			};
			_class.STATIC = function( in_definition) {
				var temp_instance = new in_definition();
				for( var member in temp_instance) {
					_class[ member] = temp_instance[ member];
					if( _class[ member] instanceof Function) {
						FUNCTION( in_name + "." + member).DEFINITION( _class[ member]);
					}
				}
				return _class;
			};
			_name_space[ in_name] = _class;
		}
		return _name_space[ in_name];
	};
	global.FUNCTION = function( in_name) {
		var wrapper_class = CLASS( in_name);
		wrapper_class.function_only = true;
		return wrapper_class;
	};
	global.IMPORT = function( in_name) {
		var wrapper_class = CLASS( in_name);
		if( wrapper_class.uninitialized) {
			var super_class = CLASS( wrapper_class.super_name);
			wrapper_class.prototype = initialize( super_class);
			wrapper_class.prototype.constructor = wrapper_class;
			wrapper_class.prototype.super_constructor = super_class;
			wrapper_class.uninitialized = false;
		}
		return wrapper_class;
	};

})();