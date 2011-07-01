PACKAGE( "cryptopotamus.view.Div").define_instance( function( _) {
	
	var deepPrint = IMPORT_FUNCTION( "utils.deepPrint");
	var configure = IMPORT_FUNCTION( "utils.configure");
	
	_.parent = null;
	_.node = null;
	
	_.constructor = function( in_parent) {
		_.parent = in_parent;
		_.node = _.get_node();
//		console.log( "config: Div");
		console.log( "config: " + deepPrint( this.get_configuration()));
	};
	
	console.log( "setting foo to bar");
	
	_.foo = "bar";
	
	_.get_node = function() {
		return document.createElement( "div");
	};
	
	_.get_configuration = function() {
		return { a: "1", b: "2"};
	};
	
	_.extend_configuration = function( in_config) {
		var config = {};
		configure( config, this.super_class.get_configuration());
		configure( config, in_config);
		return config;
	};

});