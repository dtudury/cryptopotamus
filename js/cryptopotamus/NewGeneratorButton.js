

CLASS( "cryptopotamus.view.NewGeneratorButton")
.EXTENDS( "cryptopotamus.view.Button")
.DEFINITION( function() {
	
	var SUPER = this.SUPER;

	function onclick() { 
		LOG( "new generator");
	}
	this.constructor = function( in_parent, in_cta) {
		SUPER.constructor.call( this, in_parent, "+");
		this.subscribe( this, onclick, "click");
	};
});
