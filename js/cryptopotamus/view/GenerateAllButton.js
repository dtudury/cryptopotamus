
CLASS( "cryptopotamus.view.GenerateAllButton")
.EXTENDS( "cryptopotamus.view.Button")
.DEFINITION( function() {
	
	var SUPER = this.SUPER;
	var generate_all = IMPORT( "cryptopotamus.Controller.generate_all");

	function onclick() { 
		generate_all();
	}
	this.constructor = function( in_parent, in_cta) {
		SUPER.constructor.call( this, in_parent, "Generate All");
		this.subscribe( this, onclick, "click");
	};
});
