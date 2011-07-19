CLASS( "cryptopotamus.view.Text")
.EXTENDS( "cryptopotamus.view.Base")
.DEFINITION( function() {
	
	var SUPER = this.SUPER;
	
	this.constructor = function( in_parent, in_text) {
		SUPER.constructor.call( this, in_parent, "span");
		this.get_node().innerHTML = in_text;
	};
});
