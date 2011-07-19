CLASS( "cryptopotamus.view.Base")
.EXTENDS( "utils.PubSub")
.DEFINITION( function() {
	
	var configure = IMPORT( "utils.configure");
	
	this.parent = null;
	this._node = null;
	this.tag_name = null;
	this.configuration = null;
	
	this.constructor = function( in_parent, in_tag_name, in_configuration) {
		this.parent = in_parent;
		this.tag_name = in_tag_name;
		this.configuration = in_configuration;
	};
	
	this.append = function() {
		this.parent.appendChild( this.get_node());
	};

	this.remove = function() {
		this.parent.removeChild( this.get_node());
	};

	this.replace = function( in_element) {
		this.parent.replaceChild( in_element.get_node(), this.get_node());
	};

	this.configure = function( in_configuration) {
		configure( this.get_node(), in_configuration);
	}
	
	this.get_node = function() {
		if( !this._node) {
			this._node = document.createElement( this.tag_name);
			configure( this._node, this.configuration);
		}
		return this._node;
	};
	
});
