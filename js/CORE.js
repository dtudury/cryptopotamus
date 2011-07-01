
/*****************************************************************************
 * 
 *****************************************************************************/

(function() {
	
	var _name_space = {};
	var _packaged_functions = {};

	var global = ( function(){ return this;}).call();

	/*****************************************************************************
	 * 
	 *****************************************************************************/
	global.PACKAGE_FUNCTION = function( qualified_name, in_function) {
		_packaged_functions[ qualified_name] = in_function;
	};
	
	global.IMPORT_FUNCTION = function( qualified_name) {
		if( !_name_space[ qualified_name]) {
			var _class = function() {
				return _packaged_functions[ qualified_name].apply( this, [].slice.call( arguments));
			};
			_name_space[ qualified_name] = _class;
		}
		return _name_space[ qualified_name];
	};
	

	/*****************************************************************************
	 * 
	 *****************************************************************************/
	global.IMPORT = function( qualified_name) {
		if( !_name_space[ qualified_name]) {
			var _class = function() {
				if( !_class.prototype.super_class) {
					var temp_prototype = new _class.super_class();
					for( var name in temp_prototype) _class.prototype[ name] = temp_prototype[ name];
					_class.prototype.constructor = _class;
					_class.prototype.super_class = _class.super_class.prototype;
					if( _class.instance_definition) _class.instance_definition( _class.prototype);
				}
				if( _class.prototype.constructor == _class) _class.prototype.constructor = _class.super_class.prototype.constructor;
				if( _class.prototype.constructor) _class.prototype.constructor.apply( _class.prototype, [].slice.call( arguments));
			};
			_class.define_instance = function( in_definition) { _class.instance_definition = in_definition; return _class;};
			_class.define_static = function( in_definition) { if( in_definition) in_definition( _class); return _class;};
			_name_space[ qualified_name] = _class;
		}
		return _name_space[ qualified_name];
	};

	/*****************************************************************************
	 * 
	 *****************************************************************************/
	global.PACKAGE = function( qualified_name, super_class, instance_definition, static_definition) {
		if( !super_class) super_class = function() {};

		var _class = IMPORT( qualified_name);
		_class.qualified_name = qualified_name;
		_class.super_class = super_class;
		_class.define_instance( instance_definition);
		_class.define_static( static_definition);
		_name_space[ qualified_name] = _class;
		return _class;
	};
	
})();