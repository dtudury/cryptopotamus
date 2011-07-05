CLASS( "cryptopotamus.view.Text")
.EXTENDS( "cryptopotamus.view.Base")
.DEFINITION( function() {
	
	var SUPER = this.SUPER;
	var text = "";
	
	this.constructor = function( in_parent, in_text) {
		text = in_text;
		SUPER.constructor.call( this, in_parent);
	};
	
	//override
	this.create_node = function() {
		this.node = document.createTextNode( text);
	};

});