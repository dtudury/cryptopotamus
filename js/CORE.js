
/*****************************************************************************
 * 
 *****************************************************************************/

(function() {

	//get global namespace so we can call CLASS, IMPORT, and FUNCTION
	var global = ( function(){ return this;}).call();

	//name space for storing constructors and static functions
	var _name_space = {};

	//method to create class(like) defining functionality
	global.CLASS = function( in_name) {
		if( !_name_space[ in_name]) {
			//setup our class; it relies heavily on things to be set up later, but in case it's imported
			//before it's setup, return a pointer to where it will be
			var _class = function() {
				//we store static functions here too, if this is one, return it (well, a wrapped version)
				if( _class.function_only) return _class.MIXINS[ 0].apply( this, [].slice.call( arguments));
				//pointer to the super class so our instance can access it
				this.SUPER = _class.prototype;
				//for debugging
				this.NAME = in_name;
				//build our class by applying our mixins
				for( var i = 0; i < _class.MIXINS.length; i++) _class.MIXINS[ i].call( this);
				//if one of our mixins defined a "constructor" method, then let it handle any arguments
				if( !is_initializing && this.constructor != _class) {
					this.constructor.apply( this, [].slice.call( arguments));
				}
			};
			//functions that define our methods and members
			_class.MIXINS = [];
			//add a mixin
			_class.DEFINITION = function( in_function){
				_class.MIXINS.push( in_function);
				return _class;
			};
			//the class we'll inherit from (and set prototype to)
			_class.EXTENDS = function( in_super_name){
				//set super_name until we add a prototype
				_class.SUPER_NAME = in_super_name;
				return _class;
			};
			//execute any functions that will define static methods and members
			_class.STATIC = function( in_definition) {
				var temp_instance = new in_definition();
				for( var member in temp_instance) {
					_class[ member] = temp_instance[ member];
					//break out any static functions so they can be grabbed on their own
					if( _class[ member] instanceof Function) {
						FUNCTION( in_name + "." + member).DEFINITION( _class[ member]);
					}
				}
				return _class;
			};
			//store it for later
			_name_space[ in_name] = _class;
		}
		return _name_space[ in_name];
	};

	//store static package method
	global.FUNCTION = function( in_name) {
		var _class = CLASS( in_name);
		_class.function_only = true;
		return _class;
	};

	//look up static or constructor method
	global.IMPORT = function( in_name) {
		var _class = CLASS( in_name);
		//apply inheritance by setting prototype to an instance of the super-class
		if( _class.SUPER_NAME) {
			var super_class = IMPORT( _class.SUPER_NAME);
			_class.prototype = initialize( super_class);
			//we don't need this anymore and don't do this twice
			_class.SUPER_NAME = null;
		}
		return _class;
	};

	//helper method to construct classes for linking without initializing them
	function initialize( in_constructor) {
		//console.log( "initializing " + in_constructor.prototype.name);
		var was_initializing = is_initializing;
		is_initializing = true;
		var instance = new in_constructor();
		is_initializing = was_initializing;
		return instance;
	}
	//if we're initializing then classes are only being constructed for linking
	var is_initializing = false;

})();
