CLASS( "cryptopotamus.view.Base")
.DEFINITION( function() {
	
	var configure = IMPORT( "utils.configure");
	
	this.parent = null;
	this.node = null;
	
	this.constructor = function( in_parent) {
		this.parent = in_parent;
		this.get_node();
		this.parent.appendChild( this.get_node());
	};
	
	this.destructor = function() {
		this.parent.removeChild( this.node);
	};
	
	this.get_node = function() {
		if( !this.node) {
			this.create_node();
			configure( this.node, this.get_configuration());
		}
		return this.node;
	};
	
	this.create_node = function() {
		return {};
	};
	
	this.get_configuration = function() {
		return {};
	};
	
	this.extend_configuration = function( in_config) {
		var config = {};
		configure( config, this.SUPER.get_configuration());
		configure( config, in_config);
		return config;
	};

});