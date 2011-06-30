
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

	/*****************************************************************************
	 * 
	 *****************************************************************************/
	global.IMPORT = function( qualified_name) {
		if( !_name_space[ qualified_name]) {
			var _class = function() {
				if( this.super_class) {
					var constructor = this.constructor;
					if( this.constructor == arguments.callee) constructor = this.super_class.constructor;
					if( constructor) constructor.apply( this, [].slice.call( arguments));
				} else if( _packaged_functions[ qualified_name]) {
					return _packaged_functions[ qualified_name].apply( this, [].slice.call( arguments));
				}
			};
			_class.define_instance = function( in_definition) { in_definition( this.prototype); return _class;};
			_class.define_static = function( in_definition) { in_definition( this); return _class;};
			_name_space[ qualified_name] = _class;
		}
		return _name_space[ qualified_name];
	};

	/*****************************************************************************
	 * 
	 *****************************************************************************/
	global.PACKAGE_CLASS = function( qualified_name, super_class, instance_definition, static_definition) {
		if( !super_class) super_class = Object;

		var _class = IMPORT( qualified_name);
		_class.prototype = new super_class();
		_class.prototype.super_class = super_class.prototype;
		_class.prototype.constructor = _class;
		if( instance_definition) _class.define_instance( instance_definition);
		if( static_definition) _class.define_static( static_definition);
		_name_space[ qualified_name] = _class;
		return _class;
	};
	
})();